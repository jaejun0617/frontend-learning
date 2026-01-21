/**
 * ==========================================
 * JavaScript 반복문 완벽 가이드 (Basic to Advanced)
 * ==========================================
 *
 * [목차]
 * 1. 기본 반복문 (for, while, do...while)
 * 2. 중첩 반복문과 Label (제어권 강화)
 * 3. 배열/객체 순회 모던 패턴 (for...of, Object.entries)
 * 4. 반복문 제어 (break, continue)
 * 5. 🚀 실무 심화: 비동기 반복 (for await...of)
 * 6. 🚀 실무 심화: 반복문 vs 고차함수 (map, reduce)
 */

// ==========================================
// 1. 기본 반복문 (Basic Loops)
// ==========================================
console.log('\n========= 1. 기본 반복문 =========');

// [1-1] for 문: 횟수가 정해져 있을 때 (가장 빠름)
console.log('--- for ---');
for (let i = 1; i <= 3; i++) {
   console.log(`Count: ${i}`);
}

// [1-2] while 문: 조건이 중요할 때
console.log('--- while ---');
let count = 0;
while (count < 3) {
   count++;
   console.log(`While: ${count}`);
}

// [1-3] do...while 문: "무조건 한 번은 실행"해야 할 때
console.log('--- do...while ---');
let isRunning = false;
do {
   console.log('이 코드는 조건이 false여도 1번은 실행됩니다.');
} while (isRunning);

// ==========================================
// 2. 중첩 반복문과 Label (Advanced Control)
// ==========================================
console.log('\n========= 2. 중첩 반복문 & Label =========');

// 구구단 예제
for (let i = 2; i <= 3; i++) {
   for (let j = 1; j <= 3; j++) {
      // console.log(`${i} x ${j} = ${i * j}`);
   }
}

/**
 * 🚀 실무 팁: Label 문
 * 중첩 반복문에서 내부 루프뿐만 아니라 외부 루프까지 한 번에 탈출하고 싶을 때 사용
 */
console.log('--- Label을 이용한 이중 루프 탈출 ---');

outerLoop: for (let i = 0; i < 3; i++) {
   for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
         console.log(`(1, 1)에서 전체 루프 종료!`);
         break outerLoop; // innerLoop가 아닌 outerLoop를 깨고 나감
      }
      console.log(`Coords: ${i}, ${j}`);
   }
}

// ==========================================
// 3. 모던 순회 패턴 (Modern Iteration) ⭐⭐⭐
// ==========================================
console.log('\n========= 3. 모던 순회 패턴 (Array & Object) =========');

const iveMembers = ['안유진', '장원영', '가을', '리즈', '이서'];
const iveLeader = {
   name: '안유진',
   age: 21,
   position: 'Leader',
};

/**
 * [3-1] for...of (배열, 문자열, Map, Set)
 * - 가독성 최고, break/continue 사용 가능
 */
console.log('--- for...of (Array) ---');
for (const member of iveMembers) {
   console.log(`Member: ${member}`);
}

/**
 * [3-2] Object 순회 (for...in vs Object.entries)
 * - ⚠️ for...in은 프로토타입 체인까지 탐색하므로 느리고 의도치 않은 키가 나올 수 있음.
 * - 🚀 실무 추천: Object.keys() / Object.values() / Object.entries() + for...of 조합
 */
console.log('--- Object.entries + for...of (Best Practice) ---');

// 객체를 [key, value] 형태의 2차원 배열로 변환하여 순회
for (const [key, value] of Object.entries(iveLeader)) {
   console.log(`${key} : ${value}`);
}

// ==========================================
// 4. 반복 제어 (Break / Continue)
// ==========================================
console.log('\n========= 4. Break & Continue =========');

console.log('--- Continue (장원영 건너뛰기) ---');
for (const member of iveMembers) {
   if (member === '장원영') continue; // 현재 루프 스킵
   console.log(member);
}

console.log('--- Break (가을 만나면 종료) ---');
for (const member of iveMembers) {
   if (member === '가을') {
      console.log('가을 발견! 반복 종료.');
      break; // 루프 전체 종료
   }
   console.log(member);
}

// ==========================================
// 5. 🚀 실무 심화: 비동기 반복 (Async Iteration)
// ==========================================
console.log('\n========= 5. 비동기 반복 (for await...of) =========');

/**
 * API 호출 등 비동기 작업을 순차적으로 처리해야 할 때 사용
 * (2024년 이후 실무 필수 패턴)
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function asyncLoopTest() {
   const nums = [1, 2, 3];

   console.log('비동기 반복 시작...');

   // 일반 for문 안에서 await를 쓰거나, for await...of 사용
   for await (const num of nums) {
      await sleep(500); // 0.5초 대기
      console.log(`Async process: ${num}`);
   }

   console.log('비동기 반복 종료!');
}

// 비동기 함수 실행 (결과 확인을 위해 마지막에 실행됨)
asyncLoopTest();

// ==========================================
// 6. 🚀 실무 심화: 반복문 vs 고차함수
// ==========================================
console.log('\n========= 6. Loop vs Array Methods =========');

/**
 * 단순히 데이터를 순회하는 것을 넘어 '변환'하거나 '찾을 때'는
 * 명시적 반복문보다 배열 메서드를 선호합니다. (함수형 프로그래밍)
 */

const prices = [1000, 2000, 3000, 4000];

// ❌ [Bad] for문으로 배열 변환하기
const doubledFor = [];
for (let price of prices) {
   doubledFor.push(price * 2);
}

// ✅ [Good] map 사용 (원본 불변, 새로운 배열 반환)
const doubledMap = prices.map((price) => price * 2);
console.log('Map 결과:', doubledMap);

// ✅ [Good] filter 사용 (조건 필터링)
const expensive = prices.filter((price) => price > 2500);
console.log('Filter 결과:', expensive);

// ✅ [Good] reduce 사용 (누적값 계산)
const totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
console.log('Reduce 합계:', totalPrice);

/**
 * ⭐⭐⭐ 결론 요약 (Decision Tree)
 *
 * 1. 단순 반복, break/continue 필요? 👉 for...of
 * 2. 인덱스(i)가 꼭 필요? 👉 for (let i=0...) 또는 array.forEach((v, i) => ...)
 * 3. 배열을 '변환'해서 새 배열 생성? 👉 .map()
 * 4. 배열에서 특정 조건만 뽑기? 👉 .filter()
 * 5. 객체를 순회? 👉 Object.entries() + for...of
 * 6. 비동기 작업을 순서대로? 👉 for await...of
 */
