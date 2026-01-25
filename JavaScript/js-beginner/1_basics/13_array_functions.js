/**
 * ==========================================
 * JavaScript 배열 메서드 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * ⭐ = 실무에서 매우 자주 사용
 * 🔥 = 필수 마스터
 *
 * 난이도별 구분:
 * [초급] - 기본 배열 조작
 * [중급] - 함수형 프로그래밍 메서드
 * [고급] - 복잡한 데이터 처리
 */

let iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서'];

// ==========================================
// [초급] 배열 기본 조작 메서드
// ==========================================
console.log('=== [초급] 배열 기본 조작 ===');

// --------------------------------------------------------
// 1. push() - 배열 끝에 추가 (원본 변경) ⭐
// --------------------------------------------------------
console.log('--- push() ---');
const pushResult = iveMembers.push('코드팩토리');
console.log('반환값 (새 길이):', pushResult); // 7
console.log('변경된 배열:', iveMembers);

// 🔥 실무 패턴: 여러 개 한 번에 추가
iveMembers.push('멤버1', '멤버2');
console.log(iveMembers);

// ⚠️ 원본 배열이 변경됨!
iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// --------------------------------------------------------
// 2. pop() - 배열 끝 요소 제거 (원본 변경) ⭐
// --------------------------------------------------------
console.log('--- pop() ---');
const popped = iveMembers.pop();
console.log('제거된 요소:', popped); // 이서
console.log('변경된 배열:', iveMembers);

iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// --------------------------------------------------------
// 3. shift() - 배열 첫 요소 제거 (원본 변경)
// --------------------------------------------------------
console.log('--- shift() ---');
const shifted = iveMembers.shift();
console.log('제거된 요소:', shifted); // 안유진
console.log('변경된 배열:', iveMembers);

// ⚠️ 성능: O(n) - 모든 요소를 앞으로 이동시킴
iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// --------------------------------------------------------
// 4. unshift() - 배열 앞에 추가 (원본 변경)
// --------------------------------------------------------
console.log('--- unshift() ---');
const unshiftResult = iveMembers.unshift('신입');
console.log('반환값 (새 길이):', unshiftResult); // 7
console.log('변경된 배열:', iveMembers);

// ⚠️ 성능: O(n) - 모든 요소를 뒤로 이동시킴
iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// --------------------------------------------------------
// 5. splice() - 요소 추가/제거 (원본 변경) ⭐
// --------------------------------------------------------
console.log('--- splice() ---');

// 제거만
const removed = iveMembers.splice(0, 3); // 인덱스 0부터 3개 제거
console.log('제거된 요소:', removed); // ['안유진', '가을', '레이']
console.log('변경된 배열:', iveMembers); // ['장원영', '리즈', '이서']

iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

// 제거 + 추가
iveMembers.splice(2, 1, '새멤버1', '새멤버2'); // 인덱스 2에서 1개 제거 후 추가
console.log('splice 후:', iveMembers);

// 추가만 (제거 0개)
iveMembers.splice(1, 0, '삽입'); // 인덱스 1에 삽입
console.log('삽입 후:', iveMembers);

iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// --------------------------------------------------------
// 6. slice() - 배열 일부 복사 (원본 유지) ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- slice() ---');
const sliced = iveMembers.slice(0, 3); // 인덱스 0~2 (3은 미포함)
console.log('복사된 부분:', sliced); // ['안유진', '가을', '레이']
console.log('원본 배열:', iveMembers); // 변경 없음

// 음수 인덱스 (뒤에서부터)
console.log(iveMembers.slice(-2)); // ['리즈', '이서']

// 전체 복사
const copy = iveMembers.slice();
console.log('전체 복사:', copy);

console.log('='.repeat(40));

// --------------------------------------------------------
// 7. concat() - 배열 연결 (원본 유지) ⭐
// --------------------------------------------------------
console.log('--- concat() ---');
const concatenated = iveMembers.concat('코드팩토리', '추가멤버');
console.log('연결된 배열:', concatenated);
console.log('원본 배열:', iveMembers); // 변경 없음

// 여러 배열 합치기
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const merged = arr1.concat(arr2, arr3);
console.log('합친 배열:', merged); // [1, 2, 3, 4, 5, 6]

console.log('='.repeat(40));

