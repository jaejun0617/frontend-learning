/**
 * ==========================================
 * JavaScript Class 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 최신 문법 / 중요 개념
 *
 * [핵심 요약]
 * - Class는 객체를 만들기 위한 '설계도(Blueprint)'
 * - 내부적으로는 '함수(Function)'와 '프로토타입(Prototype)'으로 동작
 * - ES6(2015)에서 추가된 문법적 설탕(Syntactic Sugar)
 */

// ==========================================
// [초급] 클래스의 기본 (Declaration) ⭐⭐⭐
// ==========================================
console.log('=== [초급] 클래스 기본 ===');

class IdolModel {
   // 1. 필드 선언 (Public Field - ES2022)
   name;
   year;
   group;

   // 2. 생성자 (Constructor) - 초기화 담당 🔥
   constructor(name, year, group) {
      this.name = name;
      this.year = year;
      this.group = group;
      console.log(`${name} 인스턴스 생성됨!`);
   }

   // 3. 메서드 (Method) - 행동 정의
   sayName() {
      return `안녕하세요, 저는 ${this.group}의 ${this.name}입니다.`;
   }

   // 4. 메서드도 여러 개 정의 가능
   getAge() {
      return new Date().getFullYear() - this.year + 1;
   }
}

// 인스턴스(Instance) 생성
const yuJin = new IdolModel('안유진', 2003, '아이브');
const gaEul = new IdolModel('가을', 2002, '아이브');

console.log(yuJin.sayName()); // 안녕하세요, 저는 아이브의 안유진입니다.
console.log(gaEul.sayName());
console.log(`안유진 나이: ${yuJin.getAge()}세`);

// ⚠️ 클래스의 실체는 '함수'! (면접 단골 질문)
console.log(typeof IdolModel); // function
console.log(typeof yuJin); // object

// 인스턴스 확인
console.log(yuJin instanceof IdolModel); // true
console.log(yuJin instanceof Object); // true

console.log('='.repeat(40));

// ==========================================
// [초급] 클래스 표현식
// ==========================================
console.log('--- 클래스 표현식 ---');

// 익명 클래스 표현식
const AnonymousClass = class {
   constructor(value) {
      this.value = value;
   }
};

// 기명 클래스 표현식
const NamedClass = class MyClass {
   constructor(value) {
      this.value = value;
      console.log(MyClass.name); // MyClass
   }
};

const instance1 = new AnonymousClass(10);
const instance2 = new NamedClass(20);

console.log('='.repeat(40));

// ==========================================
// [중급] Private 필드와 메서드 🔥🔥🔥
// ==========================================
console.log('\n=== [중급] Private Fields & Methods ===');

/**
 * 2026년 표준: Private 필드/메서드 (#)
 * - 클래스 외부에서 절대 접근 불가
 * - 캡슐화(Encapsulation)의 핵심
 */

class BankAccount {
   // Public 필드
   owner;

   // Private 필드 🔥
   #balance = 0;
   #password;

   constructor(owner, initialBalance, password) {
      this.owner = owner;
      this.#balance = initialBalance;
      this.#password = password;
   }

   // Private 메서드 🔥
   #validatePassword(password) {
      return this.#password === password;
   }

   // Public 메서드
   deposit(amount, password) {
      if (!this.#validatePassword(password)) {
         return '❌ 비밀번호가 틀렸습니다.';
      }
      this.#balance += amount;
      return `✅ ${amount}원 입금 완료. 잔액: ${this.#balance}원`;
   }

   withdraw(amount, password) {
      if (!this.#validatePassword(password)) {
         return '❌ 비밀번호가 틀렸습니다.';
      }
      if (this.#balance < amount) {
         return '❌ 잔액이 부족합니다.';
      }
      this.#balance -= amount;
      return `✅ ${amount}원 출금 완료. 잔액: ${this.#balance}원`;
   }

   // Getter: 잔액 조회 (읽기 전용)
   getBalance(password) {
      if (!this.#validatePassword(password)) {
         return '❌ 비밀번호가 틀렸습니다.';
      }
      return `현재 잔액: ${this.#balance}원`;
   }
}

const myAccount = new BankAccount('신재준', 10000, '1234');

console.log(myAccount.owner); // 신재준 (Public)
// console.log(myAccount.#balance); // ❌ SyntaxError: Private field
// console.log(myAccount.#password); // ❌ SyntaxError

