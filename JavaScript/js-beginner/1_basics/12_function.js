/**
 * ==========================================
 * JavaScript 함수 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * 함수는 모든 프로그래밍 언어에서 가장 중요한 개념!
 * JavaScript에서 함수는 "일급 객체(First-class Object)"
 */

// ==========================================
// 1. 함수를 사용하는 이유 - DRY 원칙
// ==========================================
console.log("--- DRY 원칙 (Don't Repeat Yourself) ---");

// ❌ 나쁜 예: 코드 반복
console.log((((2 * 10) / 2) % 3).toString());
console.log((((3 * 10) / 2) % 3).toString());
console.log((((4 * 10) / 2) % 3).toString());
console.log((((5 * 10) / 2) % 3).toString());

// ✅ 좋은 예: 함수로 재사용
function calculate(number) {
   return (((number * 10) / 2) % 3).toString();
}

console.log(calculate(2));
console.log(calculate(3));
console.log(calculate(4));
console.log(calculate(5));

// 🔥 실무 패턴: 유틸리티 함수
function formatPrice(price) {
   return `₩${price.toLocaleString('ko-KR')}`;
}

console.log(formatPrice(50000)); // ₩50,000
console.log(formatPrice(1000000)); // ₩1,000,000

console.log('='.repeat(40));

// ==========================================
// 2. 함수 선언 방법 (3가지)
// ==========================================
console.log('--- 함수 선언 방법 ---');

// 2-1. 함수 선언문 (Function Declaration)
function multiply1(x, y) {
   return x * y;
}
console.log(multiply1(2, 3)); // 6

// 2-2. 함수 표현식 (Function Expression)
const multiply2 = function (x, y) {
   return x * y;
};
console.log(multiply2(2, 3)); // 6

// 2-3. 화살표 함수 (Arrow Function) ✅ 2026년 표준
const multiply5 = (x, y) => {
   return x * y;
};
console.log(multiply5(2, 3)); // 6

console.log('='.repeat(40));

// ==========================================
// 3. 함수 선언문 vs 함수 표현식
// ==========================================
console.log('--- 함수 선언문 vs 표현식 ---');

// 함수 선언문 - 호이스팅됨 (선언 전 호출 가능)
console.log(add(2, 3)); // 5 ✅ 작동함

function add(a, b) {
   return a + b;
}

// 함수 표현식 - 호이스팅 안됨 (선언 전 호출 불가)
// console.log(subtract(5, 3)); // ❌ ReferenceError

const subtract = function (a, b) {
   return a - b;
};

console.log(subtract(5, 3)); // 2 ✅ 선언 후 호출

// 🔥 실무 권장: 함수 표현식 사용 (예측 가능한 코드)
const divide = function (a, b) {
   if (b === 0) {
      throw new Error('0으로 나눌 수 없습니다');
   }
   return a / b;
};

console.log('='.repeat(40));

// ==========================================
// 4. 화살표 함수 (Arrow Function) 🔥 매우 중요!
// ==========================================
console.log('--- 화살표 함수 ---');

// 기본 형태
const arrowFunc1 = (x, y) => {
   return x + y;
};

// 간결한 형태 (한 줄일 때 중괄호와 return 생략)
const arrowFunc2 = (x, y) => x + y;
console.log(arrowFunc2(2, 3)); // 5

// 매개변수가 하나일 때 괄호 생략 가능
const double = (x) => x * 2;
console.log(double(5)); // 10

// 매개변수가 없을 때
const sayHello = () => 'Hello!';
console.log(sayHello()); // Hello!

// 객체 반환 시 괄호로 감싸기
const createUser = (name, age) => ({ name, age });
console.log(createUser('안유진', 21)); // { name: '안유진', age: 21 }

// 🔥 실무 패턴 1: 배열 메서드와 함께 사용
const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// 🔥 실무 패턴 2: 콜백 함수
setTimeout(() => {
   console.log('1초 후 실행');
}, 1000);

// 🔥 실무 패턴 3: 이벤트 핸들러
const button = { addEventListener: (event, handler) => handler() };
button.addEventListener('click', () => {
   console.log('버튼 클릭됨');
});

console.log('='.repeat(40));