// --------------------------------------------------------
// 8. Spread Operator (...) - 배열 복사/병합 ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- Spread Operator ---');

// 얕은 복사 (권장 방법!)
const spreadCopy = [...iveMembers];
console.log('spread 복사:', spreadCopy);
console.log('같은 배열?', spreadCopy === iveMembers); // false

// 배열 병합 (concat보다 직관적)
const merged2 = [...arr1, ...arr2, ...arr3];
console.log('spread 병합:', merged2);

// 배열 앞/중간에 요소 추가
const withNew = ['처음', ...iveMembers, '끝'];
console.log('요소 추가:', withNew);

// ⚠️ 참조 복사 (얕은 복사 주의!)
const nested = [
   [1, 2],
   [3, 4],
];
const spreadNested = [...nested];
spreadNested[0][0] = 999;
console.log('원본도 변경됨:', nested); // [[999, 2], [3, 4]]

console.log('='.repeat(40));

// --------------------------------------------------------
// 9. join() - 배열을 문자열로 변환 ⭐⭐
// --------------------------------------------------------
console.log('--- join() ---');
console.log('기본 join:', iveMembers.join()); // 쉼표로 구분
console.log('슬래시 구분:', iveMembers.join('/')); // 안유진/가을/레이...
console.log('공백 구분:', iveMembers.join(' '));
console.log('빈 문자열:', iveMembers.join('')); // 안유진가을레이...

// 🔥 실무 패턴: URL 생성
const paths = ['users', '123', 'profile'];
const url = '/' + paths.join('/');
console.log('URL:', url); // /users/123/profile

console.log('='.repeat(40));

// --------------------------------------------------------
// 10. reverse() - 배열 순서 뒤집기 (원본 변경)
// --------------------------------------------------------
console.log('--- reverse() ---');
const reversed = iveMembers.reverse();
console.log('뒤집힌 배열:', reversed);
console.log('원본도 변경됨:', iveMembers);

iveMembers.reverse(); // 다시 뒤집어서 원래대로

console.log('='.repeat(40));

// --------------------------------------------------------
// 11. sort() - 배열 정렬 (원본 변경) ⭐⭐
// --------------------------------------------------------
console.log('--- sort() ---');

// 기본 정렬 (문자열 기준)
const sorted = iveMembers.sort();
console.log('기본 정렬:', sorted); // 가나다순

// 숫자 배열 정렬
let numbers = [1, 9, 7, 5, 3, 10, 20];

// ❌ 잘못된 방법 (문자열로 비교됨)
console.log([...numbers].sort()); // [1, 10, 20, 3, 5, 7, 9] - 잘못됨!

// ✅ 올바른 방법: 비교 함수 사용
// 오름차순 (작은 것부터)
numbers.sort((a, b) => a - b);
console.log('오름차순:', numbers); // [1, 3, 5, 7, 9, 10, 20]

// 내림차순 (큰 것부터)
numbers.sort((a, b) => b - a);
console.log('내림차순:', numbers); // [20, 10, 9, 7, 5, 3, 1]

// 🔥 실무 패턴: 객체 배열 정렬
const users = [
   { name: '장원영', age: 20 },
   { name: '안유진', age: 21 },
   { name: '가을', age: 22 },
];

// 나이순 정렬
users.sort((a, b) => a.age - b.age);
console.log('나이순:', users);

// 이름순 정렬
users.sort((a, b) => a.name.localeCompare(b.name));
console.log('이름순:', users);

iveMembers = ['안유진', '가을', '레이', '장원영', '리즈', '이서']; // 초기화

console.log('='.repeat(40));

// ==========================================
// [중급] 함수형 프로그래밍 메서드 🔥🔥🔥
// ==========================================
console.log('\n=== [중급] 함수형 프로그래밍 메서드 ===');

// --------------------------------------------------------
// 12. map() - 각 요소 변환 (새 배열 반환) ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- map() ---');

/**
 * 가장 많이 사용하는 메서드!
 * 각 요소를 변환해서 새 배열 생성
 */

// 기본 사용
const withPrefix = iveMembers.map((member) => `아이브: ${member}`);
console.log('접두사 추가:', withPrefix);

// 조건부 변환
const highlighted = iveMembers.map((member) => {
   if (member === '안유진') {
      return `⭐ ${member} ⭐`;
   }
   return member;
});
console.log('조건부 변환:', highlighted);

