/**
 * ==========================================
 * JavaScript Class 완벽 정리 (2026년 최신)
 * ==========================================
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 최신 문법 / 중요 개념 / 면접 포인트
 *
 * [핵심 요약]
 * - Class는 객체를 만들기 위한 설계도(blueprint)처럼 보이지만,
 *   내부적으로는 "함수 + 프로토타입" 기반으로 동작한다. (Syntactic Sugar)
 * - 인스턴스 메서드는 prototype에 올라가 "공유"된다 → 메모리 절약 ✅
 * - class는 strict mode로 동작하고, 선언 전 사용 불가(TDZ) 🔥
 * - #private은 진짜 캡슐화: 클래스 밖에서 절대 접근 불가 🔥
 */

console.clear?.();

// ---------------------------------------------------------------------
// 출력 유틸 (학습용)
// ---------------------------------------------------------------------
const line = (n = 60) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(title);
   console.log(line());
};

section('JS Class - 핵심 + 초/중/고급 + 실무 패턴');

// =====================================================================
// 1) [초급] 클래스 기본 (Declaration) ⭐⭐⭐
// =====================================================================
section('1) [초급] 클래스 기본 (Declaration) ⭐⭐⭐');
{
   class IdolModel {
      // 1) Public Field (ES2022)
      // - 왜? constructor만 봐도 되지만, 필드가 위에 있으면 구조가 한눈에 보임
      name;
      birthYear;
      group;

      // 2) constructor: 인스턴스 생성 시 "한 번" 실행(초기화 담당) 🔥
      constructor(name, birthYear, group) {
         this.name = name;
         this.birthYear = birthYear;
         this.group = group;
      }

      // 3) 메서드: 행동 정의
      // ✅ 인스턴스마다 복사되지 않고 prototype에 올라가서 공유됨(중요!)
      sayHello() {
         return `안녕하세요, 저는 ${this.group}의 ${this.name}입니다.`;
      }

      // Getter: 속성처럼 접근하지만 내부적으로는 함수 실행
      // - 왜? 계산/검증 로직을 숨기면서 API는 깔끔하게 유지 가능
      get age() {
         return new Date().getFullYear() - this.birthYear;
      }
   }

   // 인스턴스 생성
   const yuJin = new IdolModel('안유진', 2003, '아이브');
   const gaEul = new IdolModel('가을', 2002, '아이브');

   console.log(yuJin.sayHello());
   console.log(gaEul.sayHello());
   console.log('안유진 age:', yuJin.age);

   // 🔥 면접 포인트: 클래스의 실체는 "함수"
   console.log('typeof IdolModel:', typeof IdolModel); // function
   console.log('typeof yuJin:', typeof yuJin); // object

   // instanceof: 프로토타입 체인 기준으로 "어떤 클래스에서 만들었는지" 확인
   console.log('yuJin instanceof IdolModel:', yuJin instanceof IdolModel); // true
   console.log('yuJin instanceof Object:', yuJin instanceof Object); // true

   // 🔥 메서드가 prototype에 있다는 증거
   console.log(
      'yuJin.hasOwnProperty("sayHello"):',
      Object.prototype.hasOwnProperty.call(yuJin, 'sayHello'),
   ); // false
   console.log(
      'IdolModel.prototype.hasOwnProperty("sayHello"):',
      Object.prototype.hasOwnProperty.call(IdolModel.prototype, 'sayHello'),
   ); // true

   // 🔥 클래스 메서드는 기본적으로 enumerable: false (for...in에 잘 안 잡힘)
   const desc = Object.getOwnPropertyDescriptor(
      IdolModel.prototype,
      'sayHello',
   );
   console.log('prototype method enumerable?:', desc?.enumerable); // false
}