console.log(myAccount.deposit(5000, '1234')); // ✅ 입금 성공
console.log(myAccount.withdraw(3000, '1234')); // ✅ 출금 성공
console.log(myAccount.getBalance('1234')); // 현재 잔액: 12000원
console.log(myAccount.withdraw(3000, 'wrong')); // ❌ 비밀번호 틀림

console.log('='.repeat(40));

// ==========================================
// [중급] Getter와 Setter ⭐⭐⭐
// ==========================================
console.log('\n=== [중급] Getter & Setter ===');

class Product {
   #price;
   #name;

   constructor(name, price) {
      this.#name = name;
      this.#price = price;
   }

   // Getter: 속성처럼 접근 (메서드지만 괄호 없이 호출)
   get price() {
      return `₩${this.#price.toLocaleString()}`;
   }

   get name() {
      return this.#name;
   }

   // Setter: 값 설정 시 유효성 검사
   set price(value) {
      if (value < 0) {
         console.log('❌ 가격은 0 이상이어야 합니다.');
         return;
      }
      this.#price = value;
   }

   set name(value) {
      if (value.length < 2) {
         console.log('❌ 상품명은 2글자 이상이어야 합니다.');
         return;
      }
      this.#name = value;
   }
}

const laptop = new Product('노트북', 1500000);

// Getter 사용 (속성처럼 접근)
console.log(laptop.name); // 노트북
console.log(laptop.price); // ₩1,500,000

// Setter 사용 (할당처럼 사용)
laptop.price = 1600000; // 정상 변경
console.log(laptop.price); // ₩1,600,000

laptop.price = -1000; // ❌ 가격은 0 이상이어야 합니다.
laptop.name = '컴'; // 정상 변경

console.log('='.repeat(40));

// ==========================================
// [고급] 상속 (Inheritance) ⭐⭐⭐ 🔥
// ==========================================
console.log('\n=== [고급] 상속 (extends) ===');

/**
 * extends: 부모 클래스의 기능을 물려받음
 * super: 부모 클래스 참조
 */

// 부모 클래스 (Base Class / Super Class)
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

// 자식 클래스 (Derived Class / Sub Class)
class Dog extends Animal {
   breed; // 품종

   constructor(name, age, breed) {
      // 🔥 super()를 먼저 호출해야 this 사용 가능!
      super(name, age); // 부모 생성자 호출
      this.breed = breed;
   }

   // 새로운 메서드 추가
   bark() {
      return `${this.name}: 멍멍!`;
   }

   // 메서드 오버라이딩 (부모 메서드 재정의)
   eat() {
      // super로 부모 메서드 호출 가능
      return `${super.eat()} (강아지 사료를 먹습니다.)`;
   }
}

class Cat extends Animal {
   constructor(name, age) {
      super(name, age);
   }

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

console.log(dog.eat()); // 뽀삐이(가) 밥을 먹습니다. (강아지 사료를 먹습니다.)
console.log(dog.bark()); // 뽀삐: 멍멍!
console.log(dog.breed); // 푸들

console.log(cat.meow()); // 나비: 야옹~
console.log(cat.sleep()); // 나비이(가) 20시간 동안 잠을 잡니다. 😴

// 상속 관계 확인
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Cat); // false

console.log('='.repeat(40));

// ==========================================
// [고급] Static (정적 메서드/필드) ⭐⭐⭐ 🔥
// ==========================================
console.log('\n=== [고급] Static Method & Field ===');

/**
 * static: 인스턴스 없이 클래스 자체에서 호출
 * - 유틸리티 함수
 * - 팩토리 메서드
 * - 설정값
 */

class MathUtils {
   // Static 필드
   static PI = 3.141592;
   static version = '1.0.0';

   // Static 메서드
   static add(a, b) {
      return a + b;
   }

   static multiply(a, b) {
      return a * b;
   }

   static getCircleArea(radius) {
      return this.PI * radius ** 2; // this는 클래스 자체
   }
}

// new 없이 바로 사용
console.log(MathUtils.PI); // 3.141592
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.getCircleArea(5)); // 78.5398

// ❌ 인스턴스에서는 사용 불가
// const utils = new MathUtils();
// console.log(utils.add(1, 2)); // undefined

