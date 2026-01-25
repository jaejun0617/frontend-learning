/**
 * ==========================================
 * JavaScript 불변 객체 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * [핵심 요약]
 * 객체를 보호하는 3가지 레벨:
 * 1. preventExtensions (확장 방지) - 추가만 막음
 * 2. seal (봉인) - 추가/삭제 막음
 * 3. freeze (동결) - 추가/삭제/수정 모두 막음
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 중요 개념
 */

// ==========================================
// [초급] 왜 불변 객체가 필요한가? 🔥
// ==========================================
console.log('=== 왜 불변 객체가 필요한가? ===');

/**
 * 문제 상황: 객체는 기본적으로 "가변(Mutable)"
 */

const config = {
   apiUrl: 'https://api.example.com',
   timeout: 5000,
};

// 😱 어디선가 실수로 변경...
config.apiUrl = 'https://hack.com';
delete config.timeout;

console.log('변경됨:', config); // { apiUrl: 'https://hack.com' }

/**
 * 해결: 불변 객체로 만들어서 보호!
 */

const safeConfig = Object.freeze({
   apiUrl: 'https://api.example.com',
   timeout: 5000,
});

// ✅ 변경 시도가 무시됨
safeConfig.apiUrl = 'https://hack.com';
delete safeConfig.timeout;

console.log('보호됨:', safeConfig); // 원본 그대로!

console.log('='.repeat(40));

// ==========================================
// [초급] Level 1: preventExtensions (확장 방지) ⭐
// ==========================================
console.log('\n=== Level 1: preventExtensions ===');

/**
 * preventExtensions: 새 프로퍼티 추가만 막음
 * - 추가: ❌
 * - 삭제: ✅
 * - 수정: ✅
 */

const user1 = {
   name: '안유진',
   age: 21,
};

console.log('확장 가능?', Object.isExtensible(user1)); // true

// ✅ 추가 가능
user1.email = 'yujin@ive.com';
console.log('추가됨:', user1);

// 확장 방지 적용
Object.preventExtensions(user1);
console.log('확장 가능?', Object.isExtensible(user1)); // false

// ❌ 추가 불가 (조용히 무시됨)
user1.phone = '010-1234-5678';
console.log('추가 안됨:', user1); // phone 없음

// ✅ 삭제 가능
delete user1.email;
console.log('삭제됨:', user1);

// ✅ 수정 가능
user1.name = '장원영';
console.log('수정됨:', user1);

// 🔥 실무 예시: API 응답 객체 보호
const apiResponse = {
   status: 200,
   data: { users: [] },
};

Object.preventExtensions(apiResponse);

// ❌ 새 필드 추가 방지
apiResponse.newField = 'hack'; // 무시됨
console.log('API 응답 보호:', apiResponse);

console.log('='.repeat(40));

// ==========================================
// [중급] Level 2: seal (봉인) ⭐⭐⭐
// ==========================================
console.log('\n=== Level 2: seal (봉인) ===');

/**
 * seal: 추가/삭제 막음, 수정만 가능
 * - 추가: ❌
 * - 삭제: ❌
 * - 수정: ✅
 * - 어트리뷰트 변경: ❌ (writable → false는 가능)
 */

const user2 = {
   name: '가을',
   age: 22,
   email: 'gaeul@ive.com',
};

console.log('봉인됨?', Object.isSealed(user2)); // false

// 봉인 적용
Object.seal(user2);
console.log('봉인됨?', Object.isSealed(user2)); // true

// ❌ 추가 불가
user2.phone = '010-0000-0000';
console.log('추가 안됨:', user2);

// ❌ 삭제 불가
delete user2.email;
console.log('삭제 안됨:', user2);

// ✅ 수정 가능!
user2.name = '김가을';
user2.age = 23;
console.log('수정됨:', user2);

// ❌ 어트리뷰트 재정의 불가 (configurable: false)
try {
   Object.defineProperty(user2, 'name', {
      enumerable: false, // 에러!
   });
} catch (error) {
   console.log('❌ 어트리뷰트 변경 불가:', error.message);
}

