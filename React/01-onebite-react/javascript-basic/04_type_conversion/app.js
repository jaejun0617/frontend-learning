console.log('형 변환');

// 묵시적 형 변환
// 자바스크립트 엔진이 알아서 형 변환 하는것
let num = 10;
let str = '20';
const result = num + str;
console.log(result);

// 명시적 형 변환
// 프로그래머 내장함수 등을 이용해서 직접 형 변환을 명시
let str1 = '10';
let strToNum = Number(str1);

console.log(10 + strToNum);

let str2 = '10개';
let strToNum2 = parseInt(str2);
console.log(strToNum2);

// -> 숫자 -> 문자열
let num1 = 20;
let numToStr = String(num1);
console.log(numToStr);

// 형 변환은 왜 쓰는가 ? 처음부터 잘 지정하면 되면 안되는건가 ? 궁금