console.log('='.repeat(40));

// ==========================================
// [실무] Factory Pattern (팩토리 패턴) 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] Factory Pattern ===');

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

   // 🔥 Static Factory Method: 다양한 방식으로 인스턴스 생성
   static createAdmin(name, email) {
      const id = `admin_${Date.now()}`;
      return new User(id, name, email, 'admin');
   }

   static createUser(name, email) {
      const id = `user_${Date.now()}`;
      return new User(id, name, email, 'user');
   }

   static createGuest() {
      const id = `guest_${Date.now()}`;
      return new User(id, 'Guest', 'guest@example.com', 'guest');
   }

   // API 응답을 User 객체로 변환
   static fromAPI(apiData) {
      return new User(
         apiData.userId,
         apiData.userName,
         apiData.userEmail,
         apiData.userRole,
      );
   }
}

// 팩토리 메서드로 쉽게 생성
const admin = User.createAdmin('관리자', 'admin@site.com');
const normalUser = User.createUser('일반유저', 'user@site.com');
const guest = User.createGuest();

console.log('관리자:', admin.info);
console.log('일반유저:', normalUser.info);
console.log('게스트:', guest.info);

// API 응답 변환
const apiResponse = {
   userId: 'api_123',
   userName: '안유진',
   userEmail: 'yujin@ive.com',
   userRole: 'member',
};
const apiUser = User.fromAPI(apiResponse);
console.log('API 유저:', apiUser.info);

console.log('='.repeat(40));

// ==========================================
// [실무] Method Chaining (메서드 체이닝) 🔥🔥
// ==========================================
console.log('\n=== [실무] Method Chaining ===');

class Calculator {
   #value = 0;

   constructor(initialValue = 0) {
      this.#value = initialValue;
   }

   add(num) {
      this.#value += num;
      return this; // this를 반환하면 체이닝 가능!
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
      if (num === 0) {
         console.log('❌ 0으로 나눌 수 없습니다.');
         return this;
      }
      this.#value /= num;
      return this;
   }

   get result() {
      return this.#value;
   }

   reset() {
      this.#value = 0;
      return this;
   }
}

// 🔥 체이닝으로 연속 계산
const calc = new Calculator(10);
const result = calc
   .add(5) // 15
   .multiply(2) // 30
   .subtract(10) // 20
   .divide(2).result; // 10

console.log('계산 결과:', result); // 10

// 새로운 계산
calc.reset().add(100).multiply(2).divide(4);
console.log('새로운 결과:', calc.result); // 50

console.log('='.repeat(40));

// ==========================================
// [실무] Singleton Pattern (싱글톤 패턴) 🔥
// ==========================================
console.log('\n=== [실무] Singleton Pattern ===');

/**
 * 싱글톤: 클래스의 인스턴스를 단 하나만 만들도록 제한
 * 용도: 설정 관리, 데이터베이스 연결, 로거 등
 */

class Database {
   static #instance = null;
   #connected = false;

   // Private 생성자 (외부에서 new 불가능하게)
   constructor() {
      if (Database.#instance) {
         return Database.#instance;
      }
      Database.#instance = this;
   }

   // 싱글톤 인스턴스 얻기
   static getInstance() {
      if (!Database.#instance) {
         Database.#instance = new Database();
      }
      return Database.#instance;
   }

   connect() {
      if (this.#connected) {
         return '이미 연결되어 있습니다.';
      }
      this.#connected = true;
      return '✅ 데이터베이스 연결 성공';
   }

   disconnect() {
      this.#connected = false;
      return '✅ 연결 해제';
   }

   isConnected() {
      return this.#connected;
   }
}

// 같은 인스턴스를 공유
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true (같은 객체!)

console.log(db1.connect()); // ✅ 데이터베이스 연결 성공
console.log(db2.connect()); // 이미 연결되어 있습니다.
console.log(db1.isConnected()); // true
console.log(db2.isConnected()); // true (같은 인스턴스니까)

console.log('='.repeat(40));

// ==========================================
// [실무] 실전 종합 예제 - 쇼핑몰 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] 쇼핑몰 시스템 ===');

// 상품 클래스
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
      if (this.#stock < quantity) {
         throw new Error('재고가 부족합니다.');
      }
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

// 장바구니 아이템
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