// 🔥 실무 패턴 1: 객체 배열에서 특정 속성만 추출
const userObjects = [
   { id: 1, name: '안유진', age: 21 },
   { id: 2, name: '장원영', age: 20 },
];

const names = userObjects.map((user) => user.name);
console.log('이름만:', names); // ['안유진', '장원영']

const ids = userObjects.map((user) => user.id);
console.log('ID만:', ids); // [1, 2]

// 🔥 실무 패턴 2: 데이터 변환
const prices = [1000, 2000, 3000];
const withTax = prices.map((price) => price * 1.1);
console.log('세금 포함:', withTax); // [1100, 2200, 3300]

// 🔥 실무 패턴 3: 인덱스 활용
const indexed = iveMembers.map((member, index) => ({
   id: index + 1,
   name: member,
}));
console.log('인덱스 포함:', indexed);

console.log('원본 배열은 유지:', iveMembers);

console.log('='.repeat(40));

// --------------------------------------------------------
// 13. filter() - 조건에 맞는 요소만 필터링 ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- filter() ---');

/**
 * 두 번째로 많이 사용하는 메서드!
 * 조건을 만족하는 요소만 모아서 새 배열 생성
 */

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 짝수만 필터링
const evens = numbers.filter((n) => n % 2 === 0);
console.log('짝수만:', evens); // [2, 4, 6, 8, 10]

// 홀수만 필터링
const odds = numbers.filter((n) => n % 2 === 1);
console.log('홀수만:', odds);

// 🔥 실무 패턴 1: 객체 배열 필터링
const products = [
   { name: '상품1', price: 10000, inStock: true },
   { name: '상품2', price: 20000, inStock: false },
   { name: '상품3', price: 15000, inStock: true },
];

const available = products.filter((p) => p.inStock);
console.log('재고 있는 상품:', available);

const expensive = products.filter((p) => p.price >= 15000);
console.log('비싼 상품:', expensive);

// 🔥 실무 패턴 2: 복합 조건
const filtered = products.filter((p) => p.inStock && p.price < 20000);
console.log('재고 있고 저렴한 상품:', filtered);

// 🔥 실무 패턴 3: 특정 값 제거
const withoutYujin = iveMembers.filter((m) => m !== '안유진');
console.log('안유진 제외:', withoutYujin);

// 🔥 실무 패턴 4: null/undefined 제거
const withNull = [1, null, 2, undefined, 3, null];
const cleaned = withNull.filter((n) => n != null); // != null은 null과 undefined 둘 다 제거
console.log('null 제거:', cleaned); // [1, 2, 3]

console.log('='.repeat(40));

// --------------------------------------------------------
// 14. find() - 조건에 맞는 첫 요소 찾기 ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- find() ---');

/**
 * 조건을 만족하는 첫 번째 요소 반환
 * 못 찾으면 undefined
 */

numbers = [1, 8, 6, 3, 7];

const firstEven = numbers.find((n) => n % 2 === 0);
console.log('첫 짝수:', firstEven); // 8

const notFound = numbers.find((n) => n > 100);
console.log('못 찾음:', notFound); // undefined

// 🔥 실무 패턴 1: ID로 객체 찾기 (매우 자주 사용!)
const users2 = [
   { id: 1, name: '안유진' },
   { id: 2, name: '장원영' },
   { id: 3, name: '가을' },
];

const user = users2.find((u) => u.id === 2);
console.log('ID 2 사용자:', user); // { id: 2, name: '장원영' }

// 🔥 실무 패턴 2: 속성으로 찾기
const yujin = users2.find((u) => u.name === '안유진');
console.log('안유진 찾기:', yujin);

// 🔥 실무 패턴 3: Optional Chaining과 함께
const email = users2.find((u) => u.id === 999)?.email ?? '이메일 없음';
console.log('이메일:', email);

console.log('='.repeat(40));

// --------------------------------------------------------
// 15. findIndex() - 조건에 맞는 첫 요소의 인덱스 ⭐⭐
// --------------------------------------------------------
console.log('--- findIndex() ---');

const firstEvenIndex = numbers.findIndex((n) => n % 2 === 0);
console.log('첫 짝수의 인덱스:', firstEvenIndex); // 1 (8의 인덱스)

