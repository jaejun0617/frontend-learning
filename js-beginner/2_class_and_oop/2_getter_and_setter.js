/**
 * =====================================================================
 * 2_getter_and_setter.js - Getter & Setter (학습 + 실무 템플릿)
 * =====================================================================
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 중요/최신/면접 포인트
 *
 * ---------------------------------------------------------------------
 * ✅ 핵심정리 (먼저 보고 시작) 🔥
 * ---------------------------------------------------------------------
 * 1) Getter(get): "읽기"처럼 보이지만 내부적으로는 함수 실행(가공/계산) ⭐
 * 2) Setter(set): "할당"처럼 보이지만 내부적으로 검증/변환/부작용 가능 → 신중 ⭐🔥
 * 3) 실무 트렌드: Setter 남발 ❌  → 메서드(update/change) 또는 불변(immutable) 선호 ⭐🔥
 * 4) Getter는 가능한 "순수"하게(상태 변경/네트워크 호출 X) 🔥
 * 5) Private(#) + Getter 조합이 진짜 가치(캡슐화) ⭐🔥
 */

console.clear?.();

// ---------------------------------------------------------------------
// 출력 유틸
// ---------------------------------------------------------------------
const line = (n = 60) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(title);
   console.log(line());
};

section('Getter & Setter - 학습 + 실무 템플릿');

// =====================================================================
// [초급] 1) 기본 문법: Getter/Setter는 "속성처럼" 쓰는 메서드 ⭐⭐⭐
// =====================================================================
section('[초급] 1) Getter/Setter 기본 ⭐⭐⭐');
{
   class IdolModel {
      name;
      birthYear;

      constructor(name, birthYear) {
         this.name = name;
         this.birthYear = birthYear;
      }

      /**
       * Getter 🔥
       * - 왜 쓰나?
       *   "데이터를 읽는" 코드를 깔끔하게 만들면서
       *   내부적으로는 가공/계산 로직을 숨길 수 있다.
       */
      get nameAndYear() {
         return `${this.name}-${this.birthYear}`;
      }

      get age() {
         // ✅ 하드코딩(2026) 금지: 실행 시점 기준으로 항상 최신
         return new Date().getFullYear() - this.birthYear;
      }

      get upperName() {
         return this.name.toUpperCase();
      }

      /**
       * Setter 🔥
       * - 왜 신중해야 하나?
       *   obj.name = '...'처럼 "단순 할당"으로 보이는데
       *   내부에서 검증/변환/부작용이 일어나면 예측이 어려워진다.
       */
      set rename(nextName) {
         if (typeof nextName !== 'string' || nextName.trim().length < 2) {
            console.log('❌ 이름은 공백 제외 2글자 이상이어야 합니다.');
            return;
         }
         this.name = nextName.trim();
      }
   }

   const yuJin = new IdolModel('안유진', 2003);

   console.log('nameAndYear:', yuJin.nameAndYear);
   console.log('age:', yuJin.age);
   console.log('upperName:', yuJin.upperName);

   // Setter는 "할당" 문법으로 호출됨
   yuJin.rename = '장원영';
   console.log('renamed:', yuJin.name);
}

// =====================================================================
// [초급] 2) 객체 리터럴에서도 사용 가능
// =====================================================================
section('[초급] 2) 객체 리터럴 Getter/Setter');
{
   const person = {
      firstName: '재준',
      lastName: '신',

      get fullName() {
         // ⭐ 왜 getter가 좋나?
         // - 사용자는 person.fullName만 보면 되고, 내부 결합 규칙은 숨긴다.
         return `${this.lastName}${this.firstName}`;
      },

      set fullName(value) {
         // 🔥 setter는 "들어오는 데이터"를 정제하는 용도로 제한적으로 사용
         const parts = String(value).trim().split(' ');
         this.lastName = parts[0] ?? this.lastName;
         this.firstName = parts[1] ?? this.firstName;
      },
   };

   console.log('fullName:', person.fullName);
   person.fullName = '이 영희';
   console.log('after set:', person.fullName);
}