// 장바구니
class ShoppingCart {
   #items = [];

   addItem(product, quantity = 1) {
      // 이미 있는 상품인지 확인
      const existingItem = this.#items.find(
         (item) => item.product.id === product.id,
      );

      if (existingItem) {
         existingItem.quantity += quantity;
         return `✅ ${product.name} 수량 증가 (${existingItem.quantity}개)`;
      }

      const newItem = new CartItem(product, quantity);
      this.#items.push(newItem);
      return `✅ ${product.name} 장바구니에 추가됨`;
   }

   removeItem(productId) {
      const index = this.#items.findIndex(
         (item) => item.product.id === productId,
      );

      if (index === -1) {
         return '❌ 상품을 찾을 수 없습니다.';
      }

      const removed = this.#items.splice(index, 1)[0];
      return `✅ ${removed.product.name} 제거됨`;
   }

   get items() {
      return this.#items.map((item) => item.toJSON());
   }

   get totalPrice() {
      return this.#items.reduce((sum, item) => sum + item.totalPrice, 0);
   }

   get itemCount() {
      return this.#items.reduce((count, item) => count + item.quantity, 0);
   }

   checkout() {
      if (this.#items.length === 0) {
         return '❌ 장바구니가 비어있습니다.';
      }

      // 재고 확인 및 차감
      try {
         this.#items.forEach((item) => {
            item.product.decreaseStock(item.quantity);
         });

         const receipt = {
            items: this.items,
            totalPrice: this.totalPrice,
            itemCount: this.itemCount,
            date: new Date().toISOString(),
         };

         this.#items = []; // 장바구니 비우기
         return { success: true, receipt };
      } catch (error) {
         return { success: false, error: error.message };
      }
   }
}

// 사용 예시
const product1 = new ShopProduct('p1', '노트북', 1500000, 10);
const product2 = new ShopProduct('p2', '마우스', 30000, 50);
const product3 = new ShopProduct('p3', '키보드', 80000, 5);

const cart = new ShoppingCart();

console.log(cart.addItem(product1, 2)); // 노트북 2개
console.log(cart.addItem(product2, 1)); // 마우스 1개
console.log(cart.addItem(product1, 1)); // 노트북 1개 추가 (총 3개)

console.log('\n=== 장바구니 내역 ===');
console.log('상품 수:', cart.itemCount); // 4개
console.log('총 가격:', `₩${cart.totalPrice.toLocaleString()}`);
console.log('상품 목록:', cart.items);

console.log('\n=== 결제 ===');
const checkoutResult = cart.checkout();
if (checkoutResult.success) {
   console.log('✅ 결제 성공!');
   console.log('영수증:', checkoutResult.receipt);
} else {
   console.log('❌ 결제 실패:', checkoutResult.error);
}

console.log('\n결제 후 재고:');
console.log('노트북 재고:', product1.stock); // 7개 (10 - 3)
console.log('마우스 재고:', product2.stock); // 49개 (50 - 1)

console.log('='.repeat(40));

// ==========================================
// [심화] 프로토타입과 클래스의 관계 🔥
// ==========================================
console.log('\n=== [심화] Prototype vs Class ===');

/**
 * 클래스는 내부적으로 프로토타입으로 동작!
 * Class는 Syntactic Sugar일 뿐
 */

// ES5 방식 (생성자 함수)
function PersonOld(name, age) {
   this.name = name;
   this.age = age;
}

PersonOld.prototype.greet = function () {
   return `안녕, 나는 ${this.name}이야`;
};

// ES6 방식 (클래스)
class PersonNew {
   constructor(name, age) {
      this.name = name;
      this.age = age;
   }

   greet() {
      return `안녕, 나는 ${this.name}이야`;
   }
}

const oldPerson = new PersonOld('철수', 25);
const newPerson = new PersonNew('영희', 23);

console.log(oldPerson.greet()); // 안녕, 나는 철수야
console.log(newPerson.greet()); // 안녕, 나는 영희야

// 둘 다 프로토타입 체인 사용
console.log(oldPerson.__proto__ === PersonOld.prototype); // true
console.log(newPerson.__proto__ === PersonNew.prototype); // true

// 클래스도 결국 함수
console.log(typeof PersonOld); // function
console.log(typeof PersonNew); // function