const notFoundIndex = numbers.findIndex((n) => n > 100);
console.log('못 찾으면:', notFoundIndex); // -1

// 🔥 실무 패턴: 업데이트할 항목 찾기
const items = [
   { id: 1, name: '아이템1' },
   { id: 2, name: '아이템2' },
];

const updateIndex = items.findIndex((item) => item.id === 2);
if (updateIndex !== -1) {
   items[updateIndex] = { ...items[updateIndex], name: '수정됨' };
}
console.log('업데이트 후:', items);

console.log('='.repeat(40));

// --------------------------------------------------------
// 16. reduce() - 배열을 단일 값으로 축약 ⭐⭐⭐ 🔥
// --------------------------------------------------------
console.log('--- reduce() ---');

/**
 * 가장 강력하지만 어려운 메서드
 * 배열의 모든 요소를 순회하며 하나의 값으로 만듦
 */

numbers = [1, 2, 3, 4, 5];

// 합계 구하기 (가장 기본)
const sum = numbers.reduce((accumulator, current) => {
   console.log(`acc: ${accumulator}, cur: ${current}`);
   return accumulator + current;
}, 0); // 초기값 0

console.log('합계:', sum); // 15

// 곱셈
const product = numbers.reduce((acc, cur) => acc * cur, 1);
console.log('곱셈:', product); // 120

// 최댓값
const max = numbers.reduce((acc, cur) => Math.max(acc, cur));
console.log('최댓값:', max); // 5

// 🔥 실무 패턴 1: 객체 배열 합계
const cart = [
   { name: '상품1', price: 10000, quantity: 2 },
   { name: '상품2', price: 20000, quantity: 1 },
   { name: '상품3', price: 15000, quantity: 3 },
];

const totalPrice = cart.reduce((sum, item) => {
   return sum + item.price * item.quantity;
}, 0);
console.log('총 가격:', totalPrice); // 75000

// 🔥 실무 패턴 2: 배열을 객체로 변환
const members = ['안유진', '장원영', '가을'];
const memberObj = members.reduce((obj, name, index) => {
   obj[index + 1] = name;
   return obj;
}, {});
console.log('객체 변환:', memberObj); // { 1: '안유진', 2: '장원영', 3: '가을' }

// 🔥 실무 패턴 3: 그룹핑
const students = [
   { name: '학생1', grade: 'A' },
   { name: '학생2', grade: 'B' },
   { name: '학생3', grade: 'A' },
   { name: '학생4', grade: 'C' },
];

const grouped = students.reduce((groups, student) => {
   const grade = student.grade;
   if (!groups[grade]) {
      groups[grade] = [];
   }
   groups[grade].push(student);
   return groups;
}, {});

console.log('성적별 그룹:', grouped);

// 🔥 실무 패턴 4: 중복 카운트
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((counter, fruit) => {
   counter[fruit] = (counter[fruit] || 0) + 1;
   return counter;
}, {});
console.log('과일 개수:', count); // { apple: 3, banana: 2, orange: 1 }

console.log('='.repeat(40));

// ==========================================
// [고급] 고급 배열 메서드
// ==========================================
console.log('\n=== [고급] 고급 배열 메서드 ===');

// --------------------------------------------------------
// 17. some() - 하나라도 조건 만족하면 true ⭐⭐
// --------------------------------------------------------
console.log('--- some() ---');

numbers = [1, 3, 5, 7, 8];

const hasEven = numbers.some((n) => n % 2 === 0);
console.log('짝수 있나?', hasEven); // true (8이 있음)

const hasNegative = numbers.some((n) => n < 0);
console.log('음수 있나?', hasNegative); // false

// 🔥 실무 패턴: 권한 체크
const permissions = ['read', 'write', 'delete'];
const canEdit = permissions.some((p) => p === 'write' || p === 'delete');
console.log('편집 가능?', canEdit); // true

console.log('='.repeat(40));

// --------------------------------------------------------
// 18. every() - 모두 조건 만족하면 true ⭐⭐
// --------------------------------------------------------
console.log('--- every() ---');

const allPositive = numbers.every((n) => n > 0);
console.log('모두 양수?', allPositive); // true

const allEven = numbers.every((n) => n % 2 === 0);
console.log('모두 짝수?', allEven); // false

