/**
 * ==========================================
 * JavaScript 타입 변환 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * 타입 변환의 두 가지 방법:
 * 1. 명시적 변환 (Explicit Conversion) - 개발자가 의도적으로 변환
 * 2. 암묵적 변환 (Implicit Conversion) - JavaScript가 자동으로 변환
 */

// ==========================================
// 1. 문자열로 변환 (String Conversion)
// ==========================================
console.log('--- 문자열 변환 ---');

let age = 30;

// 1-1. 명시적 변환 (권장)
const stringAge1 = String(age); // ✅ 가장 명확
const stringAge2 = age.toString(); // ✅ 많이 사용
console.log(typeof stringAge1, stringAge1); // string 30
console.log(typeof stringAge2, stringAge2); // string 30

// 1-2. 암묵적 변환 (주의해서 사용)
const stringAge3 = age + ''; // 빈 문자열과 연결
console.log(typeof stringAge3, stringAge3); // string 30

// 템플릿 리터럴 (암묵적 변환)
const stringAge4 = `${age}`; // 자동으로 문자열 변환
console.log(typeof stringAge4, stringAge4); // string 30

// 🔥 실무 패턴 1: 숫자를 문자열로
const price = 50000;
const formattedPrice = price.toLocaleString('ko-KR'); // "50,000"
console.log('가격:', formattedPrice);

// 🔥 실무 패턴 2: Boolean을 문자열로
const isActive = true;
const statusText = String(isActive); // "true"
console.log('상태:', statusText);

// 🔥 실무 패턴 3: 객체/배열을 JSON 문자열로
const user = { name: '안유진', age: 21 };
const jsonString = JSON.stringify(user);
console.log('JSON:', jsonString);

console.log('='.repeat(40));

// ==========================================
// 2. 숫자로 변환 (Number Conversion)
// ==========================================
console.log('--- 숫자 변환 ---');

// 2-1. 명시적 변환 방법들
const str1 = '123';
const str2 = '99.99';
const str3 = '0xFF'; // 16진수

// Number() - 가장 엄격 (권장)
console.log(Number(str1)); // 123
console.log(Number(str2)); // 99.99
console.log(Number('123abc')); // NaN (변환 실패)
console.log(Number('')); // 0 (빈 문자열은 0)
console.log(Number(' ')); // 0 (공백만 있어도 0)

// parseInt() - 정수 변환 (문자 섞여있어도 앞부분 파싱)
console.log(parseInt(str1)); // 123
console.log(parseInt(str2)); // 99 (소수점 버림)
console.log(parseInt('123abc')); // 123 (숫자 부분만)
console.log(parseInt('abc123')); // NaN (숫자로 시작 안함)
console.log(parseInt(str3, 16)); // 255 (16진수로 파싱)

// parseFloat() - 실수 변환
console.log(parseFloat(str2)); // 99.99
console.log(parseFloat('99.99.99')); // 99.99 (첫 소수점까지만)

// 단항 + 연산자 - 가장 간결 (많이 사용)
console.log(+str1); // 123
console.log(+str2); // 99.99
console.log(+'123abc'); // NaN

// 🔥 실무 패턴 1: 폼 입력값 변환
const formInput = document.querySelector('input')?.value || '25';
const userAge = Number(formInput); // 또는 +formInput
console.log('입력된 나이:', userAge, typeof userAge);

// 🔥 실무 패턴 2: 쿼리 파라미터 변환
const urlParams = new URLSearchParams('?page=3&limit=10');
const page = Number(urlParams.get('page')); // 3
const limit = Number(urlParams.get('limit')); // 10
console.log('페이지:', page, '개수:', limit);

// 🔥 실무 패턴 3: 가격 계산 (parseFloat 사용)
const priceStr = '19,900';
const cleanPrice = priceStr.replace(/,/g, ''); // 쉼표 제거
const price1 = parseFloat(cleanPrice); // 19900
console.log('가격:', price1);

