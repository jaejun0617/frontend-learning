/**
 * =====================================================================
 * 15_value_reference.js - Value vs Reference (2026 실무형 템플릿)
 * =====================================================================
 * 이 파일의 목표
 * 1) Primitive(원시) vs Object(객체)의 복사/비교 원리를 "확실히" 이해
 * 2) 얕은 복사(Shallow) / 깊은 복사(Deep) / 경로 업데이트(Path Update) 구분
 * 3) React/Vue 상태관리에서 왜 불변(Immutable) 업데이트가 필수인지 체감
 *
 * ✔️ 학습 포인트
 * - 원시는 값 복사(copy by value)라 독립적
 * - 객체는 참조 복사(copy by reference)라 공유됨(버그 1순위)
 * - spread는 얕은 복사(중첩은 공유)
 * - 깊은 복사는 structuredClone(가능할 때) / 또는 경로 업데이트
 */

console.clear?.();
console.log('='.repeat(60));
console.log('15) Value vs Reference - 핵심 + 패턴');
console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 0) 퀵 치트시트(면접 10초)
// ---------------------------------------------------------------------
console.log('\n[치트시트]');
console.log('- 원시: 값 복사(독립)');
console.log('- 객체: 참조 복사(공유)');
console.log('- === 는 "내용"이 아니라 "주소" 비교');
console.log('- {...obj}는 얕은 복사(중첩 공유)');
console.log('- 중첩 분리는 structuredClone 또는 경로 업데이트');

// =====================================================================
// 1) 초급: Copy by Value (원시 타입)
// =====================================================================
console.log('\n=== 1) Copy by Value (Primitive) ===');

let original = '안녕하세요';
let clone = original; // ✅ 값 복사: 완전히 독립적인 값

console.log('초기값:', { original, clone });

clone += ' 안유진 입니다'; // clone만 변경

console.log('원본:', original); // 영향 없음
console.log('복사본:', clone);
console.log('결론: 원시 타입은 복사본을 변경해도 원본은 안전 ✅');

// =====================================================================
// 2) 초급: Copy by Reference (객체 타입) - 버그 1순위
// =====================================================================
console.log('\n=== 2) Copy by Reference (Object/Array/Function) ===');

let originalObj = {
   name: '안유진',
   group: '아이브',
};

let cloneObj = originalObj; // ⚠️ 참조(주소) 복사: 같은 객체를 공유

console.log('초기값:', { originalObj, cloneObj });

cloneObj.group = '코드팩토리'; // 복사본 변경

console.log('원본:', originalObj); // ⚠️ 원본도 바뀜
console.log('복사본:', cloneObj);
console.log('같은 주소인가?', originalObj === cloneObj); // true
console.log('결론: 객체는 대입하면 주소가 공유되어 원본도 바뀐다 ⚠️');

// =====================================================================
// 3) 중급: 객체 비교(===)는 "내용"이 아니라 "주소" 비교
// =====================================================================
console.log('\n=== 3) 객체 비교(주소 비교) ===');

const obj1 = { name: '신재준', group: '코드팩토리' };
const obj2 = { name: '신재준', group: '코드팩토리' };

console.log('내용이 같아도 같은 객체인가?', obj1 === obj2); // false

const obj3 = obj1;
console.log('참조를 복사하면 같은 객체인가?', obj1 === obj3); // true

// ✅ 실무 팁: "내용 비교"가 필요하면 별도의 전략을 쓴다(얕은 비교 예시)
// - JSON stringify는 순서/타입 제약이 있어서 실무에선 조심해서 사용
const shallowEqual = (a, b) => {
   if (a === b) return true; // 같은 참조면 즉시 true
   if (!a || !b) return false;

   const aKeys = Object.keys(a);
   const bKeys = Object.keys(b);
   if (aKeys.length !== bKeys.length) return false;

   return aKeys.every((k) => a[k] === b[k]); // 1 depth만 비교
};

console.log('shallowEqual(obj1, obj2):', shallowEqual(obj1, obj2)); // true

// =====================================================================
// 4) 중급: Spread Operator (얕은 복사) + 덮어쓰기 순서
// =====================================================================
console.log('\n=== 4) Spread Operator (Shallow Copy) ===');

const yuJin1 = { name: '안유진', group: '아이브' };

const riskyCopy = yuJin1; // ⚠️ 참조 복사
const safeCopy = { ...yuJin1 }; // ✅ 얕은 복사: 새 객체 생성(1 depth)

console.log('참조 복사 비교:', yuJin1 === riskyCopy); // true
console.log('Spread 복사 비교:', yuJin1 === safeCopy); // false

// ✅ 덮어쓰기 규칙: "기존 펼치고" -> "바꿀 값"(뒤에서 덮어쓰기)
const nextYuJin = {
   ...yuJin1,
   group: '코드팩토리',
   year: 2003,
};

console.log('불변 업데이트 결과:', nextYuJin);