// ==========================================
// 5. 파라미터 (Parameter) vs 아규먼트 (Argument)
// ==========================================
console.log('--- 파라미터 vs 아규먼트 ---');

/**
 * Parameter (매개변수): 함수 정의에서 받는 변수
 * Argument (인수): 함수 호출 시 전달하는 실제 값
 */

// x, y는 파라미터
function greet(name, age) {
   // name, age = 파라미터
   console.log(`안녕하세요, ${name}님! 나이: ${age}`);
}

// '안유진', 21은 아규먼트
greet('안유진', 21); // '안유진', 21 = 아규먼트

console.log('='.repeat(40));

// ==========================================
// 6. 기본 매개변수 (Default Parameters)
// ==========================================
console.log('--- 기본 매개변수 ---');

// ES6 이전 방식
function oldGreet(name) {
   name = name || '게스트';
   console.log(`안녕하세요, ${name}님`);
}

// ES6 이후 (권장)
function newGreet(name = '게스트') {
   console.log(`안녕하세요, ${name}님`);
}

newGreet('안유진'); // 안녕하세요, 안유진님
newGreet(); // 안녕하세요, 게스트님

// 🔥 실무 패턴: 복잡한 기본값
function fetchData(url, options = {}) {
   const config = {
      method: options.method || 'GET',
      timeout: options.timeout ?? 5000, // null/undefined만 체크
      headers: options.headers || {},
   };
   console.log('요청 설정:', config);
}

fetchData('/api/users');
fetchData('/api/users', { method: 'POST', timeout: 0 });

console.log('='.repeat(40));

// ==========================================
// 7. Rest 파라미터 (...) 🔥 중요!
// ==========================================
console.log('--- Rest 파라미터 ---');

// 가변 인자 함수 (개수 제한 없음)
function sum(...numbers) {
   console.log('numbers:', numbers); // 배열로 받음
   return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0

// 일부 파라미터 + Rest
function introduce(name, age, ...hobbies) {
   console.log(`이름: ${name}, 나이: ${age}`);
   console.log('취미:', hobbies.join(', '));
}

introduce('안유진', 21, '춤', '노래', '연기');

// 🔥 실무 패턴: 배열 병합
function mergeArrays(...arrays) {
   return arrays.flat();
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]

console.log('='.repeat(40));

// ==========================================
// 8. arguments 객체 (구식, 참고용)
// ==========================================
console.log('--- arguments 객체 ---');

/**
 * arguments: 모든 인자를 담는 유사 배열 객체
 * ⚠️ 화살표 함수에서는 사용 불가
 * 💡 Rest 파라미터(...) 사용 권장
 */

function oldSum() {
   console.log('arguments:', arguments); // 유사 배열
   console.log('arguments는 배열인가?', Array.isArray(arguments)); // false

   // 배열 메서드 사용하려면 변환 필요
   const arr = Array.from(arguments);
   return arr.reduce((a, b) => a + b, 0);
}

console.log(oldSum(1, 2, 3, 4)); // 10

// ✅ 현대적 방식 (Rest 파라미터)
function modernSum(...numbers) {
   console.log('numbers는 배열인가?', Array.isArray(numbers)); // true
   return numbers.reduce((a, b) => a + b, 0);
}

console.log(modernSum(1, 2, 3, 4)); // 10

console.log('='.repeat(40));

// ==========================================
// 9. 반환값 (Return)
// ==========================================
console.log('--- 반환값 ---');

// return이 없으면 undefined 반환
function noReturn() {
   console.log('실행됨');
}
console.log(noReturn()); // undefined

// 명시적 return
function withReturn() {
   return '반환값';
}
console.log(withReturn()); // 반환값

// 조기 return (Early Return) - 실무 패턴
function validateUser(user) {
   if (!user) {
      return { error: '사용자 정보 없음' };
   }
   if (!user.name) {
      return { error: '이름 필수' };
   }
   if (!user.age) {
      return { error: '나이 필수' };
   }
   return { success: true };
}

console.log(validateUser(null)); // { error: '사용자 정보 없음' }
console.log(validateUser({ name: '안유진' })); // { error: '나이 필수' }
console.log(validateUser({ name: '안유진', age: 21 })); // { success: true }

// 🔥 실무 패턴: 다중 반환값 (객체 구조 분해)
function getMinMax(numbers) {
   return {
      min: Math.min(...numbers),
      max: Math.max(...numbers),
   };
}

const { min, max } = getMinMax([1, 2, 3, 4, 5]);
console.log('최소:', min, '최대:', max); // 최소: 1 최대: 5

console.log('='.repeat(40));

// ==========================================
// 10. 고차 함수 (Higher-Order Function) 🔥 매우 중요!
// ==========================================
console.log('--- 고차 함수 ---');

/**
 * 고차 함수: 함수를 인자로 받거나 함수를 반환하는 함수
 * JavaScript의 핵심 개념!
 */

// 10-1. 함수를 인자로 받기
function operate(a, b, operation) {
   return operation(a, b);
}

const addOp = (x, y) => x + y;
const multiplyOp = (x, y) => x * y;

console.log(operate(5, 3, addOp)); // 8
console.log(operate(5, 3, multiplyOp)); // 15

// 🔥 실무 패턴: 배열 메서드들이 모두 고차 함수
[1, 2, 3].map((n) => n * 2); // map이 고차 함수
[1, 2, 3].filter((n) => n > 1); // filter가 고차 함수
[1, 2, 3].reduce((a, b) => a + b); // reduce가 고차 함수

// 10-2. 함수를 반환하기
function createMultiplier(multiplier) {
   return function (number) {
      return number * multiplier;
   };
}

const double3 = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double3(5)); // 10
console.log(triple(5)); // 15

