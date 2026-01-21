/**
 * ==========================================
 * Hoisting (호이스팅)
 * ==========================================
 *
 * JavaScript에서 가장 중요하고 헷갈리는 개념 중 하나!
 * 면접에서도 자주 나오는 질문
 */

// ==========================================
// 1. 호이스팅이란?
// ==========================================
/**
 * [정의]
 * 변수/함수 선언이 스코프의 최상단으로 끌어올려지는 것처럼 동작하는 현상
 *
 * [중요!]
 * - 실제로 코드가 이동하는 것이 아님
 * - JavaScript 엔진이 코드를 실행하기 전에
 *   변수/함수 선언을 먼저 메모리에 등록하기 때문
 */

console.log('='.repeat(40));

// ==========================================
// 2. var의 호이스팅
// ==========================================
/**
 * var는 호이스팅 시:
 * 1) 선언이 최상단으로 올라감
 * 2) undefined로 초기화됨
 * 3) 따라서 에러가 발생하지 않음 (문제!)
 */

console.log(name); // undefined (에러 아님!)
var name = '코드팩토리';
console.log(name); // 코드팩토리

// 위 코드는 JavaScript 엔진이 아래처럼 해석함
// var name;              // 1. 선언이 최상단으로
// console.log(name);     // 2. undefined 출력
// name = '코드팩토리';   // 3. 할당은 원래 위치에서
// console.log(name);     // 4. 코드팩토리 출력

console.log('='.repeat(40));

// ==========================================
// 3. let/const의 호이스팅 (핵심!)
// ==========================================
/**
 * 🔥 중요: let/const도 호이스팅된다!
 *
 * 하지만 var와 다른 점:
 * 1) 선언은 호이스팅되지만
 * 2) 초기화는 되지 않음
 * 3) TDZ(Temporal Dead Zone)에 빠짐
 * 4) 따라서 ReferenceError 발생
 */

// ❌ let의 호이스팅
// console.log(yuJin); // ReferenceError: Cannot access 'yuJin' before initialization
// let yuJin = '안유진';

// ❌ const의 호이스팅
// console.log(wonyoung); // ReferenceError: Cannot access 'wonyoung' before initialization
// const wonyoung = '장원영';

console.log('='.repeat(40));

// ==========================================
// 4. TDZ (Temporal Dead Zone) - 매우 중요!
// ==========================================
/**
 * [TDZ란?]
 * 변수가 선언되었지만 초기화되지 않아서
 * 접근할 수 없는 구간
 *
 * [TDZ의 시작과 끝]
 * 시작: 스코프의 시작 지점
 * 끝: 변수가 초기화되는 지점
 */

// TDZ 시작
console.log('스코프 시작');

// console.log(idol); // ❌ ReferenceError - TDZ 구간!
// TDZ 구간
// TDZ 구간
// TDZ 구간

let idol = '아이브'; // TDZ 끝 (초기화 완료)
console.log(idol); // ✅ 정상 동작

console.log('='.repeat(40));

// ==========================================
// 5. var vs let/const 호이스팅 비교
// ==========================================

// var의 경우
console.log('--- var 호이스팅 ---');
console.log(varVariable); // undefined (에러 없음)
var varVariable = 'var 변수';
console.log(varVariable); // var 변수

// let의 경우
console.log('--- let 호이스팅 ---');
// console.log(letVariable); // ❌ ReferenceError
let letVariable = 'let 변수';
console.log(letVariable); // let 변수

// const의 경우
console.log('--- const 호이스팅 ---');
// console.log(constVariable); // ❌ ReferenceError
const constVariable = 'const 변수';
console.log(constVariable); // const 변수

console.log('='.repeat(40));

// ==========================================
// 6. 함수 호이스팅
// ==========================================

// ✅ 함수 선언문 - 전체가 호이스팅됨
sayHello(); // ✅ 정상 동작! "안녕하세요"

function sayHello() {
   console.log('안녕하세요');
}

sayHello(); // ✅ 정상 동작! "안녕하세요"

// ❌ 함수 표현식 (let/const) - 변수 호이스팅 규칙 적용
// sayGoodbye(); // ❌ ReferenceError

const sayGoodbye = function () {
   console.log('안녕히가세요');
};

sayGoodbye(); // ✅ 정상 동작!

