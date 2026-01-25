/**
 * ==========================================
 * JavaScript 연산자 완벽 정리 (2026년 최신)
 * ==========================================
 * 실무에서 정말 많이 쓰는 패턴 위주로 정리
 */

// ==========================================
// 1. 산술 연산자 (Arithmetic Operators)
// ==========================================
console.log('--- 산술 연산자 ---');

console.log(10 + 10); // 20 - 덧셈
console.log(10 - 10); // 0  - 뺄셈
console.log(10 * 10); // 100 - 곱셈
console.log(10 / 10); // 1  - 나눗셈
console.log(10 % 3); // 1  - 나머지 (modulo)

// 연산 우선순위 (괄호 사용)
console.log(10 * (10 + 10)); // 200

// 🔥 실무 패턴: 나머지 연산자 활용
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// 짝수/홀수 판별
numbers.forEach((num) => {
   if (num % 2 === 0) {
      console.log(`${num}은 짝수`);
   }
});

// 3의 배수마다 작업 실행
for (let i = 0; i < 10; i++) {
   if (i % 3 === 0) {
      console.log(`${i}번째 - 3의 배수`);
   }
}

console.log('='.repeat(40));

// ==========================================
// 2. 증감 연산자 (Increment/Decrement)
// ==========================================
console.log('--- 증감 연산자 ---');

let number = 1;

// 후위 증감 (현재 값 사용 후 증가/감소)
let result = number++; // result = 1, number = 2
console.log('number++:', result, number); // 1, 2

result = number--; // result = 2, number = 1
console.log('number--:', result, number); // 2, 1

// 전위 증감 (먼저 증가/감소 후 값 사용)
result = ++number; // result = 2, number = 2
console.log('++number:', result, number); // 2, 2

result = --number; // result = 1, number = 1
console.log('--number:', result, number); // 1, 1

// 🔥 실무 패턴: 반복문에서 주로 사용
for (let i = 0; i < 5; i++) {
   console.log(`반복 ${i + 1}번째`);
}

// 배열 순회
const items = ['사과', '바나나', '오렌지'];
let index = 0;
while (index < items.length) {
   console.log(items[index]);
   index++;
}

console.log('='.repeat(40));

// ==========================================
// 3. 단항 연산자 (+, -)
// ==========================================
console.log('--- 단항 연산자 ---');

// 문자열을 숫자로 변환
let strNum = '99';
console.log(+strNum); // 99 (number)
console.log(typeof +strNum); // number

// Boolean을 숫자로 변환
console.log(+true); // 1
console.log(+false); // 0

// 변환 불가능한 경우 NaN
console.log(+'안유진'); // NaN (Not a Number)

// 음수 변환
console.log(-strNum); // -99
console.log(typeof -strNum); // number

// 🔥 실무 패턴: 폼 입력값 숫자 변환
const userInput = '25';
const age = +userInput; // Number(userInput)보다 간결
console.log('나이:', age, typeof age);

// 날짜를 타임스탬프로 변환
const now = new Date();
const timestamp = +now; // getTime()과 동일
console.log('타임스탬프:', timestamp);

console.log('='.repeat(40));

// ==========================================
// 4. 할당 연산자 (Assignment Operators)
// ==========================================
console.log('--- 할당 연산자 ---');

let num = 100;
console.log('초기값:', num);

num += 10; // num = num + 10
console.log('+=:', num); // 110

num -= 10; // num = num - 10
console.log('-=:', num); // 100

num *= 2; // num = num * 2
console.log('*=:', num); // 200

num /= 2; // num = num / 2
console.log('/=:', num); // 100

num %= 30; // num = num % 30
console.log('%=:', num); // 10

// 🔥 실무 패턴: 카운터, 누적값
let totalPrice = 0;
const prices = [1000, 2000, 3000];

prices.forEach((price) => {
   totalPrice += price; // 누적 합계
});
console.log('총 가격:', totalPrice); // 6000

// 문자열 연결
let message = 'Hello';
message += ' World'; // message = message + ' World'
console.log(message); // Hello World

console.log('='.repeat(40));

// ==========================================
// 5. 비교 연산자 (Comparison Operators)
// ==========================================
console.log('--- 비교 연산자 ---');

// == (동등): 값만 비교 (타입 변환 발생) ❌ 사용 지양
console.log(5 == 5); // true
console.log(5 == '5'); // true (타입 변환)
console.log(true == 1); // true
console.log(false == 0); // true

