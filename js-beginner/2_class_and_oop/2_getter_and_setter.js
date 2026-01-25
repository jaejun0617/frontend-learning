/**
 * ==========================================
 * JavaScript Getter & Setter 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * [핵심 요약]
 * 1. Getter (get): 데이터를 '가져올 때' 사용 (읽기 전용 속성처럼 보임)
 * 2. Setter (set): 데이터를 '바꿀 때' 사용 (검증 로직 추가 가능)
 * 3. 2026년 트렌드: Setter보다는 '불변성(Immutability)'을 선호하는 추세
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 중요 개념
 */

// ==========================================
// [초급] 기본 문법 (Computed Property) ⭐⭐⭐
// ==========================================
console.log('=== [초급] Getter/Setter 기본 ===');

class IdolModel {
   name;
   year;

   constructor(name, year) {
      this.name = name;
      this.year = year;
   }

   /**
    * Getter 🔥
    * - 함수처럼 정의하지만, '속성'처럼 사용 (괄호 () 없음)
    * - 기존 데이터를 가공해서 새로운 값을 반환할 때 유용
    * - 계산된 속성(Computed Property)을 만들 때 사용
    */
   get nameAndYear() {
      return `${this.name}-${this.year}`;
   }

   get age() {
      return new Date().getFullYear() - this.year + 1;
   }

   // Getter는 읽기 전용처럼 동작
   get upperName() {
      return this.name.toUpperCase();
   }

   /**
    * Setter 🔥
    * - 값을 할당(=)할 때 실행
    * - 반드시 파라미터 1개 필요
    * - 검증 로직을 추가할 수 있음
    */
   set setName(name) {
      console.log('Setter 실행됨!');
      this.name = name;
   }
}

const yuJin = new IdolModel('안유진', 2003);

// Getter 사용 - 함수 호출이 아닌 속성 접근처럼
console.log(yuJin.nameAndYear); // 안유진-2003
console.log(yuJin.age); // 22 (2026 기준)
console.log(yuJin.upperName); // 안유진

// Setter 사용 - 할당문처럼
yuJin.setName = '장원영';
console.log(yuJin.name); // 장원영

console.log('='.repeat(40));

// ==========================================
// [초급] 객체 리터럴에서 Getter/Setter
// ==========================================
console.log('\n=== 객체 리터럴에서 사용 ===');

const person = {
   firstName: '재준',
   lastName: '신',

   // Getter
   get fullName() {
      return `${this.lastName}${this.firstName}`;
   },

   // Setter
   set fullName(name) {
      const parts = name.split(' ');
      this.lastName = parts[0];
      this.firstName = parts[1];
   },
};

console.log(person.fullName); // 신재준
person.fullName = '이 영희';
console.log(person.firstName); // 영희
console.log(person.lastName); // 이

console.log('='.repeat(40));

// ==========================================
// [중급] Private 필드와 캡슐화 🔥🔥🔥
// ==========================================
console.log('\n=== [중급] Private 필드와 캡슐화 ===');

/**
 * Getter/Setter의 진짜 용도:
 * - Private 필드를 외부에서 안전하게 접근하도록
 * - 값 변경 시 검증(Validation) 추가
 * - 부작용(Side Effect) 제어
 */

class BankAccount {
   #balance = 0; // Private 필드
   owner;

   constructor(owner, initialBalance) {
      this.owner = owner;
      this.#balance = initialBalance;
   }

   // Getter: 읽기만 가능 (포맷팅 추가)
   get balance() {
      return `₩${this.#balance.toLocaleString()}`;
   }

   // Getter: 숫자로 반환 (계산용)
   get balanceNumber() {
      return this.#balance;
   }

   // Setter: 검증 로직 추가 🔥
   set balance(amount) {
      if (amount < 0) {
         console.log('❌ 잔액은 음수가 될 수 없습니다!');
         return;
      }
      if (amount > 10000000) {
         console.log('❌ 1천만원 이상은 본인 인증이 필요합니다!');
         return;
      }
      console.log(`✅ 잔액을 ${amount}원으로 변경합니다.`);
      this.#balance = amount;
   }

   // 대신 메서드 사용 권장 (명확함)
   deposit(amount) {
      if (amount <= 0) {
         return '❌ 입금액은 0보다 커야 합니다.';
      }
      this.#balance += amount;
      return `✅ ${amount}원 입금 완료. 잔액: ${this.balance}`;
   }