// ❌ 화살표 함수 - 함수 표현식과 동일
// greet(); // ❌ ReferenceError

const greet = () => {
   console.log('인사');
};

greet(); // ✅ 정상 동작!

console.log('='.repeat(40));

// ==========================================
// 7. 스코프와 호이스팅
// ==========================================

// var는 함수 스코프
function testVar() {
   console.log(x); // undefined
   if (true) {
      var x = 10;
   }
   console.log(x); // 10 (함수 스코프라 if 밖에서도 접근 가능)
}
testVar();

// let/const는 블록 스코프
function testLet() {
   // console.log(y); // ❌ ReferenceError
   if (true) {
      let y = 10;
      console.log(y); // 10
   }
   // console.log(y); // ❌ ReferenceError (블록 밖에서 접근 불가)
}
testLet();

console.log('='.repeat(40));

// ==========================================
// 8. 실전 예제 - 면접 단골 질문
// ==========================================

// 예제 1: 이 코드의 출력은?
console.log('--- 예제 1 ---');
console.log(a); // undefined
var a = 1;
console.log(a); // 1

// 예제 2: 이 코드의 출력은?
console.log('--- 예제 2 ---');
// console.log(b); // ReferenceError
// let b = 2;

// 예제 3: 이 코드의 출력은?
console.log('--- 예제 3 ---');
foo(); // "foo 함수"

function foo() {
   console.log('foo 함수');
}

// 예제 4: 이 코드의 출력은?
console.log('--- 예제 4 ---');
// bar(); // TypeError: bar is not a function
var bar = function () {
   console.log('bar 함수');
};
bar(); // "bar 함수"

console.log('='.repeat(40));

// ==========================================
// 9. 왜 let/const도 호이스팅될까?
// ==========================================
/**
 * [증명 예제]
 * 만약 let이 호이스팅되지 않는다면,
 * 아래 코드에서 외부 name을 참조해야 함
 *
 * 하지만 ReferenceError가 발생함
 * = let이 호이스팅되어 내부 스코프에 존재하지만
 *   TDZ에 걸려있다는 증거!
 */

let name = '외부 변수';

function test() {
   // console.log(name); // ❌ ReferenceError
   // 만약 호이스팅이 안 됐다면 '외부 변수'가 출력되어야 함
   // 하지만 에러 발생 = 호이스팅된 내부 name이 TDZ에 있음

   let name = '내부 변수';
   console.log(name); // 내부 변수
}

test();
console.log(name); // 외부 변수

console.log('='.repeat(40));

// ==========================================
// 10. 핵심 정리
// ==========================================
/**
 * ✅ var의 호이스팅:
 * - 선언 + undefined 초기화
 * - 선언 전 접근 가능 (undefined 반환)
 * - 버그 유발 가능성 높음
 *
 * ✅ let/const의 호이스팅:
 * - 선언만 호이스팅 (초기화 X)
 * - TDZ에 빠짐
 * - 선언 전 접근 시 ReferenceError
 * - 더 안전한 코드 작성 가능
 *
 * ✅ 함수 선언문:
 * - 전체가 호이스팅
 * - 선언 전 호출 가능
 *
 * ✅ 함수 표현식/화살표 함수:
 * - 변수 호이스팅 규칙 적용
 * - let/const 사용 시 TDZ 적용
 *
 * 🔥 면접 포인트:
 * "let/const도 호이스팅됩니다. 하지만 TDZ(Temporal Dead Zone) 때문에
 *  초기화 전에 접근하면 ReferenceError가 발생합니다."
 */

// ==========================================
// 11. 베스트 프랙티스
// ==========================================
/**
 * ✅ 권장사항:
 * 1. var 사용 금지
 * 2. 변수는 사용 전에 선언
 * 3. 변수 선언은 스코프 최상단에
 * 4. const를 기본으로, 필요시 let 사용
 * 5. 함수 선언문보다 함수 표현식 권장 (명확성)
 */

// ✅ 좋은 예
const userName = '안유진';
const userAge = 21;

function processUser() {
   console.log(userName, userAge);
}

processUser();

// ❌ 나쁜 예
// processUser2(); // 선언 전 호출
// var userName2 = '장원영'; // var 사용

console.log('='.repeat(40));
console.log('호이스팅 완벽 정리 끝!');