// ⚠️ 예외: writable만 true → false 가능
Object.defineProperty(user2, 'name', {
   writable: false, // 이건 가능!
});

console.log('name 읽기 전용:', Object.getOwnPropertyDescriptor(user2, 'name'));

// 🔥 실무 예시: 설정 객체 봉인
const appConfig = {
   appName: 'MyApp',
   version: '1.0.0',
   isDev: true,
};

Object.seal(appConfig);

// ✅ 값 변경은 가능 (개발 모드 토글 등)
appConfig.isDev = false;

// ❌ 새 설정 추가/삭제는 불가
appConfig.newSetting = 'value'; // 무시
delete appConfig.version; // 무시

console.log('설정 객체:', appConfig);

console.log('='.repeat(40));

// ==========================================
// [고급] Level 3: freeze (동결) ⭐⭐⭐ 🔥
// ==========================================
console.log('\n=== Level 3: freeze (완전 동결) ===');

/**
 * freeze: 완전히 읽기 전용
 * - 추가: ❌
 * - 삭제: ❌
 * - 수정: ❌
 * - 어트리뷰트 변경: ❌
 */

const user3 = {
   name: '레이',
   age: 20,
   email: 'rei@ive.com',
};

console.log('동결됨?', Object.isFrozen(user3)); // false

// 동결 적용
Object.freeze(user3);
console.log('동결됨?', Object.isFrozen(user3)); // true

// ❌ 추가 불가
user3.phone = '010-0000-0000';
console.log('추가 안됨:', user3);

// ❌ 삭제 불가
delete user3.email;
console.log('삭제 안됨:', user3);

// ❌ 수정 불가!
user3.name = '나오이 레이';
user3.age = 21;
console.log('수정 안됨:', user3); // 그대로!

// ❌ 어트리뷰트 변경 불가
try {
   Object.defineProperty(user3, 'name', {
      writable: false,
   });
} catch (error) {
   console.log('❌ 어트리뷰트 변경 불가:', error.message);
}

// 🔥 실무 예시: 상수 객체 (완전히 고정)
const CONSTANTS = Object.freeze({
   API_URL: 'https://api.example.com',
   TIMEOUT: 5000,
   MAX_RETRIES: 3,
});

// ❌ 아무것도 못 바꿈
CONSTANTS.API_URL = 'https://hack.com';
CONSTANTS.NEW_CONST = 'value';
delete CONSTANTS.TIMEOUT;

console.log('상수:', CONSTANTS); // 완전히 보호됨!

console.log('='.repeat(40));

// ==========================================
// [중급] 3가지 레벨 비교표 🔥🔥
// ==========================================
console.log('\n=== 3가지 레벨 비교 ===');

/**
 * ┌─────────────────┬─────────────┬────────┬──────────┐
 * │                 │ 추가        │ 삭제   │ 수정     │
 * ├─────────────────┼─────────────┼────────┼──────────┤
 * │ 일반 객체       │ ✅          │ ✅     │ ✅       │
 * │ preventExtensions│ ❌         │ ✅     │ ✅       │
 * │ seal            │ ❌          │ ❌     │ ✅       │
 * │ freeze          │ ❌          │ ❌     │ ❌       │
 * └─────────────────┴─────────────┴────────┴──────────┘
 */

const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = { a: 1 };

Object.preventExtensions(obj1);
Object.seal(obj2);
Object.freeze(obj3);

// 추가 시도
obj1.b = 2; // ❌
obj2.b = 2; // ❌
obj3.b = 2; // ❌

// 삭제 시도
delete obj1.a; // ✅ 삭제됨
delete obj2.a; // ❌
delete obj3.a; // ❌

// 수정 시도
obj1.a = 10; // ✅ (obj1은 삭제되서 없지만)
obj2.a = 10; // ✅ 수정됨
obj3.a = 10; // ❌

console.log('preventExtensions:', obj1); // {}
console.log('seal:', obj2); // { a: 10 }
console.log('freeze:', obj3); // { a: 1 }

console.log('='.repeat(40));