// 화살표 함수 버전
const createAdder = (x) => (y) => x + y;
const add5 = createAdder(5);
console.log(add5(3)); // 8

console.log('='.repeat(40));

// ==========================================
// 11. 커링 (Currying) 🔥 고급 패턴
// ==========================================
console.log('--- 커링 ---');

/**
 * 커링: 여러 인자를 받는 함수를 단일 인자를 받는 함수들의 체인으로 변환
 */

// 일반 함수
function multiply(x, y, z) {
   return x * y * z;
}
console.log(multiply(2, 3, 4)); // 24

// 커링된 함수
const curriedMultiply = (x) => (y) => (z) => x * y * z;
console.log(curriedMultiply(2)(3)(4)); // 24

// 부분 적용 (Partial Application)
const multiplyBy2 = curriedMultiply(2);
const multiplyBy2And3 = multiplyBy2(3);
console.log(multiplyBy2And3(4)); // 24

// 🔥 실무 패턴: 설정 함수
const createApiCall = (baseUrl) => (endpoint) => (options) => {
   const url = `${baseUrl}${endpoint}`;
   console.log(`API 호출: ${url}`, options);
   return { url, ...options };
};

const apiCall = createApiCall('https://api.example.com');
const usersApi = apiCall('/users');

usersApi({ method: 'GET' });
usersApi({ method: 'POST', body: { name: '안유진' } });

// 🔥 실무 패턴: 이벤트 핸들러 생성
const createLogger = (prefix) => (message) => {
   console.log(`[${prefix}] ${message}`);
};

const errorLog = createLogger('ERROR');
const infoLog = createLogger('INFO');

errorLog('파일을 찾을 수 없습니다'); // [ERROR] 파일을 찾을 수 없습니다
infoLog('서버 시작됨'); // [INFO] 서버 시작됨

console.log('='.repeat(40));

// ==========================================
// 12. IIFE (즉시 실행 함수)
// ==========================================
console.log('--- IIFE ---');

/**
 * IIFE (Immediately Invoked Function Expression)
 * 정의와 동시에 실행되는 함수
 */

// 기본 형태
(function () {
   console.log('IIFE 실행됨');
})();

// 인자 전달
(function (name) {
   console.log(`안녕하세요, ${name}님`);
})('안유진');

// 반환값 받기
const result = (function (x, y) {
   return x * y;
})(4, 5);
console.log('IIFE 결과:', result); // 20

// 화살표 함수 IIFE
((x, y) => {
   console.log('화살표 IIFE:', x + y);
})(10, 20);

