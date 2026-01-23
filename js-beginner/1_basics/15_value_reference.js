/**
 * ==========================================
 * JavaScript 동작 원리: Value vs Reference (2026년 최신)
 * ==========================================
 *
 * ⭐ = 면접 빈출 / 버그 발생 1순위 원인
 * 🔥 = React/Vue 상태관리의 핵심 원리
 *
 * [핵심 요약]
 * 1. Primitive(원시 타입): 값(Value) 그 자체가 복사됨. (독립적)
 * 2. Object(객체 타입): 메모리 주소(Reference)가 복사됨. (공유됨)
 */

// ==========================================
// 1. Copy by Value (값에 의한 전달)
// ==========================================
console.log('=== 1. Copy by Value (원시 타입) ===');

/**
 * 대상: String, Number, Boolean, null, undefined, Symbol
 * 특징: 변수에 값을 할당하면, '값 그 자체'가 메모리에 생성됨.
 *      복사하면 완전히 독립적인 별도의 메모리를 가짐.
 */

let original = '안녕하세요';
let clone = original; // 값('안녕하세요')이 복사되어 들어감

console.log('초기값:', { original, clone });

clone += ' 안유진 입니다'; // clone만 수정함

console.log('----------------');
console.log('원본:', original); // '안녕하세요' (영향 없음)
console.log('복사본:', clone); // '안녕하세요 안유진 입니다'
console.log('----------------');
console.log('결론: 원시 타입은 복사본을 바꿔도 원본은 안전하다.');

console.log('='.repeat(40));

// ==========================================
// 2. Copy by Reference (참조에 의한 전달) ⭐⭐⭐
// ==========================================
console.log('\n=== 2. Copy by Reference (객체 타입) ===');

/**
 * 대상: Object, Array, Function
 * 특징: 변수에는 값이 아니라 '메모리 주소(참조)'가 저장됨.
 *      복사하면 '주소'만 복사되므로, 실제 집(데이터)은 하나임.
 * 비유: 집 열쇠를 복사해준 것. (열쇠는 2개지만 집은 1개)
 */

let originalObj = {
   name: '안유진',
   group: '아이브',
};

let cloneObj = originalObj; // ⚠️ 주소(Reference)가 복사됨!

console.log('초기값:', { originalObj, cloneObj });

// 복사본을 수정했는데...
cloneObj['group'] = '코드팩토리';

console.log('----------------');
console.log('원본:', originalObj); // ⚠️ '코드팩토리'로 바뀜!
console.log('복사본:', cloneObj); // '코드팩토리'
console.log('----------------');
console.log(
   '결론: 객체는 복사본을 건드리면 원본도 같이 바뀐다. (같은 주소를 보니까)',
);

// 같은 주소인지 확인
console.log('같은 주소인가?', originalObj === cloneObj); // true

console.log('='.repeat(40));

// ==========================================
// 3. 객체의 비교 (Comparison) ⭐⭐
// ==========================================
console.log('\n=== 3. 객체의 비교 ===');

/**
 * 객체끼리의 비교(===)는 '내용물'이 아니라 '주소'를 비교한다.
 */

const obj1 = {
   name: '신재준',
   group: '코드팩토리',
};

const obj2 = {
   name: '신재준',
   group: '코드팩토리',
};

// 내용은 똑같지만, 서로 다른 메모리에 만들어짐
console.log('내용이 같아도 다른 객체인가?', obj1 === obj2); // false 🔥

const obj3 = obj1;
console.log('주소를 복사했으면 같은가?', obj1 === obj3); // true

console.log('='.repeat(40));

// ==========================================
// 4. Spread Operator (얕은 복사 - Shallow Copy) 🔥🔥🔥
// ==========================================
console.log('\n=== 4. Spread Operator & 불변성 ===');

/**
 * Spread(...)를 쓰면 '새로운 주소'에 '새로운 객체'를 만든다.
 * React에서 상태(State)를 업데이트할 때 필수적인 패턴!
 */

const yuJin1 = {
   name: '안유진',
   group: '아이브',
};

const yuJin2 = yuJin1; // 참조 복사 (위험)
const yuJin3 = { ...yuJin1 }; // Spread 복사 (안전, 새로운 객체 생성)

console.log('참조 복사 비교:', yuJin1 === yuJin2); // true
console.log('Spread 복사 비교:', yuJin1 === yuJin3); // false (독립적임!) ⭐

// ----------------------------------------
// Spread의 순서 중요성 (덮어쓰기) ⭐⭐
// ----------------------------------------

// 1) 덮어쓰기 실패 (Spread가 뒤에 오면 덮어씌워짐)
const wrongCopy = {
   name: '코드팩토리', // 이게 먼저 들어가고
   ...yuJin3, // yuJin3의 name('안유진')이 나중에 덮어씀
};
console.log('순서 잘못씀:', wrongCopy.name); // '안유진'

// 2) 덮어쓰기 성공 (Spread를 먼저 쓰고 수정할 값을 뒤에) 🔥 [권장 패턴]
const rightCopy = {
   ...yuJin3, // 기존 값 쫙 깔고
   name: '코드팩토리', // name만 '코드팩토리'로 교체
   year: 2003, // 새로운 값 추가
};
console.log('제대로 수정:', rightCopy);

// 배열에서의 활용
const numbers = [1, 3, 5];
const numbers2 = [10, ...numbers, 99]; // [10, 1, 3, 5, 99]
console.log('배열 Spread:', numbers2);

console.log('='.repeat(40));

// ==========================================
// 5. [심화] 얕은 복사의 함정 (Nested Object) ⚠️
// ==========================================
console.log('\n=== 5. [심화] 얕은 복사의 한계 ===');

/**
 * Spread Operator는 '껍데기'만 새로 만들고,
 * 내부에 있는 또 다른 객체는 여전히 '주소'를 공유한다.
 */

const originalUser = {
   name: '가을',
   info: {
      hobby: '독서', // 객체 안에 객체가 있음
   },
};

const spreadUser = { ...originalUser };

// 1단계 값 변경 (독립적)
spreadUser.name = '김가을';
console.log('1단계 변경(원본):', originalUser.name); // '가을' (안바뀜 - 굿)

// 2단계(중첩) 값 변경 (공유됨 🚨)
spreadUser.info.hobby = '게임';
console.log('2단계 변경(원본):', originalUser.info.hobby); // '게임' (바껴버림!! 😱)

/**
 * 해결책: Deep Copy (깊은 복사)
 * 1. JSON.parse(JSON.stringify(obj)) - 느림
 * 2. structuredClone(obj) - 최신 브라우저 표준 (2026년 기준 기본) ⭐
 */
const deepCopyUser = structuredClone(originalUser);
deepCopyUser.info.hobby = '코딩';

console.log('깊은 복사 후 원본:', originalUser.info.hobby); // '게임' (안바뀜!)
console.log('깊은 복사본:', deepCopyUser.info.hobby); // '코딩'

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 핵심 요약: 이것만 기억하세요!
 * ==========================================
 *
 * 1. 원시값(String, Number)은 그냥 써도 안전하다. (Value Copy)
 * 2. 객체/배열은 그냥 대입(=)하면 주소가 공유되어 원본이 망가진다. (Reference Copy)
 * 3. 객체를 안전하게 복사하려면 Spread Operator `...`를 써라. (얕은 복사)
 * 4. Spread를 쓸 때 `...`을 먼저 쓰고, 바꿀 값을 뒤에 적어라.
 * 5. 객체 안에 객체가 또 있다면 `structuredClone`을 써야 완벽히 분리된다.
 */