// 🔥 실무 패턴: 폼 유효성 검사
const formFields = [
   { name: 'username', value: 'user123', valid: true },
   { name: 'email', value: 'test@test.com', valid: true },
   { name: 'password', value: '', valid: false },
];

const isFormValid = formFields.every((field) => field.valid);
console.log('폼 유효?', isFormValid); // false

console.log('='.repeat(40));

// --------------------------------------------------------
// 19. includes() - 특정 값 포함 여부 ⭐⭐⭐
// --------------------------------------------------------
console.log('--- includes() ---');

console.log(iveMembers.includes('안유진')); // true
console.log(iveMembers.includes('코드팩토리')); // false

// 시작 인덱스 지정
console.log(iveMembers.includes('안유진', 1)); // false (인덱스 1부터 검색)

// 🔥 실무 패턴: 권한 체크
const userRoles = ['user', 'editor'];
if (userRoles.includes('admin')) {
   console.log('관리자 권한 있음');
} else {
   console.log('관리자 아님');
}

console.log('='.repeat(40));

// --------------------------------------------------------
// 20. indexOf() / lastIndexOf() - 인덱스 찾기 ⭐
// --------------------------------------------------------
console.log('--- indexOf() ---');

const index = iveMembers.indexOf('장원영');
console.log('장원영 인덱스:', index); // 3

const notFound2 = iveMembers.indexOf('없는멤버');
console.log('없으면:', notFound2); // -1

// 중복된 값이 있을 때
const arr = [1, 2, 3, 2, 4];
console.log('첫 2의 인덱스:', arr.indexOf(2)); // 1
console.log('마지막 2의 인덱스:', arr.lastIndexOf(2)); // 3

console.log('='.repeat(40));

// --------------------------------------------------------
// 21. flat() - 중첩 배열 평탄화 ⭐⭐
// --------------------------------------------------------
console.log('--- flat() ---');

const nest = [1, [2, 3], [4, [5, 6]]];

// 1단계 평탄화
console.log(nest.flat()); // [1, 2, 3, 4, [5, 6]]

// 2단계 평탄화
console.log(nest.flat(2)); // [1, 2, 3, 4, 5, 6]