// =====================================================================
// 2) [초급] 클래스 표현식 (Class Expression)
// =====================================================================
section('2) [초급] 클래스 표현식 (Class Expression)');
{
   // 익명 클래스 표현식
   const AnonymousClass = class {
      constructor(value) {
         this.value = value;
      }
   };

   // 기명 클래스 표현식
   // - 왜 이름을 붙임? 디버깅(스택트레이스)에서 클래스 이름이 보이면 추적이 쉬움
   const NamedClass = class MyClass {
      constructor(value) {
         this.value = value;
      }
      get label() {
         return `value=${this.value}`;
      }
   };

   const a = new AnonymousClass(10);
   const b = new NamedClass(20);

   console.log('Anonymous instance value:', a.value);
   console.log('Named instance label:', b.label);
   console.log('NamedClass name:', NamedClass.name); // MyClass 또는 NamedClass(환경에 따라)
}

// =====================================================================
// 3) [중급] Private 필드/메서드 (#) 🔥🔥🔥
// =====================================================================
section('3) [중급] Private Fields & Methods (#) 🔥🔥🔥');
{
   /**
    * ✅ 왜 #private이 중요한가?
    * - "잔액" 같은 민감 데이터는 외부에서 직접 바꾸면 규칙이 깨짐(버그/보안)
    * - 그래서 내부에서만 변경하고, public 메서드로만 접근하게 만든다(캡슐화)
    */

   class BankAccount {
      owner;
      #balance = 0;
      #password;

      constructor(owner, initialBalance, password) {
         this.owner = owner;
         this.#balance = initialBalance;
         this.#password = password;
      }

      #validatePassword(password) {
         return this.#password === password;
      }

      // 🔥 실무 스타일: 잘못된 입력은 throw → 상위 레이어(UI/서비스)에서 처리
      deposit(amount, password) {
         if (!this.#validatePassword(password))
            throw new Error('비밀번호가 틀렸습니다.');
         if (amount <= 0) throw new Error('입금액은 0보다 커야 합니다.');

         this.#balance += amount;
         return this.#balance;
      }

      withdraw(amount, password) {
         if (!this.#validatePassword(password))
            throw new Error('비밀번호가 틀렸습니다.');
         if (amount <= 0) throw new Error('출금액은 0보다 커야 합니다.');
         if (this.#balance < amount) throw new Error('잔액이 부족합니다.');

         this.#balance -= amount;
         return this.#balance;
      }

      getBalance(password) {
         if (!this.#validatePassword(password))
            throw new Error('비밀번호가 틀렸습니다.');
         return this.#balance;
      }
   }

   const myAccount = new BankAccount('신재준', 10000, '1234');

   // console.log(myAccount.#balance); // ❌ SyntaxError (진짜로 외부 접근 불가)

   try {
      console.log('deposit -> balance:', myAccount.deposit(5000, '1234'));
      console.log('withdraw -> balance:', myAccount.withdraw(3000, '1234'));
      console.log('balance:', myAccount.getBalance('1234'));
      console.log('wrong password:', myAccount.getBalance('0000'));
   } catch (e) {
      console.log('❌ error:', e.message);
   }
}

// =====================================================================
// 4) [중급] Getter / Setter ⭐⭐⭐
// =====================================================================
section('4) [중급] Getter & Setter ⭐⭐⭐');
{
   /**
    * ✅ getter/setter를 쓰는 이유
    * - 외부에서는 "속성처럼" 쓰지만, 내부에서는 검증/가공을 강제할 수 있음
    * - 즉, 쓰레기 데이터가 들어오는 걸 초기에 차단 가능(실무에서 아주 중요)
    */

   class Product {
      #name;
      #price;

      constructor(name, price) {
         this.name = name; // setter로 검증 통일
         this.price = price;
      }

      get name() {
         return this.#name;
      }

      set name(value) {
         if (typeof value !== 'string' || value.trim().length < 2) {
            throw new Error('상품명은 공백 제외 2글자 이상이어야 합니다.');
         }
         this.#name = value.trim();
      }

      get price() {
         return this.#price;
      }

      set price(value) {
         if (typeof value !== 'number' || Number.isNaN(value)) {
            throw new Error('가격은 숫자여야 합니다.');
         }
         if (value < 0) {
            throw new Error('가격은 0 이상이어야 합니다.');
         }
         this.#price = value;
      }

      get priceLabel() {
         return `₩${this.#price.toLocaleString('ko-KR')}`;
      }
   }

   try {
      const laptop = new Product('노트북', 1500000);
      console.log(laptop.name, laptop.priceLabel);

      laptop.price = 1600000;
      console.log('updated:', laptop.priceLabel);

      // laptop.name = '컴'; // ❌ throw
      // laptop.price = -1;  // ❌ throw
   } catch (e) {
      console.log('❌ Product error:', e.message);
   }
}

// =====================================================================
// 5) [고급] 상속 (Inheritance) ⭐⭐⭐ 🔥
// =====================================================================
section('5) [고급] 상속 (extends) + super + 오버라이딩 ⭐⭐⭐ 🔥');
{
   class Animal {
      name;
      age;

      constructor(name, age) {
         this.name = name;
         this.age = age;
      }

      eat() {
         return `${this.name}이(가) 밥을 먹습니다.`;
      }

      sleep() {
         return `${this.name}이(가) 잠을 잡니다.`;
      }
   }

   class Dog extends Animal {
      breed;

      constructor(name, age, breed) {
         // 🔥 super()를 먼저 호출해야 this 사용 가능
         super(name, age);
         this.breed = breed;
      }

      bark() {
         return `${this.name}: 멍멍!`;
      }

      // 오버라이딩: 부모 메서드를 재정의
      eat() {
         return `${super.eat()} (강아지 사료를 먹습니다.)`;
      }
   }

   class Cat extends Animal {
      meow() {
         return `${this.name}: 야옹~`;
      }

      // 완전히 다르게 오버라이딩
      sleep() {
         return `${this.name}이(가) 20시간 동안 잠을 잡니다. 😴`;
      }
   }

   const dog = new Dog('뽀삐', 3, '푸들');
   const cat = new Cat('나비', 2);

   console.log(dog.eat());
   console.log(dog.bark());
   console.log('breed:', dog.breed);

   console.log(cat.meow());
   console.log(cat.sleep());

   // 상속 관계 확인
   console.log('dog instanceof Dog:', dog instanceof Dog);
   console.log('dog instanceof Animal:', dog instanceof Animal);
   console.log('dog instanceof Cat:', dog instanceof Cat);
}

// =====================================================================
// 6) [고급] Static (정적 메서드/필드) ⭐⭐⭐ 🔥
// =====================================================================
section('6) [고급] Static Method & Field ⭐⭐⭐ 🔥');
{
   class MathUtils {
      static PI = 3.141592;
      static version = '1.0.0';

      static add(a, b) {
         return a + b;
      }

      static multiply(a, b) {
         return a * b;
      }

      static getCircleArea(radius) {
         return this.PI * radius ** 2;
      }
   }

   // new 없이 바로 사용
   console.log('PI:', MathUtils.PI);
   console.log('version:', MathUtils.version);
   console.log('add:', MathUtils.add(5, 3));
   console.log('multiply:', MathUtils.multiply(5, 3));
   console.log('area:', MathUtils.getCircleArea(5));
}

// =====================================================================
// 7) [실무] Factory Pattern (팩토리) 🔥🔥🔥
// =====================================================================
section('7) [실무] Factory Pattern (Static Factory) 🔥🔥🔥');
{
   class User {
      #id;
      #name;
      #email;
      #role;

      constructor(id, name, email, role) {
         this.#id = id;
         this.#name = name;
         this.#email = email;
         this.#role = role;
      }

      get info() {
         return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            role: this.#role,
         };
      }

      static #createId(prefix) {
         return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      }

      static createAdmin(name, email) {
         return new User(User.#createId('admin'), name, email, 'admin');
      }

      static createUser(name, email) {
         return new User(User.#createId('user'), name, email, 'user');
      }

      static createGuest() {
         return new User(
            User.#createId('guest'),
            'Guest',
            'guest@example.com',
            'guest',
         );
      }

      // API 응답을 User로 변환
      static fromAPI(apiData) {
         return new User(
            apiData.userId,
            apiData.userName,
            apiData.userEmail,
            apiData.userRole,
         );
      }
   }

   const admin = User.createAdmin('관리자', 'admin@site.com');
   const normalUser = User.createUser('일반유저', 'user@site.com');
   const guest = User.createGuest();

   console.log('관리자:', admin.info);
   console.log('일반유저:', normalUser.info);
   console.log('게스트:', guest.info);

   const apiUser = User.fromAPI({
      userId: 'api_123',
      userName: '안유진',
      userEmail: 'yujin@ive.com',
      userRole: 'member',
   });
   console.log('API 유저:', apiUser.info);
}

// =====================================================================
// 8) [실무] Method Chaining (메서드 체이닝) 🔥🔥
// =====================================================================
section('8) [실무] Method Chaining (return this) 🔥🔥');
{
   class Calculator {
      #value = 0;

      constructor(initialValue = 0) {
         this.#value = initialValue;
      }

      add(num) {
         this.#value += num;
         return this; // ✅ 체이닝 핵심
      }

      subtract(num) {
         this.#value -= num;
         return this;
      }

      multiply(num) {
         this.#value *= num;
         return this;
      }

      divide(num) {
         if (num === 0) throw new Error('0으로 나눌 수 없습니다.');
         this.#value /= num;
         return this;
      }

      reset() {
         this.#value = 0;
         return this;
      }

      get result() {
         return this.#value;
      }
   }

   try {
      const calc = new Calculator(10)
         .add(5) // 15
         .multiply(2) // 30
         .subtract(10) // 20
         .divide(2); // 10

      console.log('계산 결과:', calc.result);

      calc.reset().add(100).multiply(2).divide(4);
      console.log('새로운 결과:', calc.result);
   } catch (e) {
      console.log('❌ calc error:', e.message);
   }
}

// =====================================================================
// 9) [실무] Singleton Pattern (싱글톤) 🔥
// =====================================================================
section('9) [실무] Singleton Pattern (인스턴스 1개만) 🔥');
{
   /**
    * ✅ 싱글톤 용도
    * - 설정 관리, 로거, DB 연결, 앱 전역 상태 같은 "공유 자원"에 사용
    */

   class Database {
      static #instance = null;
      #connected = false;

      constructor() {
         // 외부에서 new로 여러 번 만들어도 1개만 유지
         if (Database.#instance) return Database.#instance;
         Database.#instance = this;
      }

      static getInstance() {
         if (!Database.#instance) Database.#instance = new Database();
         return Database.#instance;
      }

      connect() {
         if (this.#connected) return '이미 연결되어 있습니다.';
         this.#connected = true;
         return '✅ 데이터베이스 연결 성공';
      }

      isConnected() {
         return this.#connected;
      }
   }

   const db1 = Database.getInstance();
   const db2 = Database.getInstance();

   console.log('db1 === db2:', db1 === db2); // true
   console.log(db1.connect());
   console.log('connected?:', db2.isConnected());
}

// =====================================================================
// 10) [실무] 실전 종합 예제 - 쇼핑몰(간단판) 🔥🔥🔥
// =====================================================================
section('10) [실무] 쇼핑몰 시스템 (간단판) 🔥🔥🔥');
{
   class ShopProduct {
      #id;
      #name;
      #price;
      #stock;

      constructor(id, name, price, stock) {
         this.#id = id;
         this.#name = name;
         this.#price = price;
         this.#stock = stock;
      }

      get id() {
         return this.#id;
      }
      get name() {
         return this.#name;
      }
      get price() {
         return this.#price;
      }
      get stock() {
         return this.#stock;
      }

      decreaseStock(quantity) {
         if (quantity <= 0) throw new Error('수량은 1 이상이어야 합니다.');
         if (this.#stock < quantity) throw new Error('재고가 부족합니다.');
         this.#stock -= quantity;
      }

      toJSON() {
         return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            stock: this.#stock,
         };
      }
   }

   class CartItem {
      product;
      quantity;

      constructor(product, quantity) {
         this.product = product;
         this.quantity = quantity;
      }

      get totalPrice() {
         return this.product.price * this.quantity;
      }

      toJSON() {
         return {
            product: this.product.toJSON(),
            quantity: this.quantity,
            totalPrice: this.totalPrice,
         };
      }
   }

   class ShoppingCart {
      #items = [];

      addItem(product, quantity = 1) {
         const existing = this.#items.find(
            (it) => it.product.id === product.id,
         );

         if (existing) {
            existing.quantity += quantity;
            return `✅ ${product.name} 수량 증가 (${existing.quantity}개)`;
         }

         this.#items.push(new CartItem(product, quantity));
         return `✅ ${product.name} 장바구니에 추가됨`;
      }

      get items() {
         return this.#items.map((it) => it.toJSON());
      }

      get totalPrice() {
         return this.#items.reduce((sum, it) => sum + it.totalPrice, 0);
      }

      get itemCount() {
         return this.#items.reduce((sum, it) => sum + it.quantity, 0);
      }

      checkout() {
         if (this.#items.length === 0) {
            return { success: false, error: '장바구니가 비어있습니다.' };
         }

         try {
            // 재고 차감(실패하면 throw)
            this.#items.forEach((it) => it.product.decreaseStock(it.quantity));

            const receipt = {
               items: this.items,
               totalPrice: this.totalPrice,
               itemCount: this.itemCount,
               date: new Date().toISOString(),
            };

            this.#items = [];
            return { success: true, receipt };
         } catch (e) {
            return { success: false, error: e.message };
         }
      }
   }

   const product1 = new ShopProduct('p1', '노트북', 1500000, 10);
   const product2 = new ShopProduct('p2', '마우스', 30000, 50);

   const cart = new ShoppingCart();

   console.log(cart.addItem(product1, 2));
   console.log(cart.addItem(product2, 1));
   console.log(cart.addItem(product1, 1)); // 노트북 총 3개

   console.log('상품 수:', cart.itemCount);
   console.log('총 가격:', `₩${cart.totalPrice.toLocaleString('ko-KR')}`);
   console.log('상품 목록:', cart.items);

   const result = cart.checkout();
   if (result.success) {
      console.log('✅ 결제 성공!');
      console.log('영수증:', result.receipt);
   } else {
      console.log('❌ 결제 실패:', result.error);
   }

   console.log('결제 후 노트북 재고:', product1.stock);
}

// =====================================================================
// 11) [심화] Prototype vs Class: 결국 prototype 🔥
// =====================================================================
section('11) [심화] Prototype vs Class (결국 prototype) 🔥');
{
   // ES5 생성자 함수
   function PersonOld(name) {
      this.name = name;
   }
   PersonOld.prototype.greet = function () {
      return `안녕, 나는 ${this.name}이야(ES5)`;
   };

   // ES6 class
   class PersonNew {
      constructor(name) {
         this.name = name;
      }
      greet() {
         return `안녕, 나는 ${this.name}이야(ES6 class)`;
      }
   }

   const oldPerson = new PersonOld('철수');
   const newPerson = new PersonNew('영희');

   console.log(oldPerson.greet());
   console.log(newPerson.greet());

   // ✅ __proto__ 대신 표준/안전한 방법
   console.log(
      'old proto:',
      Object.getPrototypeOf(oldPerson) === PersonOld.prototype,
   );
   console.log(
      'new proto:',
      Object.getPrototypeOf(newPerson) === PersonNew.prototype,
   );

   // 🔥 클래스도 결국 함수
   console.log('typeof PersonOld:', typeof PersonOld);
   console.log('typeof PersonNew:', typeof PersonNew);
}

// =====================================================================
// 12) 핵심 정리 (복습용)
// =====================================================================
section('12) 핵심 정리 (복습용)');
console.log('1) class는 프로토타입 기반 문법을 편하게 만든 문법(설탕)');
console.log('2) 메서드는 prototype에 올라가 공유됨(인스턴스마다 복사 X)');
console.log('3) #private은 진짜 캡슐화(외부 접근 불가)');
console.log('4) getter/setter로 검증/가공을 강제해 데이터 무결성 유지');
console.log('5) 상속은 강력하지만 결합이 커짐 → 필요하면 조합도 고려');
console.log('6) static은 인스턴스 없이 쓰는 유틸/팩토리에 적합');
console.log('7) factory/singleton/chaining은 실무에서 자주 만나는 패턴');

section('끝!');
console.log('클래스 완벽 정리 끝! ✅');
