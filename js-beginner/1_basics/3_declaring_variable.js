/**
 * ==========================================
 * JavaScript 변수 선언
 * ==========================================
 *
 * 변수 선언 키워드 3가지
 * 1) var   - 사용 지양 (레거시)
 * 2) let   - 재할당 가능한 변수
 * 3) const - 재할당 불가능한 상수
 */

// ==========================================
// 1. var (사용 지양)
// ==========================================
/**
 * [var의 문제점]
 * - 함수 스코프 (function scope)
 * - 재선언 가능 (실수 유발)
 * - 호이스팅 이슈
 * - 현대 JavaScript에서는 사용하지 않음
 */

var name = '코드팩토리';
console.log(name); // 코드팩토리

var age = 30;
console.log(age); // 30

// var의 문제점 예시
var name = '안유진'; // 재선언 가능 (에러가 발생하지 않음)
console.log(name); // 안유진

console.log('='.repeat(40));

// ==========================================
// 2. let (재할당 가능)
// ==========================================
/**
 * [let의 특징]
 * - 블록 스코프 (block scope)
 * - 재할당 가능
 * - 재선언 불가능
 * - 값이 변경될 수 있는 변수에 사용
 */

let ive = '아이브';
console.log(ive); // 아이브

// 재할당 가능
ive = '안유진';
console.log(ive); // 안유진

ive = '장원영';
console.log(ive); // 장원영

// 재선언 불가능
// let ive = '가을'; // ❌ SyntaxError: Identifier 'ive' has already been declared

console.log('='.repeat(40));

// ==========================================
// 3. const (재할당 불가능)
// ==========================================
/**
 * [const의 특징]
 * - 블록 스코프 (block scope)
 * - 재할당 불가능
 * - 재선언 불가능
 * - 선언 시 반드시 초기화 필요
 * - 변하지 않는 값에 사용 (권장)
 */

const newJeans = '뉴진스';
console.log(newJeans); // 뉴진스

// 재할당 불가능
// newJeans = '코드팩토리'; // ❌ TypeError: Assignment to constant variable

// 재선언 불가능
// const newJeans = '민지'; // ❌ SyntaxError: Identifier 'newJeans' has already been declared

console.log('='.repeat(40));

// ==========================================
// 4. 선언 (Declaration) vs 할당 (Assignment)
// ==========================================

// 선언과 할당을 동시에
let user = '신재준';
console.log(user); // 신재준

// 선언만 하기 (let은 가능)
let girlFriend;
console.log(girlFriend); // undefined (값이 할당되지 않음)

// 나중에 할당
girlFriend = '여자친구';
console.log(girlFriend); // 여자친구

// const는 선언과 동시에 할당 필수
// const boyFriend; // ❌ SyntaxError: Missing initializer in const declaration
const boyFriend = '남자친구'; // ✅ 올바른 방법

console.log('='.repeat(40));

// ==========================================
// 5. 언제 무엇을 사용할까?
// ==========================================
/**
 * ✅ 권장 사항
 *
 * 1. 기본적으로 const 사용
 *    - 대부분의 경우 재할당이 필요없음
 *    - 코드의 의도를 명확히 표현
 *    - 실수로 인한 재할당 방지
 *
 * 2. 재할당이 필요한 경우만 let 사용
 *    - 반복문의 카운터
 *    - 조건에 따라 변하는 값
 *
 * 3. var는 절대 사용하지 말 것
 */

// ✅ const 사용 (권장)
const API_URL = 'https://api.example.com';
const MAX_COUNT = 100;
const userName = '안유진';

// ✅ let 사용 (재할당 필요)
let count = 0;
count = count + 1;
count = count + 1;
console.log(count); // 2

let score = 0;
score = 10;
score = 20;
console.log(score); // 20

// ❌ var 사용 금지
// var oldWay = 'do not use';

console.log('='.repeat(40));

// ==========================================
// 6. const의 객체/배열 (중요!)
// ==========================================
/**
 * const로 선언된 객체/배열은
 * - 재할당은 불가능
 * - 내부 값 변경은 가능
 */

// 객체
const user2 = {
   name: '안유진',
   age: 21,
};

console.log(user2); // { name: '안유진', age: 21 }

// 내부 속성 변경 가능 ✅
user2.name = '장원영';
user2.age = 20;
console.log(user2); // { name: '장원영', age: 20 }

// 객체 자체를 재할당은 불가능 ❌
// user2 = { name: '가을' }; // TypeError

// 배열
const members = ['안유진', '가을', '레이'];
console.log(members); // ['안유진', '가을', '레이']

// 배열 요소 변경 가능 ✅
members.push('장원영');
members[0] = '이서';
console.log(members); // ['이서', '가을', '레이', '장원영']

// 배열 자체를 재할당은 불가능 ❌
// members = ['새로운배열']; // TypeError

console.log('='.repeat(40));

// ==========================================
// 7. 정리
// ==========================================
/**
 * var  - ❌ 사용 금지
 * let  - ✅ 재할당이 필요할 때만 사용
 * const - ✅ 기본으로 사용 (권장)
 *
 * 선언: 변수를 생성하는 것
 * 할당: 변수에 값을 저장하는 것
 *
 * const는 재할당 불가지만,
 * 객체/배열의 내부 값은 변경 가능
 */