// 🔥 실무 패턴: 모듈 패턴 (과거 방식, 참고용)
const calculator = (function () {
   // private 변수
   let result = 0;

   // public 메서드
   return {
      add: function (x) {
         result += x;
         return this;
      },
      subtract: function (x) {
         result -= x;
         return this;
      },
      getResult: function () {
         return result;
      },
   };
})();

console.log(calculator.add(5).add(3).subtract(2).getResult()); // 6

console.log('='.repeat(40));

// ==========================================
// 13. 콜백 함수 (Callback Function) 🔥 중요!
// ==========================================
console.log('--- 콜백 함수 ---');

/**
 * 콜백 함수: 다른 함수의 인자로 전달되는 함수
 * 비동기 처리의 핵심
 */

// 동기 콜백
function processArray(arr, callback) {
   const result = [];
   for (let i = 0; i < arr.length; i++) {
      result.push(callback(arr[i], i));
   }
   return result;
}

const nums = [1, 2, 3, 4, 5];
const squared = processArray(nums, (num) => num ** 2);
console.log('제곱:', squared); // [1, 4, 9, 16, 25]

// 🔥 실무 패턴: 비동기 콜백 (Node.js 스타일)
function fetchUser(userId, callback) {
   setTimeout(() => {
      const user = { id: userId, name: '안유진' };
      callback(null, user); // (에러, 데이터)
   }, 1000);
}

fetchUser(1, (error, user) => {
   if (error) {
      console.error('에러:', error);
      return;
   }
   console.log('사용자:', user);
});

// ⚠️ 콜백 지옥 (Callback Hell) - 피해야 할 패턴
function step1(callback) {
   setTimeout(() => callback(null, 'Step 1'), 100);
}
function step2(callback) {
   setTimeout(() => callback(null, 'Step 2'), 100);
}
function step3(callback) {
   setTimeout(() => callback(null, 'Step 3'), 100);
}

// ❌ 콜백 지옥
step1((err, result1) => {
   console.log(result1);
   step2((err, result2) => {
      console.log(result2);
      step3((err, result3) => {
         console.log(result3);
      });
   });
});

// ✅ Promise/async-await로 해결 (나중에 배움)

console.log('='.repeat(40));

// ==========================================
// 14. 함수는 객체다! (First-class Object)
// ==========================================
console.log('--- 함수는 일급 객체 ---');

/**
 * JavaScript에서 함수는 일급 객체 (First-class Object)
 * 1. 변수에 할당 가능
 * 2. 함수의 인자로 전달 가능
 * 3. 함수의 반환값으로 사용 가능
 * 4. 객체처럼 프로퍼티 추가 가능
 */

// 1. 변수에 할당
const myFunc = function () {
   return 'Hello';
};

// 2. 배열에 저장
const funcArray = [
   function () {
      return 1;
   },
   function () {
      return 2;
   },
];
console.log(funcArray[0]()); // 1

// 3. 객체의 프로퍼티로 저장
const obj = {
   method: function () {
      return 'method';
   },
   arrow: () => 'arrow',
};
console.log(obj.method()); // method

// 4. 함수에 프로퍼티 추가 (신기한 기능!)
function specialFunc() {
   return 'special';
}
specialFunc.customProperty = '함수에 프로퍼티!';
specialFunc.counter = 0;

console.log(specialFunc.customProperty); // 함수에 프로퍼티!
console.log(typeof specialFunc); // function
console.log(specialFunc instanceof Object); // true

console.log('='.repeat(40));

// ==========================================
// 15. instanceof 연산자
// ==========================================
console.log('--- instanceof 연산자 ---');

/**
 * instanceof: 객체가 특정 클래스/생성자의 인스턴스인지 확인
 */

// 함수는 Function의 인스턴스
function testFunc() {}
console.log(testFunc instanceof Function); // true
console.log(testFunc instanceof Object); // true

// 배열 체크
const arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

// 객체 체크
const obj2 = {};
console.log(obj2 instanceof Object); // true

// 날짜 체크
const date = new Date();
console.log(date instanceof Date); // true

// 🔥 실무 패턴: 타입 체크
function processData(data) {
   if (data instanceof Array) {
      console.log('배열입니다:', data.length);
   } else if (data instanceof Object) {
      console.log('객체입니다:', Object.keys(data));
   } else {
      console.log('기타 타입:', typeof data);
   }
}