// ==========================================
// [고급] 얕은 동결 vs 깊은 동결 🔥🔥🔥
// ==========================================
console.log('\n=== 얕은 동결 vs 깊은 동결 ===');

/**
 * ⚠️ 중요: Object.freeze()는 "얕은(Shallow)" 동결!
 * - 1단계 프로퍼티만 동결
 * - 중첩된 객체는 동결 안 됨
 */

const shallowFrozen = {
   name: '아이브',
   members: {
      leader: '안유진',
      vocal: '리즈',
   },
};

Object.freeze(shallowFrozen);

// ❌ 1단계는 동결됨
shallowFrozen.name = 'IVE';
console.log('1단계 보호:', shallowFrozen.name); // 아이브

// 😱 중첩 객체는 동결 안 됨!
shallowFrozen.members.leader = '장원영';
shallowFrozen.members.newMember = '가을';

console.log('중첩 객체 변경됨:', shallowFrozen.members);
console.log('최상위 동결?', Object.isFrozen(shallowFrozen)); // true
console.log('중첩 객체 동결?', Object.isFrozen(shallowFrozen.members)); // false!

// ✅ 해결: 깊은 동결 (Deep Freeze) 구현
function deepFreeze(obj) {
   // 1. 최상위 객체 동결
   Object.freeze(obj);

   // 2. 모든 프로퍼티 순회
   Object.getOwnPropertyNames(obj).forEach((prop) => {
      // 3. 객체면 재귀적으로 동결
      if (
         obj[prop] !== null &&
         (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
         !Object.isFrozen(obj[prop])
      ) {
         deepFreeze(obj[prop]);
      }
   });

   return obj;
}

const deepFrozen = {
   name: '아이브',
   members: {
      leader: '안유진',
      positions: {
         vocal: '리즈',
         dance: '가을',
      },
   },
};

deepFreeze(deepFrozen);

// ✅ 모든 레벨 동결됨
deepFrozen.name = 'IVE'; // ❌
deepFrozen.members.leader = '장원영'; // ❌
deepFrozen.members.positions.vocal = '레이'; // ❌

console.log('깊은 동결:', deepFrozen);
console.log('중첩 객체도 동결?', Object.isFrozen(deepFrozen.members)); // true
console.log(
   '더 깊은 객체도 동결?',
   Object.isFrozen(deepFrozen.members.positions),
); // true

console.log('='.repeat(40));

// ==========================================
// [실무] 실전 활용 패턴 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] 활용 패턴 ===');

// --------------------------------------------------------
// 패턴 1: 상수 객체 (가장 많이 사용!) ⭐⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 1: 상수 객체 ---');

const CONFIG = Object.freeze({
   API: {
      BASE_URL: 'https://api.example.com',
      TIMEOUT: 5000,
      ENDPOINTS: {
         USERS: '/users',
         POSTS: '/posts',
      },
   },
   LIMITS: {
      MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
      MAX_REQUESTS_PER_HOUR: 1000,
   },
});

// ⚠️ 얕은 동결이므로 중첩 객체는 변경 가능
// CONFIG.API.BASE_URL = 'hack'; // 실제로는 변경됨

// ✅ 제대로 하려면 deepFreeze 사용
const SAFE_CONFIG = deepFreeze({
   API: {
      BASE_URL: 'https://api.example.com',
      TIMEOUT: 5000,
   },
});

console.log('안전한 설정:', SAFE_CONFIG);

// --------------------------------------------------------
// 패턴 2: Enum 만들기 ⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 2: Enum ---');

const UserRole = Object.freeze({
   ADMIN: 'admin',
   USER: 'user',
   GUEST: 'guest',
});

const OrderStatus = Object.freeze({
   PENDING: 'pending',
   PROCESSING: 'processing',
   COMPLETED: 'completed',
   CANCELLED: 'cancelled',
});

function processOrder(status) {
   if (status === OrderStatus.COMPLETED) {
      console.log('주문 완료 처리');
   }
}

// ✅ 타입 안전성
processOrder(OrderStatus.COMPLETED);

// ❌ 값 변경 불가
// OrderStatus.COMPLETED = 'done'; // 무시됨

console.log('UserRole:', UserRole);
console.log('OrderStatus:', OrderStatus);

// --------------------------------------------------------
// 패턴 3: 기본값 객체 보호 ⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 3: 기본값 객체 ---');

const DEFAULT_OPTIONS = Object.freeze({
   theme: 'dark',
   language: 'ko',
   notifications: true,
   autoSave: true,
});

function createUser(customOptions = {}) {
   // 기본값과 사용자 설정 병합
   return {
      ...DEFAULT_OPTIONS, // 기본값 (동결되어 있음)
      ...customOptions, // 사용자 설정으로 덮어쓰기
   };
}

const user1Options = createUser();
const user2Options = createUser({ theme: 'light', language: 'en' });

console.log('기본 사용자:', user1Options);
console.log('커스텀 사용자:', user2Options);

// ✅ DEFAULT_OPTIONS는 절대 안 변함
console.log('기본값 보호:', DEFAULT_OPTIONS);

// --------------------------------------------------------
// 패턴 4: 불변 상태 관리 (Redux 스타일) ⭐⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 4: 불변 상태 관리 ---');

class Store {
   #state;

   constructor(initialState) {
      this.#state = deepFreeze(initialState);
   }

   getState() {
      return this.#state;
   }

   setState(newState) {
      // 새 객체 생성 (기존 상태는 절대 변경 안 함)
      this.#state = deepFreeze({
         ...this.#state,
         ...newState,
      });
   }

   // 중첩 객체 업데이트
   updateNested(path, value) {
      const keys = path.split('.');
      const newState = { ...this.#state };

      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
         current[keys[i]] = { ...current[keys[i]] };
         current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      this.#state = deepFreeze(newState);
   }
}