// 무한 평탄화
console.log(nest.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// 🔥 실무 패턴: 여러 배열 합치기
const arrays = [
   [1, 2],
   [3, 4],
   [5, 6],
];
const flattened = arrays.flat();
console.log('평탄화:', flattened); // [1, 2, 3, 4, 5, 6]

console.log('='.repeat(40));

// --------------------------------------------------------
// 22. flatMap() - map + flat ⭐⭐
// --------------------------------------------------------
console.log('--- flatMap() ---');

const sentences = ['Hello World', 'JavaScript Array'];

// map + flat 따로
const words1 = sentences.map((s) => s.split(' ')).flat();
console.log('map + flat:', words1);

// flatMap (더 효율적)
const words2 = sentences.flatMap((s) => s.split(' '));
console.log('flatMap:', words2);

// 🔥 실무 패턴: 태그 추출
const posts = [
   { title: '포스트1', tags: ['js', 'react'] },
   { title: '포스트2', tags: ['vue', 'css'] },
];

const allTags = posts.flatMap((post) => post.tags);
console.log('모든 태그:', allTags); // ['js', 'react', 'vue', 'css']

console.log('='.repeat(40));

// --------------------------------------------------------
// 23. fill() - 배열 채우기 (원본 변경)
// --------------------------------------------------------
console.log('--- fill() ---');

const arr4 = new Array(5);
arr4.fill(0);
console.log('0으로 채움:', arr4); // [0, 0, 0, 0, 0]

// 범위 지정
const arr5 = [1, 2, 3, 4, 5];
arr5.fill(99, 1, 3); // 인덱스 1~2만 99로
console.log('부분 채움:', arr5); // [1, 99, 99, 4, 5]

console.log('='.repeat(40));

// --------------------------------------------------------
// 24. from() - 유사 배열을 배열로 변환 ⭐
// --------------------------------------------------------
console.log('--- Array.from() ---');

// 문자열 → 배열
const strArr = Array.from('Hello');
console.log('문자열 → 배열:', strArr); // ['H', 'e', 'l', 'l', 'o']

// 범위 생성 (0~9)
const range = Array.from({ length: 10 }, (_, i) => i);
console.log('0~9:', range);

// 1~10
const range2 = Array.from({ length: 10 }, (_, i) => i + 1);
console.log('1~10:', range2);

// 🔥 실무 패턴: NodeList → 배열
// const divs = Array.from(document.querySelectorAll('div'));

console.log('='.repeat(40));

// ==========================================
// [실무] 메서드 체이닝 패턴 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] 메서드 체이닝 ===');

/**
 * 여러 메서드를 연결해서 사용하는 패턴
 * 가장 강력하고 실무에서 많이 사용!
 */

const products2 = [
   {
      id: 1,
      name: '노트북',
      price: 1500000,
      category: '전자기기',
      inStock: true,
   },
   { id: 2, name: '마우스', price: 30000, category: '전자기기', inStock: true },
   {
      id: 3,
      name: '키보드',
      price: 80000,
      category: '전자기기',
      inStock: false,
   },
   {
      id: 4,
      name: '모니터',
      price: 300000,
      category: '전자기기',
      inStock: true,
   },
   { id: 5, name: '의자', price: 200000, category: '가구', inStock: true },
];

// 🔥 패턴 1: 필터 → 맵 → 정렬
const result1 = products2
   .filter((p) => p.inStock) // 재고 있는 것만
   .map((p) => ({ ...p, finalPrice: p.price * 0.9 })) // 10% 할인
   .sort((a, b) => a.finalPrice - b.finalPrice); // 가격순 정렬

console.log('재고 있고 할인된 상품 (가격순):', result1);

// 🔥 패턴 2: 필터 → 맵 → reduce
const totalValue = products2
   .filter((p) => p.category === '전자기기')
   .map((p) => p.price)
   .reduce((sum, price) => sum + price, 0);

console.log('전자기기 총 가격:', totalValue);

// 🔥 패턴 3: 복잡한 데이터 변환
const summary = products2
   .filter((p) => p.inStock)
   .map((p) => p.name)
   .join(', ');

console.log('재고 있는 상품:', summary);

console.log('='.repeat(40));

// ==========================================
// [실무] 핵심 패턴 모음 🔥
// ==========================================
console.log('\n=== [실무] 핵심 패턴 모음 ===');

// 패턴 1: 배열 복사 (얕은 복사)
const original = [1, 2, 3];
const copy1 = [...original]; // ✅ 권장
const copy2 = original.slice(); // ✅ 가능
const copy3 = Array.from(original); // ✅ 가능
console.log('복사 방법들:', copy1, copy2, copy3);

// 패턴 2: 배열 병합
const arr6 = [1, 2];
const arr7 = [3, 4];
const merged3 = [...arr6, ...arr7]; // ✅ 권장
const merged4 = arr6.concat(arr7); // ✅ 가능
console.log('병합:', merged3, merged4);

// 패턴 3: 중복 제거
const withDuplicates = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(withDuplicates)];
console.log('중복 제거:', unique); // [1, 2, 3, 4]

// 패턴 4: 배열의 최댓값/최솟값
const nums = [5, 2, 9, 1, 7];
const maxValue = Math.max(...nums);
const minValue = Math.min(...nums);
console.log('최댓값:', maxValue, '최솟값:', minValue);

// 패턴 5: 조건부 필터링 + 변환
const data = [
   { id: 1, value: 10, active: true },
   { id: 2, value: 20, active: false },
   { id: 3, value: 30, active: true },
];

const activeValues = data
   .filter((item) => item.active)
   .map((item) => item.value);
console.log('활성 값들:', activeValues); // [10, 30]

// 패턴 6: 객체 배열 정렬 (복합 조건)
const people = [
   { name: '김철수', age: 25, city: '서울' },
   { name: '이영희', age: 30, city: '부산' },
   { name: '박민수', age: 25, city: '서울' },
];

// 나이순 → 이름순
people.sort((a, b) => {
   if (a.age !== b.age) return a.age - b.age;
   return a.name.localeCompare(b.name);
});
console.log('복합 정렬:', people);

// 패턴 7: 배열을 객체로 변환 (ID를 키로)
const items2 = [
   { id: 'a', value: 1 },
   { id: 'b', value: 2 },
];

const itemsObj = items2.reduce((obj, item) => {
   obj[item.id] = item;
   return obj;
}, {});
console.log('배열 → 객체:', itemsObj); // { a: {...}, b: {...} }