processData([1, 2, 3]);
processData({ name: '안유진' });
processData('문자열');

console.log('='.repeat(40));

// ==========================================
// 16. 클로저 (Closure) 🔥 매우 중요!
// ==========================================
console.log('--- 클로저 ---');

/**
 * 클로저: 함수와 그 함수가 선언된 렉시컬 환경의 조합
 * 내부 함수가 외부 함수의 변수에 접근할 수 있는 것
 */

// 기본 클로저
function outer() {
   const outerVar = '외부 변수';

   function inner() {
      console.log(outerVar); // 외부 함수의 변수 접근
   }

   return inner;
}

const innerFunc = outer();
innerFunc(); // 외부 변수

// 🔥 실무 패턴 1: Private 변수 구현
function createCounter() {
   let count = 0; // private 변수

   return {
      increment: function () {
         count++;
         return count;
      },
      decrement: function () {
         count--;
         return count;
      },
      getCount: function () {
         return count;
      },
   };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
// console.log(counter.count); // undefined (접근 불가)

// 🔥 실무 패턴 2: 함수 팩토리
function createGreeting(greeting) {
   return function (name) {
      return `${greeting}, ${name}!`;
   };
}

const sayHi = createGreeting('안녕하세요');
const sayHello2 = createGreeting('Hello');

console.log(sayHi('안유진')); // 안녕하세요, 안유진!
console.log(sayHello2('Yujin')); // Hello, Yujin!

// 🔥 실무 패턴 3: 이벤트 핸들러에서 데이터 보존
function setupButtons() {
   const buttons = ['버튼1', '버튼2', '버튼3'];

   buttons.forEach((buttonName) => {
      // 각 버튼마다 고유한 클로저 생성
      const handler = function () {
         console.log(`${buttonName} 클릭됨`);
      };

      // handler는 buttonName을 기억함
      setTimeout(handler, 100);
   });
}

setupButtons();

console.log('='.repeat(40));

// ==========================================
// 17. 재귀 함수 (Recursive Function)
// ==========================================
console.log('--- 재귀 함수 ---');

/**
 * 재귀 함수: 자기 자신을 호출하는 함수
 * 종료 조건이 반드시 필요!
 */

// 팩토리얼 계산
function factorial(n) {
   if (n <= 1) return 1; // 종료 조건
   return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)

// 🔥 실무 패턴: 중첩 배열 평탄화
function flattenArray(arr) {
   const result = [];
   for (const item of arr) {
      if (Array.isArray(item)) {
         result.push(...flattenArray(item)); // 재귀 호출
      } else {
         result.push(item);
      }
   }
   return result;
}

const nested = [1, [2, [3, [4, 5]]]];
console.log(flattenArray(nested)); // [1, 2, 3, 4, 5]

// 🔥 실무 패턴: DOM 트리 순회
function traverseDOM(node, callback) {
   callback(node);
   if (node.children) {
      for (const child of node.children) {
         traverseDOM(child, callback); // 재귀 호출
      }
   }
}

console.log('='.repeat(40));

// ==========================================
// 18. 실무 종합 예제
// ==========================================
console.log('--- 실무 종합 예제 ---');

// 예제 1: 배열 유틸리티 함수 모음
const arrayUtils = {
   // 중복 제거
   unique: (arr) => [...new Set(arr)],

   // 청크로 나누기
   chunk: (arr, size) => {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
         chunks.push(arr.slice(i, i + size));
      }
      return chunks;
   },

   // 랜덤 요소 선택
   random: (arr) => arr[Math.floor(Math.random() * arr.length)],

   // 정렬 (불변)
   sortBy: (arr, key) => [...arr].sort((a, b) => a[key] - b[key]),
};