const store = new Store({
   user: {
      name: '안유진',
      age: 21,
   },
   settings: {
      theme: 'dark',
   },
});

console.log('초기 상태:', store.getState());

// ✅ 상태 변경 (새 객체 생성)
store.setState({ settings: { theme: 'light' } });
console.log('변경 후:', store.getState());

// ❌ 직접 수정 불가
const state = store.getState();
state.user.name = '해커'; // 무시됨
console.log('보호됨:', store.getState());

// --------------------------------------------------------
// 패턴 5: 함수 파라미터 보호 ⭐
// --------------------------------------------------------
console.log('\n--- 패턴 5: 함수 파라미터 보호 ---');

function processData(data) {
   // 파라미터를 동결해서 함수 내부에서 실수로 변경 방지
   const safeData = Object.freeze({ ...data });

   // ❌ 이제 변경 불가
   safeData.newField = 'value'; // 무시됨

   return safeData;
}

const originalData = { id: 1, name: '데이터' };
const processed = processData(originalData);

console.log('원본 보호:', originalData);
console.log('처리된 데이터:', processed);

console.log('='.repeat(40));

// ==========================================
// [실무] 성능 고려사항
// ==========================================
console.log('\n=== 성능 고려사항 ===');

/**
 * ⚠️ 주의사항:
 * 1. freeze/seal은 성능 비용이 있음
 * 2. 큰 객체나 자주 호출되는 곳에서는 신중히 사용
 * 3. 필요한 곳에만 선택적으로 사용
 */

// ❌ 나쁜 예: 매번 freeze
function badExample(data) {
   return Object.freeze({ ...data }); // 매번 동결 (비효율)
}

// ✅ 좋은 예: 필요한 곳에만
const ONCE_CONFIG = Object.freeze({
   // 한 번만 동결 (초기화 시)
   apiUrl: 'https://api.com',
});