// 🔥 실무 패턴 4: API 응답 처리
const apiResponse = { count: '42', total: '100' };
const count = +apiResponse.count; // 42 (숫자)
const total = +apiResponse.total; // 100 (숫자)
console.log('카운트:', count, '전체:', total);

console.log('='.repeat(40));

// ==========================================
// 3. 불리언으로 변환 (Boolean Conversion) 🔥 매우 중요!
// ==========================================
console.log('--- Boolean 변환 ---');

// 3-1. 명시적 변환
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean('hello')); // true
console.log(Boolean('')); // false

// 3-2. 이중 부정 연산자 (!!) - 실무에서 가장 많이 사용
console.log(!!'hello'); // true
console.log(!!''); // false
console.log(!!1); // true
console.log(!!0); // false

// ==========================================
// 4. Falsy vs Truthy 값 🔥 핵심 개념!
// ==========================================
console.log('--- Falsy/Truthy 값 ---');

/**
 * 🔥 Falsy 값 (false로 변환되는 값) - 총 8개!
 * 1. false
 * 2. 0
 * 3. -0
 * 4. 0n (BigInt 0)
 * 5. '' (빈 문자열)
 * 6. null
 * 7. undefined
 * 8. NaN
 *
 * 이 8개를 제외한 모든 값은 Truthy!
 */

// Falsy 값들
console.log('=== Falsy 값 ===');
console.log(!!false); // false
console.log(!!0); // false
console.log(!!-0); // false
console.log(!!0n); // false
console.log(!!''); // false ⚠️ 중요!
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!NaN); // false

// Truthy 값들 (주의할 것들)
console.log('=== Truthy 값 ===');
console.log(!!'0'); // true ⚠️ 문자열 '0'은 true!
console.log(!!'false'); // true ⚠️ 문자열 'false'도 true!
console.log(!![]); // true ⚠️ 빈 배열은 true!
console.log(!!{}); // true ⚠️ 빈 객체는 true!
console.log(!!-1); // true (0이 아닌 모든 숫자)
console.log(!!' '); // true (공백도 문자열이므로 true)

console.log('='.repeat(40));

// ==========================================
// 5. 실무 패턴: 조건문에서의 활용
// ==========================================
console.log('--- 실무 조건문 패턴 ---');

// 🔥 패턴 1: 값 존재 여부 체크
function processUser(user) {
   if (user) {
      // user가 null, undefined가 아니면 실행
      console.log('사용자 처리:', user);
   }
}

processUser({ name: '안유진' }); // 실행됨
processUser(null); // 실행 안됨
processUser(undefined); // 실행 안됨

// 🔥 패턴 2: 문자열 입력 검증
function validateInput(input) {
   if (!input) {
      // input이 '', null, undefined면 실행
      console.log('입력값이 없습니다');
      return false;
   }
   console.log('입력값:', input);
   return true;
}

validateInput(''); // 입력값이 없습니다
validateInput('안유진'); // 입력값: 안유진
validateInput(null); // 입력값이 없습니다

// 🔥 패턴 3: 배열/객체 존재 여부
function processData(data) {
   if (data && data.length > 0) {
      // 배열이 있고 비어있지 않으면
      console.log('데이터 개수:', data.length);
   } else {
      console.log('데이터 없음');
   }
}

processData([1, 2, 3]); // 데이터 개수: 3
processData([]); // 데이터 없음
processData(null); // 데이터 없음

// 🔥 패턴 4: 숫자 0 처리 주의!
function setVolume(volume) {
   // ❌ 잘못된 방법 (0도 false로 취급됨)
   const vol1 = volume || 50; // 0을 넣어도 50이 됨

   // ✅ 올바른 방법 (??를 사용해 null/undefined만 체크)
   const vol2 = volume ?? 50; // 0을 넣으면 0 유지

   console.log('볼륨:', vol2);
}

setVolume(0); // 볼륨: 0 (올바름)
setVolume(undefined); // 볼륨: 50 (기본값)

console.log('='.repeat(40));

// ==========================================
// 6. 암묵적 변환 (Implicit Conversion)
// ==========================================
console.log('--- 암묵적 변환 ---');