// =====================================================================
// [중급] 3) Private(#) + Getter: 캡슐화의 핵심 ⭐🔥
// =====================================================================
section('[중급] 3) Private + Getter (캡슐화) ⭐🔥');
{
   /**
    * ✅ 실무에서 Getter/Setter의 "진짜" 가치
    * - private 필드를 외부에 안전하게 노출
    * - 읽기(조회)는 getter
    * - 변경은 보통 "메서드"(deposit/withdraw)로 명확하게
    */

   class BankAccount {
      owner;
      #balance = 0;

      constructor(owner, initialBalance) {
         this.owner = owner;
         this.#balance = initialBalance;
      }

      // ⭐ getter: 읽기 전용 + 포맷팅
      get balanceLabel() {
         return `₩${this.#balance.toLocaleString('ko-KR')}`;
      }

      // ⭐ getter: 계산/로직용 숫자
      get balance() {
         return this.#balance;
      }

      // ⚠️ setter로 잔액을 직접 바꾸는 건 실무에서 지양하는 편
      // - 왜? 잔액 변경은 규칙이 많고(검증/이력/로그), 의도도 애매해짐

      deposit(amount) {
         if (amount <= 0) throw new Error('입금액은 0보다 커야 합니다.');
         this.#balance += amount;
         return this.balanceLabel;
      }

      withdraw(amount) {
         if (amount <= 0) throw new Error('출금액은 0보다 커야 합니다.');
         if (this.#balance < amount) throw new Error('잔액이 부족합니다.');
         this.#balance -= amount;
         return this.balanceLabel;
      }
   }

   const account = new BankAccount('신재준', 10000);
   console.log('balanceLabel:', account.balanceLabel);

   try {
      console.log('deposit:', account.deposit(5000));
      console.log('withdraw:', account.withdraw(3000));
      console.log('balance(number):', account.balance);
   } catch (e) {
      console.log('❌ error:', e.message);
   }
}

// =====================================================================
// [중급] 4) Getter로 Computed Property 만들기 ⭐⭐⭐
// =====================================================================
section('[중급] 4) Getter로 Computed Property ⭐⭐⭐');
{
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

      // 🔥 computed property: 내부 값이 바뀌면 항상 최신 값 반환
      get area() {
         return this.#width * this.#height;
      }

      get perimeter() {
         return 2 * (this.#width + this.#height);
      }

      // ⚠️ setter는 "검증" 정도까지만(부작용 최소화)
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
   console.log('area:', rect.area); // 200

   rect.width = 15;
   console.log('area(after width=15):', rect.area); // 300
}

// =====================================================================
// [고급] 5) Lazy Getter(캐싱)로 성능 최적화 🔥
// =====================================================================
section('[고급] 5) Lazy Getter (캐싱) 🔥');
{
   /**
    * ✅ Lazy Getter 패턴
    * - 왜?
    *   계산 비용이 큰 값은 매번 계산하면 느려짐
    *   최초 1번만 계산하고 캐시해 두면 빠름
    *
    * ⚠️ 주의
    * - 캐시가 "언제 무효화"되는지 정책이 필요
    */

   class ExpensiveCalculation {
      #cache = null;

      get result() {
         if (this.#cache !== null) {
            console.log('캐시에서 반환');
            return this.#cache;
         }

         console.log('계산 중...');
         let sum = 0;
         for (let i = 0; i < 1000000; i++) sum += i;

         this.#cache = sum;
         return this.#cache;
      }

      resetCache() {
         this.#cache = null;
      }
   }

   const calc = new ExpensiveCalculation();
   console.log(calc.result);
   console.log(calc.result);
}

// =====================================================================
// [실무패턴] 6) Getter는 OK, Setter는 신중 (불변성 선호) ⭐🔥
// =====================================================================
section('[실무패턴] 6) Getter OK / Setter 신중 (불변성) ⭐🔥');
{
   // ❌ Mutable: setter로 원본 변경(예상치 못한 변경 전파 가능)
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
   idol1.name = '장원영';
   console.log('mutable changed:', idol1.info);

   // ✅ Immutable: setter 대신 "새 객체 반환" 메서드
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

      withName(nextName) {
         // ⭐ 왜?
         // - 원본을 건드리지 않아서 React/상태관리에서 안전
         return new ImmutableIdol(nextName, this.#age);
      }

      withAge(nextAge) {
         return new ImmutableIdol(this.#name, nextAge);
      }

      toJSON() {
         return { name: this.#name, age: this.#age };
      }
   }

   const idol2 = new ImmutableIdol('안유진', 21);
   const idol3 = idol2.withName('장원영');

   console.log('original:', idol2.toJSON());
   console.log('new:', idol3.toJSON());
   console.log('same object?:', idol2 === idol3); // false
}

// =====================================================================
// [실무패턴] 7) 실전 예제: User (getter는 파생값/포맷팅, 변경은 메서드) ⭐⭐⭐
// =====================================================================
section('[실무패턴] 7) 실전 예제: User 클래스 ⭐⭐⭐');
{
   class User {
      #email;
      #password;
      #createdAt;

      constructor(email, password) {
         this.#email = email;
         this.#password = password;
         this.#createdAt = new Date();
      }

      // ⭐ getter: 읽기 전용
      get email() {
         return this.#email;
      }

      // ⭐ getter: 파생 데이터(마스킹)
      get maskedEmail() {
         const [local, domain] = this.#email.split('@');
         const masked = (local?.slice(0, 3) ?? '') + '***';
         return `${masked}@${domain ?? ''}`;
      }

      // ⭐ getter: 계산된 값
      get passwordStrength() {
         const length = this.#password.length;
         if (length < 6) return '약함';
         if (length < 10) return '보통';
         return '강함';
      }

      get daysSinceCreated() {
         const diffMs = Date.now() - this.#createdAt.getTime();
         return Math.floor(diffMs / (1000 * 60 * 60 * 24));
      }

      // ✅ 변경은 메서드로(의도 명확)
      changePassword(oldPassword, newPassword) {
         if (this.#password !== oldPassword)
            return '❌ 기존 비밀번호가 일치하지 않습니다.';
         if (newPassword.length < 6)
            return '❌ 비밀번호는 6자 이상이어야 합니다.';
         this.#password = newPassword;
         return '✅ 비밀번호가 변경되었습니다.';
      }

      toJSON() {
         // 민감 정보(password)는 노출 금지
         return {
            email: this.maskedEmail,
            passwordStrength: this.passwordStrength,
            daysSinceCreated: this.daysSinceCreated,
         };
      }
   }

   const user = new User('yujin@ive.com', 'password123');

   console.log('email:', user.email);
   console.log('maskedEmail:', user.maskedEmail);
   console.log('strength:', user.passwordStrength);
   console.log('days:', user.daysSinceCreated);

   console.log(user.changePassword('wrong', 'new')); // 실패
   console.log(user.changePassword('password123', 'newpass123')); // 성공

   console.log('json:', user.toJSON());
}

// =====================================================================
// [실무패턴] 8) Getter/Setter vs 메서드: "의도"가 기준 ⭐⭐⭐
// =====================================================================
section('[실무패턴] 8) Getter/Setter vs 메서드(의도 기준) ⭐⭐⭐');
{
   class Product {
      #price;
      #quantity;

      constructor(price, quantity) {
         this.#price = price;
         this.#quantity = quantity;
      }

      // ✅ Getter는 "계산된 값"에 적합
      get total() {
         return this.#price * this.#quantity;
      }

      get formattedTotal() {
         return `₩${this.total.toLocaleString('ko-KR')}`;
      }

      // ✅ 변경은 메서드로(의도 명확)
      updatePrice(nextPrice) {
         if (nextPrice < 0) throw new Error('가격은 0 이상이어야 합니다.');
         this.#price = nextPrice;
      }

      updateQuantity(nextQty) {
         if (nextQty < 0) throw new Error('수량은 0 이상이어야 합니다.');
         this.#quantity = nextQty;
      }

      increaseQuantity(amount = 1) {
         this.#quantity += amount;
      }

      decreaseQuantity(amount = 1) {
         if (this.#quantity < amount) throw new Error('재고가 부족합니다.');
         this.#quantity -= amount;
      }
   }

   const product = new Product(10000, 5);
   console.log('total:', product.formattedTotal);

   product.updatePrice(12000);
   product.increaseQuantity(3);
   console.log('after:', product.formattedTotal);
}

// =====================================================================
// [핵심정리] 10~12개 복습 체크포인트 ✅
// =====================================================================
section('[핵심정리] 복습 체크포인트 ✅');
console.log('1) Getter는 "속성처럼" 보이지만 내부적으로 함수 실행이다. ⭐');
console.log('2) Getter는 계산/가공/포맷팅(파생 데이터)에 특히 잘 맞는다. ⭐');
console.log('3) Getter는 가능한 순수하게(상태 변경/네트워크 호출 X) 🔥');
console.log(
   '4) Setter는 할당처럼 보여서, 복잡 로직/부작용이 있으면 위험하다. 🔥',
);
console.log(
   '5) Setter는 "간단한 검증/정제" 정도에서만 제한적으로 사용하자. ⭐',
);
console.log('6) Private(#) + Getter 조합이 캡슐화의 핵심이다. ⭐🔥');
console.log(
   '7) 중요한 변경(잔액/권한/비밀번호)은 setter보다 메서드가 명확하다. ⭐',
);
console.log('8) 불변성(immutable)은 상태관리/React에서 특히 안정적이다. ⭐🔥');
console.log(
   '9) computed property(get area)는 항상 최신 값을 제공해 UI/로직이 깔끔해진다. ⭐',
);
console.log('10) Lazy getter는 비용 큰 계산을 캐싱해서 성능을 올린다. 🔥');
console.log(
   '11) public API는 읽기(getter) / 변경(method)로 나누면 예측이 쉬워진다. ⭐',
);
console.log('12) 결론: Getter는 적극, Setter는 최소, 복잡하면 메서드로. ⭐🔥');

section('끝!');
console.log('Getter/Setter 템플릿 정리 완료 ✅');