// ❌ 순서가 뒤집히면 의도대로 안 바뀜
const wrongOrder = {
   group: '코드팩토리',
   ...yuJin1, // 뒤에서 yuJin1.group이 다시 덮어씀
};
console.log('순서 실수:', wrongOrder.group); // '아이브'

// =====================================================================
// 5) 고급: 얕은 복사의 함정(중첩 객체) + 해결책 2가지
// =====================================================================
console.log('\n=== 5) Shallow Copy Trap (Nested Object) ===');

const originalUser = {
   name: '가을',
   info: {
      hobby: '독서',
   },
};

const spreadUser = { ...originalUser }; // ⚠️ info는 여전히 같은 주소

// 1) 1 depth 변경은 안전(겉껍질은 새 객체)
spreadUser.name = '김가을';
console.log('1 depth 변경 - 원본 name:', originalUser.name); // '가을'

// 2) 중첩 변경은 위험(속은 공유)
spreadUser.info.hobby = '게임';
console.log('nested 변경 - 원본 hobby:', originalUser.info.hobby); // '게임' (원본도 바뀜)

// ✅ 해결책 A) deep copy: structuredClone (가능할 때)
// - 왜? 깊은 중첩까지 분리해 "완전 독립"을 보장
// - 단, 함수/DOM 등 일부 타입은 제한될 수 있음
const deepClone = (value) => {
   // 최신 환경: structuredClone
   if (typeof structuredClone === 'function') return structuredClone(value);

   // 폴백: JSON 방식(제약: Date/Map/Set/undefined/function 등 손실 가능)
   return JSON.parse(JSON.stringify(value));
};

const deepCopyUser = deepClone(originalUser);
deepCopyUser.info.hobby = '코딩';

console.log('deep copy 후 - 원본 hobby:', originalUser.info.hobby); // '게임' (이전 변경이 남아있음)
console.log('deep copy 후 - 복사본 hobby:', deepCopyUser.info.hobby); // '코딩'

// ✅ 해결책 B) 경로 업데이트(Path Update) - 실무 최강
// - 왜? deep clone은 비싸고 불필요한 경우가 많음
// - 바뀌는 경로만 새로 만들면 성능/가독성/추적이 좋음

const state = {
   user: {
      profile: {
         city: '서울',
         hobby: '독서',
      },
   },
};

const nextState = {
   ...state,
   user: {
      ...state.user,
      profile: {
         ...state.user.profile,
         city: '고양시', // ✅ 바뀌는 부분만 교체
      },
   },
};

console.log('path update - 원본 city:', state.user.profile.city); // '서울'
console.log('path update - 새 city:', nextState.user.profile.city); // '고양시'
console.log(
   '같은 profile 참조?',
   state.user.profile === nextState.user.profile,
); // false

// =====================================================================
// 6) 실무: 배열도 "불변 업데이트"로 다루기
// =====================================================================
console.log('\n=== 6) Array Immutable Patterns (실무) ===');

const todos = [
   { id: 1, text: '공부하기', done: false },
   { id: 2, text: '커밋하기', done: false },
];

// ✅ 추가: push 대신 새 배열
const added = [...todos, { id: 3, text: '복습하기', done: false }];

// ✅ 수정: map으로 특정 항목만 새 객체로 교체
const toggled = added.map((t) => (t.id === 2 ? { ...t, done: true } : t));

// ✅ 삭제: filter로 제거
const removed = toggled.filter((t) => t.id !== 1);

console.log('원본:', todos);
console.log('추가:', added);
console.log('수정:', toggled);
console.log('삭제:', removed);

// =====================================================================
// 7) 실무: 함수 인자에서 "부작용"을 피하는 규칙
// =====================================================================
console.log('\n=== 7) Function Side Effects Rule (실무) ===');

// ❌ 나쁜 예: 인자로 받은 객체를 직접 변경(호출자가 예상 못 함)
function mutateUser(user) {
   user.lastLoginAt = Date.now();
   return user; // 같은 참조
}

// ✅ 좋은 예: 새 객체로 반환(불변 규칙)
function updateUser(user) {
   return {
      ...user,
      lastLoginAt: Date.now(),
   };
}

const u = { id: 1, name: '안유진' };
const u1 = mutateUser(u);
const u2 = updateUser(u);

console.log('mutateUser: 같은 참조?', u === u1); // true
console.log('updateUser: 같은 참조?', u === u2); // false

// =====================================================================
// 8) 디버깅 체크리스트(버그 방지)
// =====================================================================
console.log('\n=== 8) Debug Checklist ===');

console.log('1) prev === next 가 true면: 같은 참조(원본 변경 의심)');
console.log('2) spread로 복사했는데 중첩이 있다면: 얕은 복사 함정 의심');
console.log('3) 상태 업데이트는: 경로 업데이트(map/filter/spread)로 처리');
console.log('4) deep clone은: 정말 필요할 때만(비용/제약 고려)');

console.log('\n' + '='.repeat(60));
console.log('Value vs Reference 정리 끝!');
console.log('='.repeat(60));
