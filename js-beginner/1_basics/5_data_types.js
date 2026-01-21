/**
 * ==========================================
 * JavaScript Data Types
 * ==========================================
 *
 * 6개의 Primitive Type + 1개의 Object Type
 *
 * [Primitive Types]
 * 1) Number
 * 2) String
 * 3) Boolean
 * 4) Undefined
 * 5) Null
 * 6) Symbol
 *
 * [Object Type]
 * 7) Object (Function, Array, Object 등)
 */

// ==========================================
// 1. Number Type
// ==========================================
const age = 30;
const temperature = -10;
const pi = 3.14;

console.log(typeof age); // number
console.log(typeof temperature); // number
console.log(typeof pi); // number

// 특수 숫자 값
const infinity = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

console.log(typeof infinity); // number
console.log(typeof negativeInfinity); // number
console.log(typeof notANumber); // number

console.log('='.repeat(40));

// ==========================================
// 2. String Type
// ==========================================
const codeFactory = '코드팩토리';
const ive = "'아이브' 안유진";

console.log(typeof codeFactory); // string

// Escape Characters
const newLine = '아이브\n안유진'; // 줄바꿈
const tab = '아이브\t장원영'; // 탭
const backSlash = '아이브\\코드팩토리'; // 백슬래시

console.log(newLine);
console.log(tab);
console.log(backSlash);

// Template Literal (백틱 사용)
const name = '신재준';
const greeting = `안녕하세요, ${name}입니다.`;

console.log(greeting);

// 문자열 연결
const groupName = '아이브';
console.log(groupName + ' 안유진'); // + 연산자
console.log(`${groupName} 안유진`); // 템플릿 리터럴 (권장)

console.log('='.repeat(40));

// ==========================================
// 3. Boolean Type
// ==========================================
const isTrue = true;
const isFalse = false;

console.log(typeof isTrue); // boolean
console.log(typeof isFalse); // boolean

console.log('='.repeat(40));

// ==========================================
// 4. Undefined Type
// ==========================================
/**
 * 값이 할당되지 않은 변수의 기본값
 * 직접 undefined를 할당하는 것은 지양할 것
 */
let noInit;
console.log(noInit); // undefined
console.log(typeof noInit); // undefined

console.log('='.repeat(40));

// ==========================================
// 5. Null Type
// ==========================================
/**
 * 개발자가 의도적으로 "값이 없음"을 명시
 * typeof null은 'object'를 반환 (JavaScript의 오래된 버그)
 */
let empty = null;
console.log(empty); // null
console.log(typeof empty); // object (주의!)

console.log('='.repeat(40));

// ==========================================
// 6. Symbol Type
// ==========================================
/**
 * 유일무이한 값을 생성할 때 사용
 * 같은 인자로 생성해도 각각 다른 값
 */
const test1 = '1';
const test2 = '1';
console.log(test1 === test2); // true (같은 문자열)

const symbol1 = Symbol('1');
const symbol2 = Symbol('1');
console.log(symbol1 === symbol2); // false (각각 고유한 값)

console.log('='.repeat(40));

// ==========================================
// 7. Object Type
// ==========================================

// Object (딕셔너리/맵 형태)
const dictionary = {
   red: '빨간색',
   orange: '주황색',
   blue: '파란색',
};

console.log(dictionary);
console.log(dictionary['red']); // 대괄호 접근
console.log(dictionary.orange); // 점 표기법 접근
console.log(typeof dictionary); // object

// Array (배열)
const iveMembersArray = ['안유진', '가을', '레이', '장원영', '리즈', '이서'];

console.log(iveMembersArray);
console.log(iveMembersArray[0]); // 안유진 (인덱스는 0부터 시작)
console.log(iveMembersArray[5]); // 이서
console.log(iveMembersArray.length); // 6

// 배열 요소 수정
iveMembersArray[0] = '코드팩토리';
console.log(iveMembersArray);
console.log(typeof iveMembersArray); // object

// Function (함수도 객체)
function greet() {
   return '안녕하세요';
}
console.log(typeof greet); // function

console.log('='.repeat(40));

// ==========================================
// Static vs Dynamic Typing
// ==========================================
/**
 * Static Typing (정적 타입)
 * - 변수 선언 시 타입을 명시
 * - 예: C, Java, TypeScript
 *
 * Dynamic Typing (동적 타입)
 * - 값에 의해 타입이 자동으로 결정
 * - JavaScript는 Dynamic Typing 언어
 */

let variable = 123; // number
console.log(typeof variable);

variable = '문자열'; // string (타입 변경 가능)
console.log(typeof variable);

variable = true; // boolean
console.log(typeof variable);
