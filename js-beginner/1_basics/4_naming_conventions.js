/**
 * ==========================================
 * JavaScript Naming Conventions
 * ==========================================
 */

// ==========================================
// 1. 변수명 작성 규칙 (Rules)
// ==========================================
/**
 * [필수 규칙]
 * 1) 영어 알파벳, 숫자 사용 가능
 * 2) 특수문자는 $, _ 만 사용 가능
 * 3) 숫자로 시작할 수 없음
 * 4) 예약어(키워드) 사용 불가
 * 5) 공백 사용 불가
 */

// ✅ 올바른 예시
let codeFactory = '코드팩토리';
var $ive = '아이브';
const _yuJin = '안유진';
let name123 = '이름';
let $price = 1000;
let _temp = 'temporary';

console.log(codeFactory);
console.log($ive);
console.log(_yuJin);

// ❌ 잘못된 예시
// let 1name = 'no';           // 숫자로 시작 불가
// let const = 'attention';    // 예약어 사용 불가
// let my-name = '이름';       // 하이픈 사용 불가
// let my name = '이름';       // 공백 사용 불가
// let function = 'func';      // 예약어 사용 불가

console.log('='.repeat(40));

// ==========================================
// 2. 명명 컨벤션 (Naming Conventions)
// ==========================================

// 2-1. camelCase (카멜 케이스)
/**
 * - 가장 일반적으로 사용
 * - 첫 단어는 소문자, 이후 단어의 첫 글자는 대문자
 * - JavaScript, Java에서 주로 사용
 * - 변수명, 함수명에 사용
 */
const anYuJin = '안유진';
const userEmail = 'user@example.com';
const maxCount = 100;
let isLoggedIn = true;

function getUserInfo() {
   return 'user info';
}

console.log(anYuJin);

// 2-2. snake_case (스네이크 케이스)
/**
 * - 단어 사이를 언더스코어(_)로 연결
 * - Python, Ruby에서 주로 사용
 * - JavaScript에서는 일반적으로 사용하지 않음
 */
const an_yu_jin = '안유진';
const user_email = 'user@example.com';
const max_count = 100;

console.log(an_yu_jin);

// 2-3. PascalCase (파스칼 케이스)
/**
 * - 모든 단어의 첫 글자를 대문자로
 * - C#, .NET에서 주로 사용
 * - JavaScript에서는 클래스명, 생성자 함수에 사용
 */
const AnYuJin = '안유진';
class UserProfile {
   constructor(name) {
      this.name = name;
   }
}

function CreateUser() {
   // 생성자 함수
}

console.log(AnYuJin);

// 2-4. SCREAMING_SNAKE_CASE (상수용)
/**
 * - 모든 글자를 대문자로, 단어 사이는 언더스코어
 * - 상수(변하지 않는 값)에 사용
 */
const API_URL = 'https://api.example.com';
const MAX_USER_COUNT = 100;
const DB_PASSWORD = 'password123';

console.log(API_URL);

console.log('='.repeat(40));

// ==========================================
// 3. JavaScript 권장 컨벤션
// ==========================================
/**
 * ✅ 권장 사항
 * - 변수/함수: camelCase
 * - 클래스/생성자: PascalCase
 * - 상수: SCREAMING_SNAKE_CASE
 * - Private 변수: _privateVariable (언더스코어 접두사)
 * - 의미있는 이름 사용
 * - 약어보다는 전체 단어 사용
 */

// 변수명
let userName = '신재준';
let totalPrice = 5000;
let isActive = true;

// 함수명 (동사로 시작하는 것이 좋음)
function getUserName() {}
function calculateTotal() {}
function isValidEmail() {}

// 클래스명 (명사)
class User {}
class ProductManager {}

// 상수
const MAX_LENGTH = 100;
const API_BASE_URL = 'https://api.com';

// Private 변수 (관습적 표기)
class MyClass {
   constructor() {
      this._privateVar = 'private';
      this.publicVar = 'public';
   }
}

console.log('='.repeat(40));

// ==========================================
// 4. 좋은 변수명 vs 나쁜 변수명
// ==========================================

// ❌ 나쁜 예시
let a = 30;
let x = 'user@email.com';
let temp = true;
let data = [1, 2, 3];

// ✅ 좋은 예시
let userAge = 30;
// let userEmail = 'user@email.com';
// let isLoggedIn = true;
let productPrices = [1000, 2000, 3000];

// Boolean 변수는 is, has, can 등으로 시작
let isValid = true;
let hasPermission = false;
let canEdit = true;

// 배열은 복수형으로
let users = ['안유진', '장원영'];
let products = ['상품1', '상품2'];

// 함수는 동사로 시작
function getUser() {}
function setPassword() {}
function checkValidation() {}
function calculateTotal() {}