function goodExample(data) {
   return { ...data }; // 일반 복사 (효율적)
}

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 불변 객체 핵심 정리 (2026)
 * ==========================================
 *
 * [3가지 레벨]
 *
 * 1. preventExtensions (확장 방지)
 *    - 새 프로퍼티 추가만 막음
 *    - 삭제, 수정은 가능
 *    - Object.isExtensible()로 확인
 *
 * 2. seal (봉인) ⭐⭐⭐
 *    - 추가, 삭제 막음
 *    - 수정은 가능
 *    - configurable: false로 설정
 *    - Object.isSealed()로 확인
 *
 * 3. freeze (동결) ⭐⭐⭐ 가장 많이 사용!
 *    - 추가, 삭제, 수정 모두 막음
 *    - 완전히 읽기 전용
 *    - writable: false, configurable: false
 *    - Object.isFrozen()로 확인
 *
 * [비교표]
 * ┌──────────────┬──────┬──────┬──────┐
 * │              │ 추가 │ 삭제 │ 수정 │
 * ├──────────────┼──────┼──────┼──────┤
 * │ 일반         │  ✅  │  ✅  │  ✅  │
 * │ preventExt   │  ❌  │  ✅  │  ✅  │
 * │ seal         │  ❌  │  ❌  │  ✅  │
 * │ freeze       │  ❌  │  ❌  │  ❌  │
 * └──────────────┴──────┴──────┴──────┘
 *
 * [주의사항]
 *
 * ⚠️ 얕은(Shallow) 동결
 * - Object.freeze()는 1단계만 동결
 * - 중첩 객체는 동결 안 됨
 * - 완전 동결은 deepFreeze() 필요
 *
 * ⚠️ 성능
 * - freeze/seal은 비용이 있음
 * - 필요한 곳에만 선택적 사용
 * - 큰 객체는 신중히
 *
 * ⚠️ strict mode
 * - 일반 모드: 변경 시도 무시
 * - strict mode: 에러 발생
 *
 * ==========================================
 * 실무 활용 패턴
 * ==========================================
 *
 * ✅ freeze 사용
 * - 상수 객체 (CONFIG, CONSTANTS)
 * - Enum (UserRole, Status)
 * - 기본값 객체 (DEFAULT_OPTIONS)
 * - 불변 상태 관리 (Redux)
 *
 * ✅ seal 사용
 * - 설정 객체 (값 변경은 허용)
 * - API 응답 구조 고정
 * - 스키마 검증
 *
 * ✅ preventExtensions 사용
 * - 덜 사용됨 (seal이 더 안전)
 * - 특수한 경우에만
 *
 * ❌ 사용 지양
 * - 자주 변경되는 데이터
 * - 성능이 중요한 곳
 * - 큰 객체 (메모리)
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: "freeze와 seal의 차이는?"
 * A: seal은 프로퍼티 값 수정이 가능하지만,
 *    freeze는 완전히 읽기 전용입니다.
 *
 * Q2: "freeze하면 중첩 객체도 동결되나요?"
 * A: 아니요, 얕은(Shallow) 동결입니다.
 *    중첩 객체까지 동결하려면 deepFreeze가 필요합니다.
 *
 * Q3: "실무에서 언제 freeze를 쓰나요?"
 * A: 상수 객체(CONFIG), Enum, 기본값 객체 등
 *    절대 변경되면 안 되는 데이터에 사용합니다.
 *
 * Q4: "const와 freeze의 차이는?"
 * A: const는 변수 재할당을 막고,
 *    freeze는 객체 내부 프로퍼티 변경을 막습니다.
 *    const obj = {}; obj.a = 1; // 가능
 *    Object.freeze(obj); obj.a = 2; // 불가능
 *
 * Q5: "freeze의 성능 영향은?"
 * A: 동결 자체는 빠르지만, 매번 freeze하면
 *    오버헤드가 있습니다. 초기화 시 한 번만
 *    동결하는 게 좋습니다.
 *
 * ==========================================
 * 2026년 트렌드
 * ==========================================
 *
 * ✅ 불변성 중시
 * - React, Vue 등에서 필수
 * - Redux, Immutable.js
 * - 함수형 프로그래밍
 *
 * ✅ TypeScript와 함께
 * - as const (컴파일 타임 불변)
 * - readonly
 * - Readonly<T> 타입
 *
 * ✅ 실용적 사용
 * - 모든 걸 freeze하지 말 것
 * - 필요한 곳에만 선택적
 * - 성능과 안전성 균형
 */

console.log('\n불변 객체 완벽 정리 끝!');