   withdraw(amount) {
      if (amount <= 0) {
         return '❌ 출금액은 0보다 커야 합니다.';
      }
      if (this.#balance < amount) {
         return '❌ 잔액이 부족합니다.';
      }
      this.#balance -= amount;
      return `✅ ${amount}원 출금 완료. 잔액: ${this.balance}`;
   }
}

const account = new BankAccount('신재준', 10000);

console.log(account.balance); // ₩10,000 (Getter)
// console.log(account.#balance); // ❌ SyntaxError (Private)

account.balance = -5000; // ❌ Setter 방어
account.balance = 20000; // ✅ 변경됨
console.log(account.balance); // ₩20,000

// 실무에서는 메서드가 더 명확
console.log(account.deposit(5000));
console.log(account.withdraw(3000));

console.log('='.repeat(40));

// ==========================================
// [중급] Getter로 계산된 속성 만들기 ⭐⭐⭐
// ==========================================
console.log('\n=== Getter로 Computed Property ===');

class Rectangle {
   #width;
   #height;

   constructor(width, height) {
      this.#width = width;
      this.#height = height;
   }

   get width() {
      return this.#width;
   }

   get height() {
      return this.#height;
   }

   // 🔥 계산된 속성 (항상 최신 값 반환)
   get area() {
      return this.#width * this.#height;
   }

   get perimeter() {
      return 2 * (this.#width + this.#height);
   }

   get diagonal() {
      return Math.sqrt(this.#width ** 2 + this.#height ** 2);
   }

   // Setter로 크기 변경
   set width(value) {
      if (value <= 0) {
         console.log('❌ 너비는 양수여야 합니다.');
         return;
      }
      this.#width = value;
   }

   set height(value) {
      if (value <= 0) {
         console.log('❌ 높이는 양수여야 합니다.');
         return;
      }
      this.#height = value;
   }
}

const rect = new Rectangle(10, 20);

console.log('너비:', rect.width); // 10
console.log('높이:', rect.height); // 20
console.log('넓이:', rect.area); // 200
console.log('둘레:', rect.perimeter); // 60
console.log('대각선:', rect.diagonal.toFixed(2)); // 22.36

// 크기 변경하면 자동으로 계산됨
rect.width = 15;
console.log('변경 후 넓이:', rect.area); // 300

console.log('='.repeat(40));

// ==========================================
// [고급] Lazy Getter (성능 최적화) 🔥
// ==========================================
console.log('\n=== Lazy Getter (캐싱) ===');

/**
 * 비용이 큰 계산을 한 번만 하고 캐싱하는 패턴
 * 처음 접근할 때만 계산하고, 이후에는 저장된 값 반환
 */

class ExpensiveCalculation {
   #cache = null;

   get result() {
      // 캐시가 있으면 바로 반환
      if (this.#cache !== null) {
         console.log('캐시에서 반환');
         return this.#cache;
      }

      // 처음에만 계산 (비용이 큰 작업 가정)
      console.log('계산 중...');
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
         sum += i;
      }

      this.#cache = sum;
      return this.#cache;
   }

   // 캐시 초기화
   resetCache() {
      this.#cache = null;
   }
}

const calc = new ExpensiveCalculation();

console.log(calc.result); // 계산 중... → 결과
console.log(calc.result); // 캐시에서 반환 → 결과 (빠름!)
console.log(calc.result); // 캐시에서 반환 → 결과 (빠름!)

console.log('='.repeat(40));

// ==========================================
// [실무] Getter는 OK, Setter는 신중히 🔥🔥🔥
// ==========================================
console.log('\n=== Setter를 기피하는 이유 ===');

/**
 * 2026년 실무 트렌드:
 * ✅ Getter는 자주 사용 (계산된 속성, 포맷팅)
 * ⚠️ Setter는 신중히 사용 (불변성 선호)
 */

// ❌ Setter 방식 (원본 변경 - Mutation)
class MutableIdol {
   #name;
   #age;

   constructor(name, age) {
      this.#name = name;
      this.#age = age;
   }

   get name() {
      return this.#name;
   }

   set name(value) {
      this.#name = value; // 원본 변경!
   }