// 패턴 8: 페이지네이션
function paginate(array, page, perPage) {
   const start = (page - 1) * perPage;
   return array.slice(start, start + perPage);
}

const allItems = Array.from({ length: 25 }, (_, i) => `아이템${i + 1}`);
console.log('1페이지:', paginate(allItems, 1, 10));
console.log('2페이지:', paginate(allItems, 2, 10));

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 2026년 실무에서 가장 많이 쓰는 메서드 TOP 10
 * ==========================================
 *
 * 1위: map() ⭐⭐⭐
 *      - 데이터 변환에 필수
 *      - React 등에서 리스트 렌더링
 *
 * 2위: filter() ⭐⭐⭐
 *      - 조건에 맞는 데이터 추출
 *      - 검색 기능 구현
 *
 * 3위: reduce() ⭐⭐⭐
 *      - 합계, 평균 계산
 *      - 객체 변환, 그룹핑
 *
 * 4위: find() ⭐⭐⭐
 *      - ID로 객체 찾기
 *      - 단일 항목 검색
 *
 * 5위: slice() ⭐⭐⭐
 *      - 배열 복사
 *      - 페이지네이션
 *
 * 6위: sort() ⭐⭐
 *      - 정렬 (비교 함수 필수!)
 *
 * 7위: includes() ⭐⭐
 *      - 값 존재 여부
 *      - 권한 체크
 *
 * 8위: push() ⭐⭐
 *      - 배열 끝에 추가
 *
 * 9위: some() / every() ⭐⭐
 *      - 조건 체크
 *
 * 10위: join() ⭐
 *       - 배열 → 문자열
 *
 * ==========================================
 * 난이도별 정리
 * ==========================================
 *
 * [초급] - 먼저 마스터하기
 * - push(), pop() - 끝에 추가/제거
 * - slice() - 배열 복사
 * - join() - 문자열 변환
 * - includes() - 값 존재 여부
 * - spread (...) - 복사/병합
 *
 * [중급] - 필수 마스터 🔥
 * - map() - 변환 (가장 중요!)
 * - filter() - 필터링 (가장 중요!)
 * - find() - 검색 (가장 중요!)
 * - reduce() - 축약 (어렵지만 중요!)
 * - sort() - 정렬
 *
 * [고급] - 필요할 때 사용
 * - flatMap() - map + flat
 * - some(), every() - 조건 체크
 * - flat() - 평탄화
 * - Array.from() - 배열 생성
 *
 * ==========================================
 * 원본 변경 여부 (중요!)
 * ==========================================
 *
 * ✅ 원본 변경하지 않음 (불변)
 * - map(), filter(), slice(), concat()
 * - reduce(), find(), some(), every()
 * - includes(), join(), flat(), flatMap()
 * → 실무에서 선호 (예측 가능)
 *
 * ⚠️ 원본 변경함 (가변)
 * - push(), pop(), shift(), unshift()
 * - splice(), sort(), reverse(), fill()
 * → 주의해서 사용
 *
 * ==========================================
 * 실무 팁
 * ==========================================
 *
 * 1. map, filter, reduce 조합이 가장 강력
 * 2. 메서드 체이닝으로 가독성 향상
 * 3. 원본 유지가 중요하면 slice() 먼저
 * 4. 객체 배열 정렬 시 비교 함수 필수
 * 5. reduce는 어렵지만 마스터하면 만능
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: map과 forEach의 차이는?
 * A: map은 새 배열 반환, forEach는 반환값 없음
 *
 * Q2: filter와 find의 차이는?
 * A: filter는 배열 반환, find는 단일 요소 반환
 *
 * Q3: reduce로 할 수 있는 것은?
 * A: 합계, 평균, 최댓값, 객체 변환, 그룹핑 등
 *    거의 모든 배열 작업이 가능
 *
 * Q4: 배열 복사 방법은?
 * A: [...arr], arr.slice(), Array.from(arr)
 *    깊은 복사는 JSON.parse(JSON.stringify()) 또는 라이브러리
 *
 * Q5: 원본을 변경하지 않고 정렬하려면?
 * A: [...arr].sort() 또는 arr.slice().sort()
 */

console.log('\n배열 메서드 완벽 정리 끝!');
