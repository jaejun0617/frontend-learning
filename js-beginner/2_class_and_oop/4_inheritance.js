/**
 * ==========================================
 * JavaScript 상속 심화 & 동작 원리 (2026년 최신)
 * ==========================================
 *
 * [보강 내용]
 * 1. super(): 자식 생성자에서 부모 생성자 호출 (필수!)
 * 2. Overriding: 부모의 메서드를 내 입맛대로 바꾸기
 * 3. Static Inheritance: 스태틱 메서드도 상속된다!
 * 4. Prototype Chain: instanceof가 true가 나오는 진짜 이유
 */

// ==========================================
// 1. 부모 클래스 (Base Class)
// ==========================================
class IdolModel {
   name;
   year;

   constructor(name, year) {
      this.name = name;
      this.year = year;
   }

   // 일반 메서드
   sayHello() {
      return `안녕하세요, 저는 ${this.name}입니다.`;
   }

   // 🔥 스태틱 메서드도 상속이 될까요? (네, 됩니다!)
   static getJob() {
      return '직업은 아이돌입니다.';
   }
}

// ==========================================
// 2. 자식 클래스 (Child Class) - 기능 확장
// ==========================================
class FemaleModel extends IdolModel {
   part; // 자식에게만 있는 새로운 속성

   constructor(name, year, part) {
      // ⚠️ 주의: 자식 생성자(constructor)를 쓸 땐 무조건 super가 1번!
      // super를 부르기 전엔 'this'를 사용할 수 없습니다.
      super(name, year);
      this.part = part;
   }

   dance() {
      return `${this.name}이(가) ${this.part} 파트에서 춤을 춥니다.`;
   }

   // ⭐ 오버라이딩 (Method Overriding)
   // 부모한테 sayHello가 있지만, 덮어쓰기(재정의) 함
   sayHello() {
      // super.sayHello()를 쓰면 부모의 원래 기능도 살릴 수 있음
      return `[Female] ${super.sayHello()} 잘 부탁드려요!`;
   }
}

class MaleModel extends IdolModel {
   sing() {
      return `${this.name}이(가) 노래를 부릅니다.`;
   }
}

// ==========================================
// 3. 실행 및 검증
// ==========================================
console.log('=== 1. 인스턴스 생성 및 메서드 실행 ===');

const yuJin = new FemaleModel('안유진', 2003, '보컬');
const jaeJun = new MaleModel('신재준', 1996);

// 자식만의 기능
console.log(yuJin.dance()); // 안유진이(가) 보컬 파트에서 춤을 춥니다.
console.log(jaeJun.sing()); // 신재준이(가) 노래를 부릅니다.

// 오버라이딩 확인
console.log(yuJin.sayHello()); // [Female] 안녕하세요... (바뀐 기능)
console.log(jaeJun.sayHello()); // 안녕하세요... (부모 기능 그대로)

console.log('='.repeat(40));

console.log('\n=== 2. Static 상속 확인 ===');
// FemaleModel에는 getJob이 없지만 부모한테서 물려받음
console.log(FemaleModel.getJob()); // 직업은 아이돌입니다.
console.log(MaleModel.getJob()); // 직업은 아이돌입니다.

console.log('='.repeat(40));

console.log('\n=== 3. 프로토타입 체인과 instanceof ===');
/**
 * instanceof는 "너의 족보(Prototype Chain)에 이 클래스가 있니?" 라고 묻는 것.
 */

// 안유진 -> FemaleModel -> IdolModel -> Object
console.log(yuJin instanceof FemaleModel); // true (직계 자식)
console.log(yuJin instanceof IdolModel); // true (부모)
console.log(yuJin instanceof Object); // true (모든 객체의 조상)

console.log('----------------');
console.log(jaeJun instanceof FemaleModel); // false (족보가 다름)

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 실무 핵심 질문 (Interview Question)
 * ==========================================
 *
 * Q1. 자식 클래스 constructor에서 super()를 안 쓰면 어떻게 되나요?
 * A. ReferenceError가 발생합니다.
 *    자식 클래스는 빈 껍데기 상태로 시작하며, super()가 실행되어야
 *    비로소 부모가 this 인스턴스를 만들어서 자식에게 넘겨줍니다.
 *    그래서 super() 전에 this.name = ... 하면 에러가 납니다.
 *
 * Q2. 오버라이딩(Overriding)은 언제 쓰나요?
 * A. 부모가 제공하는 기본 기능이 자식에게 맞지 않을 때,
 *    이름은 똑같이 유지하면서 내부 동작만 바꾸고 싶을 때 사용합니다.
 *    (다형성 Polymorphism의 핵심)
 *
 * Q3) static 상속이 되는 진짜 이유?
 *  자식 클래스 객체의 프로토타입이 부모 클래스 객체를 가리킴
 *   Object.getPrototypeOf(ChildClass) === ParentClass
 */