console.log(arrayUtils.unique([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]
console.log(arrayUtils.chunk([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]

// 예제 2: 함수 합성 (Composition)
const compose =
   (...fns) =>
   (x) =>
      fns.reduceRight((acc, fn) => fn(acc), x);

const add10 = (x) => x + 10;
const multiply3 = (x) => x * 2;
const subtract5 = (x) => x - 5;

const composedFunc = compose(subtract5, multiply3, add10);
console.log(composedFunc(5)); // ((5 + 10) * 2) - 5 = 25

// 예제 3: 디바운스 (Debounce) - 실무 필수!
function debounce(func, delay) {
   let timeoutId;
   return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
   };
}

const searchInput = debounce((query) => {
   console.log('검색:', query);
}, 500);

// 연속 호출해도 마지막 것만 실행됨
searchInput('a');
searchInput('ab');
searchInput('abc'); // 500ms 후 '검색: abc'만 실행

// 예제 4: 메모이제이션 (Memoization) - 성능 최적화
function memoize(fn) {
   const cache = {};
   return function (...args) {
      const key = JSON.stringify(args);
      if (key in cache) {
         console.log('캐시에서 반환:', key);
         return cache[key];
      }
      console.log('계산 중:', key);
      const result = fn(...args);
      cache[key] = result;
      return result;
   };
}

// 피보나치 수열 (메모이제이션 적용)
const fibonacci = memoize(function (n) {
   if (n <= 1) return n;
   return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 계산 중
console.log(fibonacci(10)); // 캐시에서 반환 (즉시!)

// 예제 5: 쓰로틀 (Throttle) - 실무 필수!
function throttle(func, limit) {
   let inThrottle;
   return function (...args) {
      if (!inThrottle) {
         func(...args);
         inThrottle = true;
         setTimeout(() => (inThrottle = false), limit);
      }
   };
}

const handleScroll = throttle(() => {
   console.log('스크롤 이벤트');
}, 1000); // 1초에 한 번만 실행

// 예제 6: 파이프 (Pipe) - 함수 체이닝
const pipe =
   (...fns) =>
   (x) =>
      fns.reduce((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double2 = (x) => x * 2;
const square = (x) => x ** 2;

const transform = pipe(addOne, double2, square);
console.log(transform(3)); // ((3 + 1) * 2) ** 2 = 64

console.log('='.repeat(40));

// ==========================================
// 19. this 바인딩 (화살표 함수 vs 일반 함수)
// ==========================================
console.log('--- this 바인딩 ---');

/**
 * 일반 함수: this는 호출 방식에 따라 결정
 * 화살표 함수: this는 선언 위치에서 결정 (렉시컬)
 */

const user = {
   name: '안유진',

   // 일반 함수
   regularFunc: function () {
      console.log('일반 함수 this:', this.name);
   },

   // 화살표 함수
   arrowFunc: () => {
      console.log('화살표 함수 this:', this.name); // undefined
   },

   // 실무 패턴: 메서드 안에서 화살표 함수
   getData: function () {
      setTimeout(() => {
         console.log('setTimeout this:', this.name); // 안유진
      }, 100);
   },
};

user.regularFunc(); // 안유진
user.arrowFunc(); // undefined
user.getData(); // 안유진

console.log('='.repeat(40));

// ==========================================
// 20. 함수 선언 방식 비교 정리
// ==========================================
console.log('--- 함수 선언 방식 비교 ---');

/**
 * 1. 함수 선언문 (Function Declaration)
 *    - 호이스팅 O
 *    - this 바인딩 동적
 *    - arguments 사용 가능
 */
function declarationFunc(x, y) {
   return x + y;
}

/**
 * 2. 함수 표현식 (Function Expression)
 *    - 호이스팅 X
 *    - this 바인딩 동적
 *    - arguments 사용 가능
 *    - ✅ 실무 권장
 */
const expressionFunc = function (x, y) {
   return x + y;
};

/**
 * 3. 화살표 함수 (Arrow Function)
 *    - 호이스팅 X
 *    - this 바인딩 렉시컬 (상위 스코프)
 *    - arguments 사용 불가
 *    - ✅ 2026년 표준, 가장 많이 사용
 */
const arrowFunc = (x, y) => x + y;

/**
 * 4. 메서드 축약 (Method Shorthand) - 객체 메서드
 *    - ES6 이후 권장
 */
const obj3 = {
   // 기존 방식
   oldMethod: function () {
      return 'old';
   },

   // 축약 문법 (권장)
   newMethod() {
      return 'new';
   },
};

console.log('='.repeat(40));

// ==========================================
// 21. 실무 베스트 프랙티스
// ==========================================
console.log('--- 실무 베스트 프랙티스 ---');

/**
 * ✅ DO (권장)
 */

// 1. 화살표 함수 기본 사용
const getUserName = (user) => user?.name ?? '익명';

// 2. 명확한 함수명 (동사 + 명사)
const calculateTotalPrice = (items) =>
   items.reduce((sum, item) => sum + item.price, 0);

// 3. 조기 반환 (Early Return)
const validateAge = (age) => {
   if (!age) return false;
   if (age < 0) return false;
   if (age > 150) return false;
   return true;
};

// 4. 순수 함수 (Pure Function) - 부작용 없음
const addNumbers = (a, b) => a + b; // 같은 입력 → 같은 출력

// 5. 단일 책임 원칙 (하나의 일만)
const formatDate = (date) => date.toISOString().split('T')[0];
const parseDate = (str) => new Date(str);

/**
 * ❌ DON'T (피해야 할 패턴)
 */

// 1. 함수가 너무 김 (20줄 이상)
// 2. 중첩이 깊음 (3단계 이상)
// 3. 부작용이 많음 (외부 변수 변경)
// 4. 함수명이 불명확 (doSomething, func1 등)

console.log('='.repeat(40));

// ==========================================
// 22. 핵심 정리
// ==========================================
/**
 * 🎯 2026년 실무 필수 개념:
 *
 * 1. 화살표 함수 (=>) - 기본으로 사용
 *    const add = (a, b) => a + b;
 *
 * 2. Rest 파라미터 (...args) - arguments 대신
 *    const sum = (...nums) => nums.reduce((a, b) => a + b);
 *
 * 3. 기본 매개변수 - 필수
 *    const greet = (name = '게스트') => `안녕, ${name}`;
 *
 * 4. 고차 함수 - 매우 중요!
 *    - map, filter, reduce
 *    - 함수를 인자/반환값으로
 *
 * 5. 클로저 - 면접 단골!
 *    - private 변수 구현
 *    - 팩토리 패턴
 *    - 이벤트 핸들러에서 데이터 보존
 *
 * 6. 커링 - 고급 패턴
 *    const add = (a) => (b) => a + b;
 *
 * 7. 콜백 함수
 *    - 비동기 처리 (나중엔 Promise/async-await)
 *
 * ⚠️ 덜 중요한 것들 (참고용):
 * - 함수 선언문 호이스팅
 * - arguments 객체 (Rest 파라미터 사용)
 * - IIFE (모듈 시스템으로 대체)
 *
 * 🔥 면접 단골 질문:
 *
 * Q1: "클로저가 뭔가요?"
 * A: 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다.
 *    내부 함수가 외부 함수의 변수에 접근할 수 있는 것을 말합니다.
 *
 * Q2: "화살표 함수와 일반 함수의 차이는?"
 * A: 1) this 바인딩 방식 (렉시컬 vs 동적)
 *    2) arguments 객체 유무
 *    3) 생성자 함수로 사용 불가
 *    4) 더 간결한 문법
 *
 * Q3: "고차 함수란?"
 * A: 함수를 인자로 받거나 함수를 반환하는 함수입니다.
 *    map, filter, reduce 등이 대표적인 예시입니다.
 *
 * Q4: "커링이 뭔가요?"
 * A: 여러 개의 인자를 받는 함수를 단일 인자를 받는
 *    함수들의 체인으로 변환하는 기법입니다.
 *    함수 재사용성과 부분 적용에 유용합니다.
 *
 * Q5: "순수 함수란?"
 * A: 같은 입력에 항상 같은 출력을 반환하고,
 *    부작용(side effect)이 없는 함수입니다.
 *
 * 💡 실무 팁:
 * - 화살표 함수를 기본으로 사용
 * - map, filter, reduce 완벽히 마스터
 * - 함수는 작고 단일 책임만 (20줄 이내)
 * - 디바운스/쓰로틀 패턴 알아두기
 * - 순수 함수로 작성하려 노력
 * - 명확한 함수명 사용 (동사 + 명사)
 */

console.log('함수 완벽 정리 끝!');
