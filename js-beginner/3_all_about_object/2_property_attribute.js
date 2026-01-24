/**
 * ==========================================
 * JavaScript 프로퍼티 어트리뷰트 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * [핵심 요약]
 * 프로퍼티 어트리뷰트 = 객체 프로퍼티의 "설정값"
 * - 수정 가능한지? (writable)
 * - 삭제 가능한지? (configurable)
 * - 반복문에 나올지? (enumerable)
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 중요 개념
 */

// ==========================================
// [초급] 프로퍼티의 종류
// ==========================================
console.log('=== [초급] 프로퍼티 종류 ===');

/**
 * 1. 데이터 프로퍼티 (Data Property)
 *    - 일반적인 key: value 형태
 *    - 실제 값을 가지고 있음
 *
 * 2. 접근자 프로퍼티 (Accessor Property)
 *    - get/set 함수로 구성
 *    - 값을 직접 가지지 않고, 다른 프로퍼티에 접근
 */

const person = {
   // 데이터 프로퍼티
   name: '신재준',
   year: 1996,

   // 접근자 프로퍼티
   get age() {
      return new Date().getFullYear() - this.year;
   },

   set age(age) {
      this.year = new Date().getFullYear() - age;
   },
};

console.log(person.name); // 데이터 프로퍼티
console.log(person.age); // 접근자 프로퍼티 (getter 호출)

console.log('='.repeat(40));

// ==========================================
// [초급] 프로퍼티 어트리뷰트 확인하기
// ==========================================
console.log('\n=== 프로퍼티 어트리뷰트 확인 ===');

/**
 * Object.getOwnPropertyDescriptor()
 * - 프로퍼티의 설정값(어트리뷰트)을 확인
 */

// 데이터 프로퍼티의 어트리뷰트
const nameDescriptor = Object.getOwnPropertyDescriptor(person, 'name');
console.log('name 어트리뷰트:', nameDescriptor);
/**
 * {
 *   value: '신재준',        // 값
 *   writable: true,         // 수정 가능
 *   enumerable: true,       // 열거 가능
 *   configurable: true      // 재정의 가능
 * }
 */

// 접근자 프로퍼티의 어트리뷰트
const ageDescriptor = Object.getOwnPropertyDescriptor(person, 'age');
console.log('age 어트리뷰트:', ageDescriptor);
/**
 * {
 *   get: [Function: get age],  // getter 함수
 *   set: [Function: set age],  // setter 함수
 *   enumerable: true,
 *   configurable: true
 * }
 */

// 모든 프로퍼티 어트리뷰트 한 번에 보기
console.log('모든 어트리뷰트:', Object.getOwnPropertyDescriptors(person));

console.log('='.repeat(40));

// ==========================================
// [중급] 4가지 어트리뷰트 상세 설명 🔥🔥🔥
// ==========================================
console.log('\n=== [중급] 4가지 어트리뷰트 ===');

/**
 * 데이터 프로퍼티의 4가지 어트리뷰트:
 *
 * 1. value: 실제 값
 * 2. writable: 값 수정 가능 여부
 * 3. enumerable: 반복문에 나타날지 여부
 * 4. configurable: 어트리뷰트 재정의/삭제 가능 여부
 */

// --------------------------------------------------------
// 1. writable: 값 수정 가능 여부 ⭐⭐⭐
// --------------------------------------------------------
console.log('\n--- 1. writable (수정 가능 여부) ---');

const user = {};

// writable: true (기본값)
Object.defineProperty(user, 'name', {
   value: '안유진',
   writable: true, // 수정 가능
   enumerable: true,
   configurable: true,
});

console.log(user.name); // 안유진
user.name = '장원영'; // 수정 가능
console.log(user.name); // 장원영

// writable: false (수정 불가) 🔥
Object.defineProperty(user, 'id', {
   value: 'user_123',
   writable: false, // 수정 불가!
   enumerable: true,
   configurable: true,
});

console.log(user.id); // user_123
user.id = 'user_456'; // 조용히 무시됨 (strict mode에서는 에러)
console.log(user.id); // user_123 (변경 안됨!)