   get info() {
      return { name: this.#name, age: this.#age };
   }
}

const idol1 = new MutableIdol('안유진', 21);
idol1.name = '장원영'; // 원본이 바뀜
console.log('변경 후:', idol1.info);

// ✅ 불변 방식 (새 객체 생성 - Immutable)
class ImmutableIdol {
   #name;
   #age;

   constructor(name, age) {
      this.#name = name;
      this.#age = age;
   }

   get name() {
      return this.#name;
   }

   get age() {
      return this.#age;
   }

   // Setter 대신 메서드로 새 객체 반환
   withName(newName) {
      return new ImmutableIdol(newName, this.#age);
   }

   withAge(newAge) {
      return new ImmutableIdol(this.#name, newAge);
   }

   toJSON() {
      return { name: this.#name, age: this.#age };
   }
}

const idol2 = new ImmutableIdol('안유진', 21);
const idol3 = idol2.withName('장원영'); // 새 객체 생성

console.log('원본:', idol2.toJSON()); // { name: '안유진', age: 21 }
console.log('새객체:', idol3.toJSON()); // { name: '장원영', age: 21 }
console.log('같은 객체?', idol2 === idol3); // false

console.log('='.repeat(40));

// ==========================================
// [실무] 실전 예제 - User 클래스
// ==========================================
console.log('\n=== 실전 예제: User 클래스 ===');

class User {
   #email;
   #password;
   #createdAt;

   constructor(email, password) {
      this.#email = email;
      this.#password = password;
      this.#createdAt = new Date();
   }

   // Getter: 이메일 (읽기 전용)
   get email() {
      return this.#email;
   }

   // Getter: 마스킹된 이메일
   get maskedEmail() {
      const [local, domain] = this.#email.split('@');
      const masked = local.slice(0, 3) + '***';
      return `${masked}@${domain}`;
   }

   // Getter: 비밀번호 강도 (계산)
   get passwordStrength() {
      const length = this.#password.length;
      if (length < 6) return '약함';
      if (length < 10) return '보통';
      return '강함';
   }

   // Getter: 가입 경과 일수
   get daysSinceCreated() {
      const now = new Date();
      const diff = now - this.#createdAt;
      return Math.floor(diff / (1000 * 60 * 60 * 24));
   }

   // Setter: 비밀번호 변경 (검증 포함)
   changePassword(oldPassword, newPassword) {
      if (this.#password !== oldPassword) {
         return '❌ 기존 비밀번호가 일치하지 않습니다.';
      }
      if (newPassword.length < 6) {
         return '❌ 비밀번호는 6자 이상이어야 합니다.';
      }
      this.#password = newPassword;
      return '✅ 비밀번호가 변경되었습니다.';
   }

   // 객체 변환 (민감 정보 제외)
   toJSON() {
      return {
         email: this.maskedEmail,
         passwordStrength: this.passwordStrength,
         daysSinceCreated: this.daysSinceCreated,
      };
   }
}

const user = new User('yujin@ive.com', 'password123');

console.log('이메일:', user.email); // yujin@ive.com
console.log('마스킹 이메일:', user.maskedEmail); // yuj***@ive.com
console.log('비밀번호 강도:', user.passwordStrength); // 보통
console.log('가입 경과:', `${user.daysSinceCreated}일`);

console.log(user.changePassword('wrong', 'new')); // ❌
console.log(user.changePassword('password123', 'newpass123')); // ✅

console.log('JSON:', user.toJSON());

console.log('='.repeat(40));

// ==========================================
// [실무] Getter/Setter vs 메서드
// ==========================================
console.log('\n=== Getter/Setter vs 메서드 비교 ===');

class Product {
   #price;
   #quantity;

   constructor(price, quantity) {
      this.#price = price;
      this.#quantity = quantity;
   }

   // ✅ Getter: 계산된 값 (적합)
   get total() {
      return this.#price * this.#quantity;
   }

   get formattedTotal() {
      return `₩${this.total.toLocaleString()}`;
   }

   // ❌ Setter: 복잡한 로직 (부적합)
   // set total(value) {
   //    // 가격과 수량 중 뭘 바꿔야 할지 애매함
   // }

   // ✅ 메서드: 명확한 의도 (권장)
   updatePrice(newPrice) {
      if (newPrice < 0) {
         throw new Error('가격은 0 이상이어야 합니다.');
      }
      this.#price = newPrice;
   }

   updateQuantity(newQuantity) {
      if (newQuantity < 0) {
         throw new Error('수량은 0 이상이어야 합니다.');
      }
      this.#quantity = newQuantity;
   }

   increaseQuantity(amount = 1) {
      this.#quantity += amount;
   }

   decreaseQuantity(amount = 1) {
      if (this.#quantity < amount) {
         throw new Error('재고가 부족합니다.');
      }
      this.#quantity -= amount;
   }
}

const product = new Product(10000, 5);

console.log('총 가격:', product.formattedTotal); // ₩50,000

// 메서드로 명확하게 변경
product.updatePrice(12000);
product.increaseQuantity(3);

console.log('변경 후:', product.formattedTotal); // ₩96,000

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 Getter/Setter 사용 가이드 (2026)
 * ==========================================
 *
 * [Getter 사용 시기] ✅ 자주 사용
 *
 * 1. 계산된 속성 (Computed Property)
 *    get fullName() { return `${first} ${last}`; }
 *
 * 2. 포맷팅
 *    get formattedPrice() { return `₩${price}`; }
 *
 * 3. Private 필드 노출 (읽기 전용)
 *    get balance() { return this.#balance; }
 *
 * 4. 파생 데이터
 *    get age() { return 2026 - this.birthYear; }
 *
 * 5. 상태 체크
 *    get isValid() { return this.errors.length === 0; }
 *
 * [Setter 사용 시기] ⚠️ 신중히 사용
 *
 * ✅ 사용해도 되는 경우:
 * - 간단한 검증이 필요할 때
 * - Private 필드 설정 시 필수 검증
 * - 레거시 코드 호환성
 * - 라이브러리/프레임워크 API 제공
 *
 * ❌ 피해야 하는 경우:
 * - 복잡한 로직이 필요할 때 → 메서드 사용
 * - 부작용(Side Effect)이 클 때
 * - 불변성을 유지해야 할 때 (React 등)
 * - 단순 데이터 홀더(DTO)일 때
 *
 * ==========================================
 * 실무 권장사항
 * ==========================================
 *
 * 1. Getter는 자유롭게 사용
 *    - 속성처럼 보이는 계산된 값
 *    - 부작용이 없어야 함 (순수 함수)
 *    - 매번 계산해도 성능 이슈 없어야 함
 *
 * 2. Setter는 최소화
 *    - 검증이 필요한 경우만
 *    - 복잡하면 메서드로 대체
 *    - 이름을 명확하게 (setX보다 updateX)
 *
 * 3. 메서드 선호
 *    updatePrice(price)  // 명확함 ✅
 *    vs
 *    set price(value)    // 애매함 ⚠️
 *
 * 4. 불변성 고려
 *    // Setter 대신
 *    withName(name) {
 *       return new User(name, this.age);
 *    }
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: "Getter와 Setter를 왜 쓰나요?"
 * A: 캡슐화와 데이터 보호를 위해서입니다.
 *    Private 필드를 안전하게 접근하고,
 *    값 설정 시 검증 로직을 추가할 수 있습니다.
 *
 * Q2: "Setter보다 메서드를 선호하는 이유는?"
 * A: 의도가 더 명확하고, 복잡한 로직을 다루기 쉽습니다.
 *    불변성을 유지하는 최신 트렌드와도 맞습니다.
 *
 * Q3: "Getter에 부작용이 있으면 안 되는 이유는?"
 * A: Getter는 '값을 읽는' 행위로 보이므로,
 *    내부적으로 상태를 변경하거나 API를 호출하면
 *    예상치 못한 동작이 발생할 수 있습니다.
 *
 * Q4: "React에서 Setter를 안 쓰는 이유는?"
 * A: React는 불변성을 기반으로 동작합니다.
 *    객체를 직접 변경하면 상태 변화를 감지 못해
 *    리렌더링이 안 될 수 있습니다.
 *
 * Q5: "Private 필드 없이 Getter/Setter만 있으면?"
 * A: 의미가 없습니다. 그냥 public 필드와 같습니다.
 *    Getter/Setter의 진가는 Private과 함께 쓸 때 나옵니다.
 */

console.log('\nGetter/Setter 완벽 정리 끝!');