// === (일치): 값과 타입 모두 비교 ✅ 권장
console.log(5 === 5); // true
console.log(5 === '5'); // false
console.log(true === 1); // false

// != vs !== (같은 원리)
console.log(5 != '5'); // false (타입 변환)
console.log(5 !== '5'); // true (타입까지 비교)

// 🔥 실무에서는 항상 === 사용!
const userAge = '20';
if (userAge === 20) {
   // ❌ false
   console.log('성인');
}
if (userAge === '20') {
   // ✅ true
   console.log('올바른 비교');
}

// 대소 비교
console.log(100 > 1); // true
console.log(100 < 1); // false
console.log(100 >= 100); // true
console.log(100 <= 99); // false

// 🔥 실무 패턴: 유효성 검사
const inputAge = 15;
if (inputAge >= 18) {
   console.log('성인 인증');
} else {
   console.log('미성년자');
}

console.log('='.repeat(40));

// ==========================================
// 6. 삼항 연산자 (Ternary Operator) 🔥 매우 많이 씀!
// ==========================================
console.log('--- 삼항 연산자 ---');

// 기본 문법: 조건 ? 참일 때 : 거짓일 때
const score = 85;
const grade = score >= 90 ? 'A' : 'B';
console.log('학점:', grade); // B

// 🔥 실무 패턴 1: 조건부 렌더링 (React 등)
const isLoggedIn = true;
const userName = isLoggedIn ? '신재준' : '게스트';
console.log('사용자:', userName);

// 🔥 실무 패턴 2: 조건부 클래스명
const isActive = true;
const buttonClass = isActive ? 'btn-active' : 'btn-disabled';
console.log('버튼 클래스:', buttonClass);

// 🔥 실무 패턴 3: 중첩 삼항 연산자 (가독성 주의!)
const testScore = 75;
const testGrade =
   testScore >= 90 ? 'A' : testScore >= 80 ? 'B' : testScore >= 70 ? 'C' : 'F';
console.log('성적:', testGrade); // C

// 더 복잡한 경우는 if-else 권장
function getGrade(score) {
   if (score >= 90) return 'A';
   if (score >= 80) return 'B';
   if (score >= 70) return 'C';
   return 'F';
}

// 🔥 실무 패턴 4: 기본값 설정
const config = { timeout: 0 };
const timeout = config.timeout ? config.timeout : 5000;
console.log('타임아웃:', timeout); // 5000

console.log('='.repeat(40));

// ==========================================
// 7. 논리 연산자 (Logical Operators) 🔥 매우 중요!
// ==========================================
console.log('--- 논리 연산자 ---');

// && (AND): 모두 true여야 true
console.log(true && true); // true
console.log(true && false); // false
console.log(false && false); // false

// || (OR): 하나만 true여도 true
console.log(true || false); // true
console.log(false || false); // false

// 🔥 실무 패턴 1: 복합 조건문
const userAge2 = 25;
const hasLicense = true;

if (userAge2 >= 18 && hasLicense) {
   console.log('운전 가능');
}

// 🔥 실무 패턴 2: 권한 체크
const isAdmin = false;
const isOwner = true;

if (isAdmin || isOwner) {
   console.log('수정 권한 있음');
}

console.log('='.repeat(40));

// ==========================================
// 8. 단축 평가 (Short-circuit Evaluation) 🔥 매우 중요!
// ==========================================
console.log('--- 단축 평가 ---');

/**
 * && 연산자:
 * - 좌측이 falsy면 좌측 반환
 * - 좌측이 truthy면 우측 반환
 */
console.log(true && '아이브'); // '아이브'
console.log(false && '아이브'); // false
console.log(null && '아이브'); // null

/**
 * || 연산자:
 * - 좌측이 truthy면 좌측 반환
 * - 좌측이 falsy면 우측 반환
 */
console.log(true || '아이브'); // true
console.log(false || '아이브'); // '아이브'
console.log(null || '기본값'); // '기본값'

// 🔥 실무 패턴 1: 기본값 설정 (|| 사용)
function greet(name) {
   const userName = name || '게스트'; // name이 없으면 '게스트'
   console.log(`안녕하세요, ${userName}님`);
}
greet(); // 안녕하세요, 게스트님
greet('안유진'); // 안녕하세요, 안유진님

// 🔥 실무 패턴 2: 조건부 실행 (&& 사용)
const user = { name: '신재준', age: 25 };