// 🔥 실무 예시: 상수처럼 사용
Object.defineProperty(user, 'MAX_LOGIN_ATTEMPTS', {
   value: 5,
   writable: false, // 절대 변경 불가
   enumerable: true,
   configurable: false,
});

console.log('='.repeat(40));

// --------------------------------------------------------
// 2. enumerable: 반복문에 나타날지 여부 ⭐⭐
// --------------------------------------------------------
console.log('\n--- 2. enumerable (열거 가능 여부) ---');

const product = {
   name: '노트북',
   price: 1500000,
};

// enumerable: true (기본값) - 반복문에 나타남
Object.defineProperty(product, 'category', {
   value: '전자기기',
   enumerable: true, // 반복문에 나타남
   writable: true,
   configurable: true,
});

// enumerable: false - 반복문에서 숨김 🔥
Object.defineProperty(product, 'internalCode', {
   value: 'PROD_12345',
   enumerable: false, // 반복문에서 숨겨짐!
   writable: true,
   configurable: true,
});

console.log('=== Object.keys() ===');
console.log(Object.keys(product)); // ['name', 'price', 'category'] (internalCode 제외!)

console.log('\n=== for...in ===');
for (const key in product) {
   console.log(key, ':', product[key]);
}
// name, price, category만 나옴 (internalCode 안 나옴!)

console.log('\n=== 직접 접근 ===');
console.log(product.internalCode); // PROD_12345 (접근은 가능!)

// 🔥 실무 예시: 내부 메타데이터 숨기기
const blogPost = {
   title: '제목',
   content: '내용',
};

Object.defineProperty(blogPost, '_createdAt', {
   value: new Date(),
   enumerable: false, // JSON.stringify에서 제외됨
   writable: false,
   configurable: false,
});

console.log('JSON 변환:', JSON.stringify(blogPost)); // _createdAt 제외됨!

console.log('='.repeat(40));

// --------------------------------------------------------
// 3. configurable: 재정의/삭제 가능 여부 ⭐⭐⭐
// --------------------------------------------------------
console.log('\n--- 3. configurable (재정의 가능 여부) ---');

const settings = {};

// configurable: true (기본값)
Object.defineProperty(settings, 'theme', {
   value: 'dark',
   writable: true,
   enumerable: true,
   configurable: true, // 재정의 가능
});

// 어트리뷰트 변경 가능
Object.defineProperty(settings, 'theme', {
   enumerable: false, // 변경됨
});

console.log(
   'theme 변경됨:',
   Object.getOwnPropertyDescriptor(settings, 'theme'),
);

// 삭제 가능
delete settings.theme;
console.log('theme 삭제됨:', settings.theme); // undefined

// configurable: false (재정의 불가) 🔥
Object.defineProperty(settings, 'apiKey', {
   value: 'secret_key_123',
   writable: true,
   enumerable: false,
   configurable: false, // 재정의 불가!
});

// ❌ 어트리뷰트 변경 불가
try {
   Object.defineProperty(settings, 'apiKey', {
      enumerable: true, // 에러 발생!
   });
} catch (error) {
   console.log('❌ 에러:', error.message);
}

// ❌ 삭제 불가
delete settings.apiKey;
console.log('삭제 안됨:', settings.apiKey); // secret_key_123 (그대로 있음)

// ⚠️ 예외: writable은 true → false로만 변경 가능
Object.defineProperty(settings, 'apiKey', {
   writable: false, // 이건 가능!
});
console.log(
   'writable 변경:',
   Object.getOwnPropertyDescriptor(settings, 'apiKey'),
);

// 🔥 실무 예시: 상수 완전히 고정
Object.defineProperty(settings, 'VERSION', {
   value: '1.0.0',
   writable: false, // 변경 불가
   enumerable: true,
   configurable: false, // 재정의 불가 → 완전히 고정!
});

console.log('='.repeat(40));

// ==========================================
// [중급] Object.defineProperty() 사용법 🔥
// ==========================================
console.log('\n=== Object.defineProperty() 사용법 ===');

/**
 * Object.defineProperty(객체, '프로퍼티명', {
 *    value: 값,
 *    writable: true/false,
 *    enumerable: true/false,
 *    configurable: true/false
 * })
 */