console.log('='.repeat(40));

// ==========================================
// 핵심 정리
// ==========================================
/**
 * ==========================================
 * 🔥 2026년 클래스 핵심 요약
 * ==========================================
 *
 * [기본 구조]
 * class MyClass {
 *    // Public 필드
 *    publicField;
 *
 *    // Private 필드 (외부 접근 불가)
 *    #privateField;
 *
 *    // Static 필드 (클래스 자체에 속함)
 *    static staticField;
 *
 *    constructor() {
 *       // 초기화
 *    }
 *
 *    // 인스턴스 메서드
 *    method() {}
 *
 *    // Getter/Setter
 *    get value() {}
 *    set value(v) {}
 *
 *    // Static 메서드
 *    static staticMethod() {}
 *
 *    // Private 메서드
 *    #privateMethod() {}
 * }
 *
 * [상속]
 * class Child extends Parent {
 *    constructor() {
 *       super(); // 부모 생성자 호출 (필수!)
 *    }
 * }
 *
 * [실무 패턴]
 * 1. Factory Pattern - 객체 생성 로직 캡슐화
 * 2. Singleton Pattern - 인스턴스 하나만 유지
 * 3. Method Chaining - 연속 호출
 * 4. Private Fields - 데이터 보호
 *
 * ==========================================
 * 언제 클래스를 써야 할까?
 * ==========================================
 *
 * ✅ 클래스 사용
 * - 동일한 구조의 객체를 여러 개 만들 때
 * - 복잡한 로직과 데이터를 캡슐화
 * - 상속으로 기능 확장 필요
 * - TypeScript 사용 (타입 정의 편리)
 *
 * ❌ 객체 리터럴 사용
 * - 단일 데이터 (설정값 등)
 * - 간단한 구조
 * - 일회성 데이터
 *
 * ==========================================
 * 면접 단골 질문
 * ==========================================
 *
 * Q1: "클래스와 생성자 함수의 차이는?"
 * A: 클래스는 생성자 함수의 syntactic sugar입니다.
 *    주요 차이점:
 *    - 클래스는 호이스팅 안 됨
 *    - 클래스는 strict mode로 실행
 *    - 클래스 메서드는 enumerable: false
 *
 * Q2: "Private 필드가 왜 필요한가?"
 * A: 캡슐화를 위해. 외부에서 직접 접근하면 안 되는
 *    민감한 데이터(비밀번호, 잔액 등)를 보호합니다.
 *
 * Q3: "Static 메서드는 언제 쓰나?"
 * A: 인스턴스와 무관한 유틸리티 함수나
 *    팩토리 메서드를 만들 때 사용합니다.
 *
 * Q4: "super()를 왜 먼저 호출해야 하나?"
 * A: 자식 클래스에서 this를 사용하려면
 *    부모의 초기화가 먼저 완료되어야 하기 때문입니다.
 *
 * Q5: "프로토타입과 클래스의 관계는?"
 * A: 클래스는 내부적으로 프로토타입으로 동작합니다.
 *    클래스는 프로토타입 패턴을 더 쉽게 쓸 수 있게
 *    만든 문법적 설탕(syntactic sugar)입니다.
 *
 * ==========================================
 * 실무 체크리스트
 * ==========================================
 *
 * ✅ 기본
 * - [ ] constructor로 초기화
 * - [ ] 메서드 정의
 * - [ ] new로 인스턴스 생성
 *
 * ✅ 중급
 * - [ ] # Private 필드/메서드 사용
 * - [ ] getter/setter로 접근 제어
 * - [ ] extends로 상속 구현
 * - [ ] super()로 부모 호출
 *
 * ✅ 고급
 * - [ ] static 메서드로 팩토리 패턴
 * - [ ] 메서드 체이닝 구현 (return this)
 * - [ ] 싱글톤 패턴 이해
 * - [ ] instanceof로 타입 체크
 *
 * 💡 실무 팁:
 * - Private 필드는 진짜로 필요한 곳에만 (과도한 사용 X)
 * - Getter/Setter 남발하지 말 것 (명확한 의도가 있을 때만)
 * - 상속보다 조합(Composition)을 우선 고려
 * - 클래스가 너무 크면 분리 검토 (단일 책임 원칙)
 */

console.log('\n클래스 완벽 정리 끝!');
