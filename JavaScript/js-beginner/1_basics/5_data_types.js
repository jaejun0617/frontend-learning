/**
 * ==========================================
 * JavaScript Data Types 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * 7개의 Primitive Type + 1개의 Object Type
 *
 * [Primitive Types] - 불변(Immutable)
 * 1) Number
 * 2) String
 * 3) Boolean
 * 4) Undefined
 * 5) Null
 * 6) Symbol (ES6)
 * 7) BigInt (ES2020) 🔥
 *
 * [Object Type] - 가변(Mutable)
 * 8) Object (Function, Array, Date, RegExp 등)
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 중요 개념
 */

// ==========================================
// [초급] 1. Number Type ⭐⭐⭐
// ==========================================
console.log('=== 1. Number Type ===');

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

// NaN 체크 (중요!) 🔥
console.log(NaN === NaN); // false! (NaN은 자기 자신과도 다름)
console.log(Number.isNaN(NaN)); // true ✅
console.log(Number.isNaN('문자열')); // false
console.log(isNaN('문자열')); // true (숫자로 변환 시도 후 체크)

// 안전한 정수 범위
console.log('최대 안전 정수:', Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log('최소 안전 정수:', Number.MIN_SAFE_INTEGER); // -9007199254740991

// 🔥 실무 패턴: 숫자 검증
function isValidNumber(value) {
   return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

console.log(isValidNumber(123)); // true
console.log(isValidNumber(NaN)); // false
console.log(isValidNumber(Infinity)); // false
console.log(isValidNumber('123')); // false

console.log('='.repeat(40));

// ==========================================
// [초급] 2. String Type ⭐⭐⭐
// ==========================================
console.log('\n=== 2. String Type ===');

const codeFactory = '코드팩토리';
const ive = "'아이브' 안유진";

console.log(typeof codeFactory); // string

// Escape Characters
const newLine = '아이브\n안유진'; // 줄바꿈
const tab = '아이브\t장원영'; // 탭
const backSlash = '아이브\\코드팩토리'; // 백슬래시
const quote = '작은따옴표: \', 큰따옴표: "';

console.log(newLine);
console.log(tab);
console.log(backSlash);
console.log(quote);

// Template Literal (백틱) - 권장 🔥
const name = '신재준';
const greeting = `안녕하세요, ${name}입니다.`;
const multiLine = `
   첫 번째 줄
   두 번째 줄
   세 번째 줄
`;

console.log(greeting);
console.log(multiLine);

// 문자열 연결
const groupName = '아이브';
console.log(groupName + ' 안유진'); // + 연산자
console.log(`${groupName} 안유진`); // 템플릿 리터럴 (권장)

// 🔥 실무 패턴: 문자열 메서드
const text = '  Hello World  ';
console.log(text.trim()); // 'Hello World' (공백 제거)
console.log(text.toUpperCase()); // '  HELLO WORLD  '
console.log(text.toLowerCase()); // '  hello world  '
console.log(text.includes('World')); // true
console.log(text.startsWith('  H')); // true
console.log(text.endsWith('d  ')); // true
console.log(text.replace('World', 'JavaScript')); // '  Hello JavaScript  '

console.log('='.repeat(40));

// ==========================================
// [초급] 3. Boolean Type ⭐⭐⭐
// ==========================================
console.log('\n=== 3. Boolean Type ===');

const isTrue = true;
const isFalse = false;

console.log(typeof isTrue); // boolean
console.log(typeof isFalse); // boolean

// Boolean 변환 🔥
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean('hello')); // true
console.log(Boolean('')); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

console.log('='.repeat(40));

// ==========================================
// [중급] 4. Undefined Type 🔥
// ==========================================
console.log('\n=== 4. Undefined Type ===');

/**
 * undefined: 값이 할당되지 않은 상태
 * - 변수 선언만 하고 값 할당 안 함
 * - 존재하지 않는 객체 프로퍼티
 * - 함수에서 return 없을 때
 * - 함수 파라미터에 값 안 넘겼을 때
 */

let noInit;
console.log(noInit); // undefined
console.log(typeof noInit); // undefined

// 존재하지 않는 프로퍼티
const obj = { name: '안유진' };
console.log(obj.age); // undefined

// return 없는 함수
function noReturn() {
   console.log('실행됨');
}
console.log(noReturn()); // undefined

// 파라미터 없이 호출
function greet(name) {
   console.log(name); // undefined
}
greet();

// ⚠️ 직접 undefined 할당은 지양
// let x = undefined; // ❌ 안 좋은 패턴

console.log('='.repeat(40));

// ==========================================
// [중급] 5. Null Type 🔥
// ==========================================
console.log('\n=== 5. Null Type ===');

/**
 * null: 개발자가 의도적으로 "값이 없음"을 명시
 * - 명시적으로 빈 값
 * - typeof null === 'object' (JavaScript 버그!)
 */

let empty = null;
console.log(empty); // null
console.log(typeof empty); // object (주의! 이건 버그임)

// null vs undefined 🔥
let a; // undefined (선언만)
let b = null; // null (의도적으로 비움)

console.log(a); // undefined
console.log(b); // null

console.log(a == b); // true (동등 비교 - 타입 변환)
console.log(a === b); // false (일치 비교 - 타입까지)

// 🔥 실무 패턴: null 체크
function processUser(user) {
   if (user === null) {
      console.log('사용자가 없습니다');
      return;
   }
   console.log('사용자:', user);
}

// Nullish Coalescing (??) - ES2020
const value1 = null ?? 'default'; // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default'; // 0 (0은 유효한 값)
const value4 = '' ?? 'default'; // '' (빈 문자열도 유효)

console.log(value1, value2, value3, value4);

console.log('='.repeat(40));

// ==========================================
// [중급] 6. Symbol Type 🔥
// ==========================================
console.log('\n=== 6. Symbol Type ===');

/**
 * Symbol: 유일무이한 값 생성
 * - 같은 설명으로 만들어도 서로 다름
 * - 객체 프로퍼티 키로 사용 (충돌 방지)
 * - 전역 심볼 레지스트리
 */

const test1 = '1';
const test2 = '1';
console.log(test1 === test2); // true (같은 문자열)

const symbol1 = Symbol('1');
const symbol2 = Symbol('1');
console.log(symbol1 === symbol2); // false (각각 고유)

// 🔥 실무 패턴 1: 객체 프로퍼티 키 (충돌 방지)
const ID = Symbol('id');
const user = {
   name: '안유진',
   [ID]: 12345, // Symbol을 키로 사용
};

console.log(user.name); // '안유진'
console.log(user[ID]); // 12345
console.log(Object.keys(user)); // ['name'] (Symbol 키는 제외됨)

// 🔥 실무 패턴 2: 상수 정의 (Enum)
const COLOR = {
   RED: Symbol('red'),
   GREEN: Symbol('green'),
   BLUE: Symbol('blue'),
};

function setColor(color) {
   if (color === COLOR.RED) {
      console.log('빨간색 설정');
   }
}

setColor(COLOR.RED);

// 🔥 실무 패턴 3: 전역 심볼 (Symbol.for)
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true (전역 심볼은 같음)

console.log('='.repeat(40));

// ==========================================
// [고급] 7. BigInt Type 🔥 (ES2020)
// ==========================================
console.log('\n=== 7. BigInt Type (NEW!) ===');

/**
 * BigInt: 아주 큰 정수를 다룰 때 사용
 * - Number의 안전 범위를 넘어서는 정수
 * - 끝에 'n'을 붙임
 * - Number와 섞어서 연산 불가
 */

// Number의 한계
const maxSafeInt = Number.MAX_SAFE_INTEGER;
console.log('최대 안전 정수:', maxSafeInt); // 9007199254740991
console.log('초과 시 문제:', maxSafeInt + 1); // 9007199254740992 ✅
console.log('문제 발생:', maxSafeInt + 2); // 9007199254740992 ❌ (같은 값!)

// BigInt 사용
const bigInt1 = 1234567890123456789012345678901234567890n;
const bigInt2 = BigInt('9007199254740991');
const bigInt3 = BigInt(100);

console.log(typeof bigInt1); // bigint
console.log(bigInt1);

// BigInt 연산
console.log(bigInt2 + 1n); // 9007199254740992n
console.log(bigInt2 * 2n); // 18014398509481982n

// ⚠️ Number와 섞으면 에러
// console.log(bigInt2 + 100); // ❌ TypeError

// 변환 필요
console.log(bigInt2 + BigInt(100)); // ✅
console.log(Number(bigInt3) + 100); // ✅

// 🔥 실무 예시: 암호화, 큰 ID, 타임스탬프
const userId = 9007199254740992n;
const timestamp = BigInt(Date.now());

console.log('사용자 ID:', userId);
console.log('타임스탬프:', timestamp);

console.log('='.repeat(40));

// ==========================================
// [초급] 8. Object Type ⭐⭐⭐
// ==========================================
console.log('\n=== 8. Object Type ===');

// Object (딕셔너리/맵)
const dictionary = {
   red: '빨간색',
   orange: '주황색',
   blue: '파란색',
};

console.log(dictionary);
console.log(dictionary['red']); // 대괄호 접근
console.log(dictionary.orange); // 점 표기법
console.log(typeof dictionary); // object

// Array (배열)
const iveMembersArray = ['안유진', '가을', '레이', '장원영', '리즈', '이서'];

console.log(iveMembersArray);
console.log(iveMembersArray[0]); // 안유진
console.log(iveMembersArray.length); // 6
console.log(typeof iveMembersArray); // object
console.log(Array.isArray(iveMembersArray)); // true ✅

// Function (함수도 객체)
function greetFunc() {
   return '안녕하세요';
}
console.log(typeof greetFunc); // function
console.log(greetFunc instanceof Object); // true

// Date (날짜)
const now = new Date();
console.log(typeof now); // object
console.log(now instanceof Date); // true

// RegExp (정규표현식)
const regex = /abc/;
console.log(typeof regex); // object
console.log(regex instanceof RegExp); // true

console.log('='.repeat(40));

// ==========================================
// [중급] Primitive vs Object 비교 🔥🔥🔥
// ==========================================
console.log('\n=== Primitive vs Object ===');

/**
 * Primitive (원시 타입):
 * - 불변(Immutable)
 * - 값 자체가 저장됨
 * - 복사하면 독립적
 *
 * Object (객체 타입):
 * - 가변(Mutable)
 * - 참조(Reference)가 저장됨
 * - 복사하면 같은 객체 참조
 */

// Primitive - 값 복사
let x = 10;
let y = x; // 값 복사
y = 20;
console.log('x:', x); // 10 (변경 안됨)
console.log('y:', y); // 20

// Object - 참조 복사
const obj1 = { value: 10 };
const obj2 = obj1; // 참조 복사 (같은 객체 가리킴)
obj2.value = 20;
console.log('obj1:', obj1.value); // 20 (변경됨! 같은 객체니까)
console.log('obj2:', obj2.value); // 20
console.log(obj1 === obj2); // true (같은 객체)

// Object - 진짜 복사 (얕은 복사)
const obj3 = { value: 10 };
const obj4 = { ...obj3 }; // 새 객체 생성
obj4.value = 20;
console.log('obj3:', obj3.value); // 10 (독립적)
console.log('obj4:', obj4.value); // 20
console.log(obj3 === obj4); // false (다른 객체)

console.log('='.repeat(40));

// ==========================================
// [중급] 타입 체크 방법 🔥🔥🔥
// ==========================================
console.log('\n=== 타입 체크 방법 ===');

const value = 42;

// 1. typeof - 기본 타입 체크
console.log(typeof value); // 'number'
console.log(typeof 'hello'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' ⚠️ 버그!
console.log(typeof Symbol('s')); // 'symbol'
console.log(typeof 123n); // 'bigint'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' ⚠️
console.log(typeof function () {}); // 'function'

// 2. instanceof - 객체 타입 체크
console.log([] instanceof Array); // true ✅
console.log([] instanceof Object); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true

// 3. Array.isArray() - 배열 체크 (권장)
console.log(Array.isArray([])); // true ✅
console.log(Array.isArray({})); // false

// 4. Object.prototype.toString.call() - 정확한 타입
console.log(Object.prototype.toString.call(null)); // '[object Null]'
console.log(Object.prototype.toString.call(undefined)); // '[object Undefined]'
console.log(Object.prototype.toString.call([])); // '[object Array]'
console.log(Object.prototype.toString.call({})); // '[object Object]'
console.log(Object.prototype.toString.call(new Date())); // '[object Date]'

// 🔥 실무 패턴: 타입 체크 유틸
function getType(value) {
   if (value === null) return 'null';
   if (value === undefined) return 'undefined';
   if (Array.isArray(value)) return 'array';

   const type = typeof value;
   if (type === 'object') {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
   }
   return type;
}

console.log(getType(123)); // 'number'
console.log(getType('hello')); // 'string'
console.log(getType([])); // 'array'
console.log(getType({})); // 'object'
console.log(getType(new Date())); // 'date'
console.log(getType(null)); // 'null'
console.log(getType(undefined)); // 'undefined'

console.log('='.repeat(40));

// ==========================================
// [중급] Falsy vs Truthy 🔥🔥🔥
// ==========================================
console.log('\n=== Falsy vs Truthy ===');

/**
 * Falsy 값 (8개) - false로 변환되는 값
 * 1. false
 * 2. 0
 * 3. -0
 * 4. 0n (BigInt 0)
 * 5. '' (빈 문자열)
 * 6. null
 * 7. undefined
 * 8. NaN
 *
 * Truthy 값 - 위 8개를 제외한 모든 값
 */

// Falsy 값들
console.log('=== Falsy 값 ===');
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false
console.log(Boolean('')); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Truthy 값들 (주의!)
console.log('=== Truthy 값 ===');
console.log(Boolean('0')); // true ⚠️ 문자열 '0'
console.log(Boolean('false')); // true ⚠️ 문자열 'false'
console.log(Boolean([])); // true ⚠️ 빈 배열
console.log(Boolean({})); // true ⚠️ 빈 객체
console.log(Boolean(-1)); // true
console.log(Boolean(' ')); // true ⚠️ 공백

// 🔥 실무 패턴: 조건문에서 활용
function checkValue(value) {
   if (value) {
      console.log('✅ Truthy:', value);
   } else {
      console.log('❌ Falsy:', value);
   }
}

checkValue(1); // ✅
checkValue(0); // ❌
checkValue('hello'); // ✅
checkValue(''); // ❌
checkValue([]); // ✅ (배열은 truthy!)
checkValue(null); // ❌

console.log('='.repeat(40));

// ==========================================
// [고급] Static vs Dynamic Typing 🔥
// ==========================================
console.log('\n=== Static vs Dynamic Typing ===');

/**
 * Static Typing (정적 타입)
 * - 변수 선언 시 타입 명시
 * - 컴파일 타임에 타입 체크
 * - 예: C, Java, TypeScript
 *
 * Dynamic Typing (동적 타입)
 * - 런타임에 값에 의해 타입 결정
 * - 같은 변수에 다른 타입 할당 가능
 * - JavaScript는 Dynamic Typing
 */

let variable = 123; // number
console.log(typeof variable);

variable = '문자열'; // string (타입 변경 가능!)
console.log(typeof variable);

variable = true; // boolean
console.log(typeof variable);

variable = null; // object
console.log(typeof variable);

// 🔥 TypeScript로 Static Typing
/**
 * let num: number = 123;
 * num = 'hello'; // ❌ 컴파일 에러!
 */

console.log('='.repeat(40));

// ==========================================
// [실무] 실전 종합 예제
// ==========================================
console.log('\n=== 실전 종합 예제 ===');

// 타입 검증 함수
function validateInput(input) {
   const type = getType(input);

   switch (type) {
      case 'string':
         return input.trim().length > 0 ? '✅ 유효한 문자열' : '❌ 빈 문자열';
      case 'number':
         return isValidNumber(input)
            ? '✅ 유효한 숫자'
            : '❌ 유효하지 않은 숫자';
      case 'array':
         return input.length > 0 ? '✅ 데이터 있음' : '❌ 빈 배열';
      case 'object':
         return Object.keys(input).length > 0 ? '✅ 속성 있음' : '❌ 빈 객체';
      case 'null':
      case 'undefined':
         return '❌ 값이 없음';
      default:
         return `✅ ${type} 타입`;
   }
}

console.log(validateInput('hello')); // ✅ 유효한 문자열
console.log(validateInput('')); // ❌ 빈 문자열
console.log(validateInput(123)); // ✅ 유효한 숫자
console.log(validateInput(NaN)); // ❌ 유효하지 않은 숫자
console.log(validateInput([1, 2])); // ✅ 데이터 있음
console.log(validateInput([])); // ❌ 빈 배열
console.log(validateInput({ a: 1 })); // ✅ 속성 있음
console.log(validateInput({})); // ❌ 빈 객체
console.log(validateInput(null)); // ❌ 값이 없음

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 데이터 타입 핵심 정리 (2026)
 * ==========================================
 *
 * [7가지 Primitive Type]
 * 1. Number - 숫자 (정수, 실수, Infinity, NaN)
 * 2. String - 문자열 (템플릿 리터럴 권장)
 * 3. Boolean - true/false
 * 4. Undefined - 값이 할당 안 됨
 * 5. Null - 의도적으로 빈 값
 * 6. Symbol - 유일무이한 값 (ES6)
 * 7. BigInt - 큰 정수 (ES2020) 🔥
 *
 * [1가지 Object Type]
 * 8. Object - 객체 (Array, Function, Date 등)
 *
 * ==========================================
 * Primitive vs Object
 * ==========================================
 *
 * Primitive (원시):
 * - 불변(Immutable)
 * - 값 자체 저장
 * - 복사 시 독립적
 *
 * Object (객체):
 * - 가변(Mutable)
 * - 참조 저장
 * - 복사 시 같은 객체 참조
 *
 * ==========================================
 * 타입 체크 방법
 * ==========================================
 *
 * typeof
 * - 기본 타입: number, string, boolean, undefined, symbol, bigint
 * - 함수: function
 * - 객체: object
 * - ⚠️ null: object (버그!)
 * - ⚠️ 배열: object
 *
 * instanceof
 * - 객체 타입 체크
 * - [] instanceof Array
 *
 * Array.isArray()
 * - 배열 체크 (권장)
 *
 * ==========================================
 * Falsy 값 (8개) 🔥
 * ==========================================
 *
 * false, 0, -0, 0n, '', null, undefined, NaN
 *
 * Truthy (주의!):
 * - '0', 'false' (문자열)
 * - [], {} (빈 배열/객체)
 * - -1 (0이 아닌 숫자)
 * - ' ' (공백)
 *
 * ==========================================
 * 실무 팁
 * ==========================================
 *
 * ✅ Number
 * - Number.isNaN() 사용 (전역 isNaN 말고)
 * - Number.isFinite() 로 유효성 체크
 * - 큰 정수는 BigInt
 *
 * ✅ String
 * - 템플릿 리터럴 사용
 * - trim(), includes() 활용
 *
 * ✅ Null vs Undefined
 * - undefined: 시스템이 자동 할당
 * - null: 개발자가 명시적으로 할당
 * - ?? 연산자로 둘 다 체크
 *
 * ✅ Symbol
 * - 객체 키 충돌 방지
 * - 상수 정의 (Enum)
 * - 전역: Symbol.for()
 *
 * ✅ 타입 체크
 * - 배열: Array.isArray()
 * - null: === null
 * - undefined: === undefined
 * - 숫자: typeof === 'number' && !isNaN()
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: "null과 undefined의 차이는?"
 * A: undefined는 값이 할당되지 않은 상태,
 *    null은 개발자가 의도적으로 빈 값을 할당한 것입니다.
 *
 * Q2: "typeof null이 'object'인 이유는?"
 * A: JavaScript 초기 구현의 버그입니다.
 *    하위 호환성 때문에 수정하지 못했습니다.
 *
 * Q3: "Primitive vs Object 차이는?"
 * A: Primitive는 불변이고 값 자체가 저장되며,
 *    Object는 가변이고 참조가 저장됩니다.
 *    복사 시 Primitive는 독립적이지만
 *    Object는 같은 객체를 참조합니다.
 *
 * Q4: "Falsy 값 8개는?"
 * A: false, 0, -0, 0n, '', null, undefined, NaN
 *
 * Q5: "배열 체크 방법은?"
 * A: Array.isArray(arr)를 사용합니다.
 *    typeof는 'object'를 반환하므로 부정확합니다.
 *
 * Q6: "Symbol은 언제 쓰나요?"
 * A: 객체 키 충돌 방지, 상수 정의, 메타 프로그래밍에
 *    사용합니다. Symbol('x')로 만든 값은 항상 고유합니다.
 *
 * Q7: "BigInt가 필요한 이유는?"
 * A: Number는 안전한 정수 범위가 제한적입니다.
 *    (±9007199254740991)
 *    그 이상의 큰 정수를 정확히 다루려면
 *    BigInt를 사용해 [ 정밀도 손실 없이 연산해야 합니다. ]
 *
 * **/