const car = {
   brand: 'Tesla',
};

// 프로퍼티 추가하면서 어트리뷰트 설정
Object.defineProperty(car, 'model', {
   value: 'Model 3',
   writable: true,
   enumerable: true,
   configurable: true,
});

// 여러 프로퍼티 한 번에 정의
Object.defineProperties(car, {
   year: {
      value: 2024,
      writable: true,
      enumerable: true,
      configurable: true,
   },
   price: {
      value: 50000000,
      writable: false, // 가격 고정
      enumerable: true,
      configurable: false,
   },
   vin: {
      value: 'VIN123456',
      writable: false,
      enumerable: false, // 숨김
      configurable: false,
   },
});

console.log('자동차:', car);
console.log('Keys:', Object.keys(car)); // vin 제외됨

console.log('='.repeat(40));

// ==========================================
// [고급] 실무 활용 패턴 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] 활용 패턴 ===');

// --------------------------------------------------------
// 패턴 1: 상수 객체 만들기 ⭐⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 1: 상수 객체 ---');

const CONFIG = {};

Object.defineProperties(CONFIG, {
   API_URL: {
      value: 'https://api.example.com',
      writable: false, // 변경 불가
      enumerable: true,
      configurable: false, // 재정의 불가
   },
   TIMEOUT: {
      value: 5000,
      writable: false,
      enumerable: true,
      configurable: false,
   },
   MAX_RETRIES: {
      value: 3,
      writable: false,
      enumerable: true,
      configurable: false,
   },
});

console.log('설정:', CONFIG);

// ❌ 변경 시도 (무시됨)
CONFIG.API_URL = 'https://hack.com';
CONFIG.TIMEOUT = 99999;

console.log('변경 안됨:', CONFIG); // 그대로 유지!

console.log('='.repeat(40));

// --------------------------------------------------------
// 패턴 2: 읽기 전용 속성 만들기 ⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 2: 읽기 전용 속성 ---');

class BankAccount {
   constructor(owner, balance) {
      // 읽기 전용 accountNumber
      Object.defineProperty(this, 'accountNumber', {
         value: `ACC_${Date.now()}`,
         writable: false, // 계좌번호 변경 불가
         enumerable: true,
         configurable: false,
      });

      // 읽기 전용 owner
      Object.defineProperty(this, 'owner', {
         value: owner,
         writable: false,
         enumerable: true,
         configurable: false,
      });

      // 수정 가능한 balance (private처럼)
      Object.defineProperty(this, '_balance', {
         value: balance,
         writable: true,
         enumerable: false, // 숨김
         configurable: false,
      });
   }

   get balance() {
      return this._balance;
   }

   deposit(amount) {
      this._balance += amount;
      return this._balance;
   }
}

const account = new BankAccount('신재준', 10000);

console.log('계좌번호:', account.accountNumber);
console.log('소유자:', account.owner);
console.log('잔액:', account.balance);

// ❌ 변경 불가
account.accountNumber = 'FAKE_123';
account.owner = '해커';

console.log('변경 안됨:', account.accountNumber, account.owner);

// ✅ 입금은 가능
account.deposit(5000);
console.log('입금 후:', account.balance);

console.log('='.repeat(40));

// --------------------------------------------------------
// 패턴 3: 내부 속성 숨기기 (enumerable: false) ⭐
// --------------------------------------------------------
console.log('\n--- 패턴 3: 내부 속성 숨기기 ---');

class User {
   constructor(username, password) {
      // 공개 속성
      this.username = username;
      this.createdAt = new Date();

      // 비공개 속성 (숨김)
      Object.defineProperty(this, '_password', {
         value: password,
         writable: true,
         enumerable: false, // 반복문/JSON에서 제외
         configurable: false,
      });

      Object.defineProperty(this, '_loginAttempts', {
         value: 0,
         writable: true,
         enumerable: false,
         configurable: false,
      });
   }

   login(password) {
      if (this._password === password) {
         this._loginAttempts = 0;
         return '✅ 로그인 성공';
      }
      this._loginAttempts++;
      return `❌ 로그인 실패 (${this._loginAttempts}회)`;
   }