// user가 있을 때만 실행
user && console.log(`사용자: ${user.name}`); // 사용자: 신재준

// 배열이 있을 때만 map 실행
const items2 = ['a', 'b', 'c'];
const result2 = items2 && items2.map((item) => item.toUpperCase());
console.log(result2); // ['A', 'B', 'C']

// 🔥 실무 패턴 3: 함수 호출 방어
const callback = null;
// callback이 함수일 때만 실행
callback && callback();

const onSuccess = () => console.log('성공!');
onSuccess && onSuccess(); // 성공!

// 🔥 실무 패턴 4: 체인 단축 평가
const data = null;
const value = data && data.user && data.user.name; // undefined (에러 없음)
console.log(value);

console.log('='.repeat(40));

// ==========================================
// 9. Nullish Coalescing Operator (??) 🔥 최신 필수!
// ==========================================
console.log('--- Nullish Coalescing (??) ---');

/**
 * ?? 연산자 (ES2020):
 * - null 또는 undefined일 때만 우측 반환
 * - 0, '', false는 유효한 값으로 취급
 *
 * || 연산자와의 차이:
 * - ||는 모든 falsy 값에서 우측 반환
 * - ??는 null/undefined만 우측 반환
 */

let name1;
console.log(name1); // undefined
name1 = name1 ?? '코드팩토리';
console.log(name1); // '코드팩토리'

name1 = name1 ?? '아이브';
console.log(name1); // '코드팩토리' (이미 값이 있음)

// 🔥 || vs ?? 비교 (중요!)
const count1 = 0;
console.log(count1 || 10); // 10 (0은 falsy)
console.log(count1 ?? 10); // 0 (0은 유효한 값)

const text1 = '';
console.log(text1 || '기본값'); // '기본값' (''은 falsy)
console.log(text1 ?? '기본값'); // '' (''은 유효한 값)

const flag = false;
console.log(flag || true); // true (false는 falsy)
console.log(flag ?? true); // false (false는 유효한 값)

// 🔥 실무 패턴 1: 설정 객체 기본값
const config1 = {
   timeout: 0, // 0초도 유효한 값
   retry: false, // false도 유효한 값
   message: '', // 빈 문자열도 유효한 값
};

// || 사용 (잘못된 방법)
const timeout1 = config1.timeout || 5000; // 5000 (0이 무시됨 ❌)

// ?? 사용 (올바른 방법)
const timeout2 = config1.timeout ?? 5000; // 0 (0을 유지 ✅)
const retry = config1.retry ?? true; // false (false를 유지 ✅)

console.log('타임아웃:', timeout2); // 0
console.log('재시도:', retry); // false

// 🔥 실무 패턴 2: API 응답 처리
const apiResponse = {
   count: 0, // 결과가 0개일 수도 있음
   data: null, // 데이터 없음
};

const itemCount = apiResponse.count ?? -1; // 0 유지
const items3 = apiResponse.data ?? []; // null이므로 빈 배열
console.log('아이템 수:', itemCount); // 0
console.log('아이템:', items3); // []

// 🔥 실무 패턴 3: 함수 매개변수 기본값
function fetchData(url, options = {}) {
   const timeout3 = options.timeout ?? 3000;
   const cache = options.cache ?? true;

   console.log(`URL: ${url}, Timeout: ${timeout3}, Cache: ${cache}`);
}

fetchData('/api/users', { timeout: 0, cache: false });
// URL: /api/users, Timeout: 0, Cache: false

console.log('='.repeat(40));

// ==========================================
// 10. Optional Chaining (?.) 🔥 최신 필수!
// ==========================================
console.log('--- Optional Chaining (?.) ---');

/**
 * ?. 연산자 (ES2020):
 * - 중첩 객체의 안전한 접근
 * - null/undefined면 에러 대신 undefined 반환
 */

const user2 = {
   name: '안유진',
   address: {
      city: '서울',
   },
};

// 기존 방법 (번거로움)
const city1 = user2 && user2.address && user2.address.city;
console.log(city1); // '서울'

// Optional Chaining (간결함)
const city2 = user2?.address?.city;
console.log(city2); // '서울'

// 없는 속성 접근
const zipCode = user2?.address?.zipCode;
console.log(zipCode); // undefined (에러 없음)

// 🔥 실무 패턴 1: API 응답 처리
const apiData = {
   user: {
      profile: {
         name: '신재준',
      },
   },
};

const userName2 = apiData?.user?.profile?.name ?? '익명';
console.log('사용자명:', userName2); // 신재준