// 6-1. 문자열 연결 (+)
console.log('96' + 2); // '962' (숫자가 문자열로 변환)
console.log(2 + '96'); // '296'
console.log('hello' + true); // 'hellotrue'

// 6-2. 산술 연산 (-, *, /, %)
console.log('96' - 2); // 94 (문자열이 숫자로 변환)
console.log('96' * 2); // 192
console.log('96' / 2); // 48
console.log('96' % 5); // 1

// 6-3. 비교 연산
console.log('5' > 3); // true (문자열이 숫자로 변환)
console.log('05' == 5); // true (타입 변환 후 비교)
console.log('05' === 5); // false (타입까지 비교)

// 🔥 실무에서 주의할 점
console.log('10' + 5 + 5); // '1055' (문자열 연결)
console.log(5 + 5 + '10'); // '1010' (먼저 숫자 더한 후 문자열 연결)
console.log('10' - 5 + 5); // 10 (숫자 연산)

console.log('='.repeat(40));

// ==========================================
// 7. 다양한 타입 변환 예제
// ==========================================
console.log('--- 다양한 타입 변환 ---');

// 숫자 → 문자열
console.log((99).toString()); // '99'
console.log(true.toString()); // 'true'
console.log(Infinity.toString()); // 'Infinity'

// 다양한 진법으로 변환
const num = 255;
console.log(num.toString(2)); // '11111111' (2진법)
console.log(num.toString(8)); // '377' (8진법)
console.log(num.toString(16)); // 'ff' (16진법)

// 배열 → 문자열
const arr = [1, 2, 3];
console.log(arr.toString()); // '1,2,3'
console.log(arr.join('-')); // '1-2-3'

// 객체 → 문자열
const obj = { name: '안유진' };
console.log(obj.toString()); // '[object Object]'
console.log(JSON.stringify(obj)); // '{"name":"안유진"}'

console.log('='.repeat(40));

// ==========================================
// 8. 실무 종합 예제
// ==========================================
console.log('--- 실무 종합 예제 ---');

// 예제 1: 폼 데이터 처리
function processForm(formData) {
   // 문자열을 숫자로 변환
   const age = Number(formData.age);
   const price = parseFloat(formData.price.replace(/,/g, ''));

   // 불리언 변환 (체크박스)
   const agreed = !!formData.agreed; // 'on', true, 1 등을 true로

   // 빈 값 체크
   if (!formData.name) {
      return { error: '이름을 입력하세요' };
   }

   return { age, price, agreed, name: formData.name };
}

const form1 = {
   name: '안유진',
   age: '21',
   price: '50,000',
   agreed: 'on',
};

console.log(processForm(form1));
// { age: 21, price: 50000, agreed: true, name: '안유진' }

// 예제 2: API 응답 데이터 변환
function normalizeApiData(apiData) {
   return {
      id: Number(apiData.id), // 문자열 ID를 숫자로
      name: String(apiData.name), // 명시적 문자열 변환
      isActive: !!apiData.is_active, // 0/1을 boolean으로
      price: parseFloat(apiData.price) || 0, // 가격 변환 (실패 시 0)
      tags: apiData.tags || [], // null/undefined면 빈 배열
   };
}

const apiData = {
   id: '123',
   name: null, // null도 처리
   is_active: 1,
   price: '99.99',
   tags: null,
};

console.log(normalizeApiData(apiData));
// { id: 123, name: 'null', isActive: true, price: 99.99, tags: [] }

// 예제 3: 검색 필터 처리
function buildSearchFilter(params) {
   // 값이 있는 것만 필터에 추가
   const filter = {};

   if (params.keyword) {
      filter.keyword = params.keyword;
   }

   if (params.minPrice) {
      filter.minPrice = Number(params.minPrice);
   }

   if (params.maxPrice) {
      filter.maxPrice = Number(params.maxPrice);
   }

   // 체크박스 - 불리언 변환
   if (params.inStock) {
      filter.inStock = !!params.inStock;
   }

   return filter;
}