   toJSON() {
      return {
         username: this.username,
         createdAt: this.createdAt,
         // _password와 _loginAttempts는 자동으로 제외됨
      };
   }
}

const user1 = new User('yujin', 'password123');

console.log('사용자:', user1);
console.log('Keys:', Object.keys(user1)); // _password, _loginAttempts 제외
console.log('JSON:', JSON.stringify(user1)); // 비밀번호 제외됨!

console.log(user1.login('wrong')); // ❌
console.log(user1.login('password123')); // ✅

console.log('='.repeat(40));

// --------------------------------------------------------
// 패턴 4: 객체 봉인 (Object.seal) vs 동결 (Object.freeze) ⭐⭐
// --------------------------------------------------------
console.log('\n--- 패턴 4: 객체 봉인과 동결 ---');

/**
 * Object.seal(): 프로퍼티 추가/삭제 불가, 수정은 가능
 * - configurable: false로 설정
 * - writable은 유지
 */

const sealedObj = { name: '안유진', age: 21 };
Object.seal(sealedObj);

console.log('봉인 전:', Object.getOwnPropertyDescriptor(sealedObj, 'name'));

sealedObj.name = '장원영'; // ✅ 수정 가능
sealedObj.newProp = 'new'; // ❌ 추가 불가
delete sealedObj.age; // ❌ 삭제 불가

console.log('봉인 후:', sealedObj); // { name: '장원영', age: 21 }

/**
 * Object.freeze(): 완전히 동결 (추가/삭제/수정 모두 불가)
 * - configurable: false
 * - writable: false
 */

const frozenObj = { name: '가을', age: 22 };
Object.freeze(frozenObj);

frozenObj.name = '레이'; // ❌ 수정 불가
frozenObj.newProp = 'new'; // ❌ 추가 불가
delete frozenObj.age; // ❌ 삭제 불가

console.log('동결 후:', frozenObj); // { name: '가을', age: 22 } (변경 없음)

console.log('봉인됨?', Object.isSealed(sealedObj)); // true
console.log('동결됨?', Object.isFrozen(frozenObj)); // true

console.log('='.repeat(40));

// ==========================================
// [실무] 실전 종합 예제 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] 종합 예제: API Response ===');

class ApiResponse {
   constructor(data, statusCode = 200) {
      // 읽기 전용 상태 코드
      Object.defineProperty(this, 'statusCode', {
         value: statusCode,
         writable: false,
         enumerable: true,
         configurable: false,
      });

      // 읽기 전용 타임스탬프
      Object.defineProperty(this, 'timestamp', {
         value: new Date().toISOString(),
         writable: false,
         enumerable: true,
         configurable: false,
      });

      // 공개 데이터
      this.data = data;

      // 내부 메타데이터 (숨김)
      Object.defineProperty(this, '_requestId', {
         value: `req_${Date.now()}`,
         writable: false,
         enumerable: false,
         configurable: false,
      });

      Object.defineProperty(this, '_cached', {
         value: false,
         writable: true,
         enumerable: false,
         configurable: false,
      });
   }

   markAsCached() {
      this._cached = true;
   }

   toJSON() {
      return {
         statusCode: this.statusCode,
         timestamp: this.timestamp,
         data: this.data,
         // _requestId와 _cached는 자동 제외
      };
   }
}

const response = new ApiResponse({ users: ['안유진', '장원영'] }, 200);

console.log('응답:', response);
console.log('Keys:', Object.keys(response)); // 내부 속성 제외
console.log('JSON:', JSON.stringify(response, null, 2));

// ❌ 변경 불가
response.statusCode = 500;
response.timestamp = 'fake';