// 🔥 실무 패턴 2: 메서드 호출
const obj = {
   method: () => '실행됨',
};

console.log(obj.method?.()); // '실행됨'
console.log(obj.notExist?.()); // undefined (에러 없음)

// 🔥 실무 패턴 3: 배열 접근
const users = null;
const firstUser = users?.[0]?.name ?? '사용자 없음';
console.log(firstUser); // 사용자 없음

console.log('='.repeat(40));

// ==========================================
// 11. 지수 연산자 (**)
// ==========================================
console.log('--- 지수 연산자 ---');

console.log(2 ** 2); // 4
console.log(2 ** 3); // 8
console.log(10 ** 3); // 1000

// Math.pow()와 동일하지만 더 간결
console.log(Math.pow(2, 3)); // 8
console.log(2 ** 3); // 8 (권장)

// 🔥 실무 패턴: 수학 계산
const area = Math.PI * 5 ** 2; // 원의 넓이
console.log('원의 넓이:', area);

console.log('='.repeat(40));

// ==========================================
// 12. 실무 종합 예제
// ==========================================
console.log('--- 실무 종합 예제 ---');

// 예제 1: 사용자 권한 체크
function checkPermission(user) {
   const isAdmin = user?.role === 'admin';
   const isOwner = user?.id === 1;

   // 관리자이거나 소유자면 권한 있음
   return isAdmin || isOwner;
}

console.log(checkPermission({ role: 'admin' })); // true
console.log(checkPermission({ id: 1 })); // true
console.log(checkPermission({ role: 'user' })); // false

// 예제 2: 폼 유효성 검사
function validateForm(data) {
   const name = data?.name?.trim();
   const age = data?.age;
   const email = data?.email;

   // 모든 필드가 있어야 유효
   const isValid = name && age && email;

   // 에러 메시지
   const error = !name
      ? '이름을 입력하세요'
      : !age
        ? '나이를 입력하세요'
        : !email
          ? '이메일을 입력하세요'
          : null;

   return { isValid, error };
}

console.log(validateForm({ name: '안유진', age: 21, email: 'test@test.com' }));
// { isValid: true, error: null }

console.log(validateForm({ name: '안유진' }));
// { isValid: false, error: '나이를 입력하세요' }

// 예제 3: 설정 병합
function createConfig(userConfig) {
   const defaultConfig = {
      timeout: 5000,
      retries: 3,
      cache: true,
   };

   return {
      timeout: userConfig?.timeout ?? defaultConfig.timeout,
      retries: userConfig?.retries ?? defaultConfig.retries,
      cache: userConfig?.cache ?? defaultConfig.cache,
   };
}

const config2 = createConfig({ timeout: 0, cache: false });
console.log(config2);
// { timeout: 0, retries: 3, cache: false }

// 예제 4: 데이터 변환
function formatUser(userData) {
   return {
      name: userData?.name ?? '익명',
      age: userData?.age ?? 0,
      email: userData?.email ?? 'no-email',
      isActive: userData?.isActive ?? false,
      lastLogin: userData?.lastLogin ?? new Date(),
   };
}

console.log(formatUser({ name: '신재준', age: 25 }));

console.log('='.repeat(40));

// ==========================================
// 13. 핵심 정리
// ==========================================
/**
 * ✅ 2026년 실무에서 필수로 사용하는 연산자:
 *
 * 1. === (일치 연산자)
 *    - == 대신 항상 사용
 *
 * 2. 삼항 연산자 (? :)
 *    - 간단한 조건부 값 할당
 *    - React 등에서 조건부 렌더링
 *
 * 3. 논리 연산자 (&&, ||)
 *    - 조건부 실행
 *    - 단축 평가
 *
 * 4. ?? (Nullish Coalescing)
 *    - null/undefined만 체크하는 기본값
 *    - 0, '', false를 유효한 값으로 취급
 *
 * 5. ?. (Optional Chaining)
 *    - 안전한 중첩 객체 접근
 *    - null/undefined 에러 방지
 *
 * 6. += 등 할당 연산자
 *    - 카운터, 누적값 계산
 *
 * ⚠️ 주의사항:
 * - || vs ??의 차이 정확히 이해하기
 * - 0, '', false가 유효한 값인 경우 ?? 사용
 * - 복잡한 조건은 if-else가 더 명확할 수 있음
 */

console.log('연산자 완벽 정리 끝!');