const searchParams = {
   keyword: '아이브',
   minPrice: '10000',
   maxPrice: '',
   inStock: 'on',
};

console.log(buildSearchFilter(searchParams));
// { keyword: '아이브', minPrice: 10000, inStock: true }

// 예제 4: 안전한 값 추출 (실무 필수 패턴!)
function safeGetValue(obj, key, defaultValue = null) {
   const value = obj?.[key];

   // 값이 없으면 기본값
   if (value === null || value === undefined) {
      return defaultValue;
   }

   return value;
}

const data = { name: '안유진', age: 0, city: '' };

console.log(safeGetValue(data, 'name', '익명')); // '안유진'
console.log(safeGetValue(data, 'age', 20)); // 0 (0도 유효한 값)
console.log(safeGetValue(data, 'city', '서울')); // '' (빈 문자열도 유효)
console.log(safeGetValue(data, 'phone', '없음')); // '없음' (기본값)

console.log('='.repeat(40));

// ==========================================
// 9. 타입 체크 및 변환 헬퍼 함수 (실무 패턴)
// ==========================================
console.log('--- 타입 체크 헬퍼 함수 ---');

// 숫자인지 확인 (NaN도 체크)
function isNumber(value) {
   return typeof value === 'number' && !isNaN(value);
}

console.log(isNumber(123)); // true
console.log(isNumber('123')); // false
console.log(isNumber(NaN)); // false

// 숫자로 변환 가능한지 확인
function canBeNumber(value) {
   return !isNaN(Number(value)) && value !== '';
}

console.log(canBeNumber('123')); // true
console.log(canBeNumber('abc')); // false
console.log(canBeNumber('')); // false

// 안전한 숫자 변환
function toNumber(value, defaultValue = 0) {
   const num = Number(value);
   return isNaN(num) ? defaultValue : num;
}

console.log(toNumber('123')); // 123
console.log(toNumber('abc')); // 0
console.log(toNumber('abc', -1)); // -1

// 빈 값 체크 (null, undefined, '')
function isEmpty(value) {
   return value === null || value === undefined || value === '';
}

console.log(isEmpty(null)); // true
console.log(isEmpty('')); // true
console.log(isEmpty(0)); // false
console.log(isEmpty(false)); // false

// 값이 있는지 체크 (0, false도 유효한 값으로)
function hasValue(value) {
   return value !== null && value !== undefined;
}

console.log(hasValue(0)); // true
console.log(hasValue(false)); // true
console.log(hasValue('')); // true
console.log(hasValue(null)); // false

console.log('='.repeat(40));

// ==========================================
// 10. 핵심 정리
// ==========================================
/**
 * ✅ 문자열 변환:
 * - String(value) - 가장 명확
 * - value.toString() - null/undefined 주의
 * - `${value}` - 템플릿 리터럴 (간편)
 *
 * ✅ 숫자 변환:
 * - Number(value) - 가장 엄격 (권장)
 * - parseInt(value) - 정수만
 * - parseFloat(value) - 실수
 * - +value - 간결 (많이 사용)
 *
 * ✅ 불리언 변환:
 * - Boolean(value) - 명시적
 * - !!value - 실무에서 가장 많이 사용
 *
 * 🔥 Falsy 값 8개 (외우기!):
 * false, 0, -0, 0n, '', null, undefined, NaN
 *
 * ⚠️ 주의사항:
 * 1. '0', 'false', [], {} 는 모두 truthy!
 * 2. 0 체크할 때는 || 대신 ?? 사용
 * 3. === 로 타입까지 비교하기
 * 4. 빈 배열/객체도 truthy이므로 .length, Object.keys() 체크
 *
 * 💡 실무 팁:
 * - 폼 입력: Number() 또는 +
 * - API 응답: 명시적 변환 + 기본값 설정
 * - 조건문: !! 보다는 명확한 비교 (=== null)
 * - null/undefined만 체크: ?? 연산자
 */

console.log('타입 변환 완벽 정리 끝!');