console.log('변경 안됨:', response.statusCode, response.timestamp);

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 프로퍼티 어트리뷰트 핵심 정리
 * ==========================================
 *
 * [4가지 어트리뷰트]
 *
 * 1. value
 *    - 프로퍼티의 실제 값
 *
 * 2. writable (수정 가능 여부) ⭐⭐⭐
 *    - true: 값 수정 가능
 *    - false: 값 수정 불가 (읽기 전용)
 *    - 용도: 상수, 계좌번호, ID 등
 *
 * 3. enumerable (열거 가능 여부) ⭐⭐
 *    - true: for...in, Object.keys(), JSON.stringify()에 나타남
 *    - false: 숨김 (내부 속성, 비밀번호 등)
 *    - 용도: 내부 메타데이터, 민감 정보
 *
 * 4. configurable (재정의 가능 여부) ⭐⭐⭐
 *    - true: 어트리뷰트 변경/삭제 가능
 *    - false: 완전히 고정 (삭제/재정의 불가)
 *    - 용도: 한 번 설정하면 절대 못 바꾸는 값
 *    - 예외: writable은 true → false로만 가능
 *
 * [주요 메서드]
 *
 * Object.getOwnPropertyDescriptor(obj, 'prop')
 * - 프로퍼티 어트리뷰트 확인
 *
 * Object.defineProperty(obj, 'prop', { ... })
 * - 프로퍼티 어트리뷰트 설정
 *
 * Object.defineProperties(obj, { ... })
 * - 여러 프로퍼티 한 번에 설정
 *
 * Object.seal(obj)
 * - 프로퍼티 추가/삭제 불가, 수정은 가능
 * - configurable: false
 *
 * Object.freeze(obj)
 * - 완전히 동결 (추가/삭제/수정 모두 불가)
 * - configurable: false, writable: false
 *
 * ==========================================
 * 실무 활용 패턴
 * ==========================================
 *
 * ✅ writable: false
 * - 상수 값 (API_URL, VERSION)
 * - 계좌번호, 주민번호, ID
 * - 한 번 설정하면 못 바꾸는 값
 *
 * ✅ enumerable: false
 * - 내부 메타데이터 (_requestId, _cache)
 * - 비밀번호, 토큰
 * - JSON 직렬화에서 제외할 값
 *
 * ✅ configurable: false
 * - 완전히 고정할 값
 * - 보안 설정
 * - 시스템 상수
 *
 * ✅ 조합 패턴
 * - 읽기 전용: writable: false
 * - 완전 고정: writable: false, configurable: false
 * - 숨김: enumerable: false
 * - 내부 상수: 위 3개 모두 false
 *
 * ==========================================
 * 언제 사용할까?
 * ==========================================
 *
 * ✅ 사용하는 경우:
 * - 라이브러리/프레임워크 개발
 * - 보안이 중요한 클래스 (계좌, 사용자)
 * - 설정 객체 (변경 방지)
 * - 내부 구현 숨기기
 *
 * ❌ 과도하게 사용하지 말 것:
 * - 일반 앱 개발에서는 잘 안 씀
 * - Class의 # Private이 더 직관적
 * - 너무 복잡하면 유지보수 어려움
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: "프로퍼티 어트리뷰트가 뭔가요?"
 * A: 프로퍼티의 동작을 정의하는 내부 설정값입니다.
 *    writable(수정), enumerable(열거), configurable(재정의)
 *    3가지가 대표적입니다.
 *
 * Q2: "writable: false면 어떻게 되나요?"
 * A: 값을 변경할 수 없는 읽기 전용이 됩니다.
 *    상수나 ID처럼 바뀌면 안 되는 값에 사용합니다.
 *
 * Q3: "enumerable: false의 용도는?"
 * A: for...in, Object.keys(), JSON.stringify()에서
 *    제외됩니다. 내부 메타데이터나 비밀번호처럼
 *    숨겨야 하는 속성에 사용합니다.
 *
 * Q4: "Object.seal과 Object.freeze의 차이는?"
 * A: seal은 추가/삭제만 막고 수정은 가능,
 *    freeze는 완전히 동결해서 아무것도 못 바꿉니다.
 *
 * Q5: "실무에서 자주 쓰나요?"
 * A: 일반 앱에서는 드물고, 라이브러리나
 *    보안이 중요한 부분에서 사용합니다.
 *    Class의 Private 필드(#)가 더 직관적이라
 *    요즘은 그쪽을 더 선호합니다.
 */

console.log('\n프로퍼티 어트리뷰트 완벽 정리 끝!');
