/**
 * =====================================================================
 * JavaScript Inheritance(상속) - 학습 + 실무 템플릿 (2026)
 * =====================================================================
 * ⭐ = 실무에서 자주 씀 / 🔥 = 중요·최신 관점 / 🛡️ = 방어적 코딩(Safety)
 *
 * [핵심정리(먼저 읽기) 🔥]
 * 1) `extends`는 "부모의 기능(메서드/프로토타입 체인)"을 물려받아 재사용한다.
 * 2) 자식 클래스에 constructor가 있다면 `super(...)`는 "반드시" 먼저 호출해야 한다.
 *    - 왜? `this`는 부모 생성자가 초기화해 주기 전엔 사용할 수 없다.
 * 3) 오버라이딩(override)은 "메서드 이름은 유지"하고 "동작만 변경"하는 전략이다. ⭐
 * 4) static 상속도 된다. (ChildClass.__proto__ === ParentClass) 🔥
 * 5) instanceof는 "프로토타입 체인"에 해당 생성자의 prototype이 있는지 검사한다. 🔥
 */

console.clear?.();

// ---------------------------------------------------------------------
// [Utility] 출력 포맷팅 (학습 가독성용)
// ---------------------------------------------------------------------
const line = (n = 74) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(`▶ ${title}`);
   console.log(line());
};

// =====================================================================
// 1) [초급] extends 기본: 공통 기능 재사용
// =====================================================================
{
   section('1. [초급] extends 기본 개념');

   class IdolModel {
      name;
      year;

      constructor(name, year) {
         this.name = name;
         this.year = year;
      }

      sayHello() {
         return `안녕하세요, 저는 ${this.name}입니다.`;
      }
   }

   // extends로 부모의 메서드를 "그대로" 물려받는다.
   class FemaleModel extends IdolModel {
      part;

      constructor(name, year, part) {
         // 🔥 자식 constructor에서 super는 필수 + 최우선 호출
         // 왜? super가 실행돼야 부모가 this를 세팅해주고, 이후에야 this 사용 가능
         super(name, year);
         this.part = part;
      }

      dance() {
         return `${this.name}이(가) ${this.part} 파트에서 춤을 춥니다.`;
      }
   }

   const yuJin = new FemaleModel('안유진', 2003, '보컬');

   console.log('부모 메서드 재사용:', yuJin.sayHello());
   console.log('자식 전용 기능:', yuJin.dance());
}

// =====================================================================
// 2) [중급] ⭐ 오버라이딩(override) + super.method(): 기본 기능 재사용
// =====================================================================
{
   section('2. [중급] 오버라이딩(override) + super.sayHello() ⭐');

   class IdolModel {
      name;
      year;

      constructor(name, year) {
         this.name = name;
         this.year = year;
      }

      sayHello() {
         return `안녕하세요, 저는 ${this.name}입니다.`;
      }
   }

   class FemaleModel extends IdolModel {
      part;

      constructor(name, year, part) {
         super(name, year);
         this.part = part;
      }

      // ⭐ 오버라이딩: "같은 이름"을 유지하면서 내부 동작만 바꾼다.
      // 왜? 호출하는 쪽 코드는 그대로 두고(=인터페이스 유지), 역할만 확장/변경할 수 있다.
      sayHello() {
         // super.sayHello()를 쓰면 부모의 기본 문장을 "베이스"로 재사용 가능
         return `[Female] ${super.sayHello()} (${this.part}) 잘 부탁드려요!`;
      }
   }

   class MaleModel extends IdolModel {
      sing() {
         return `${this.name}이(가) 노래를 부릅니다.`;
      }

      // 오버라이딩 없이도 부모 메서드는 그대로 사용 가능
   }

   const yuJin = new FemaleModel('안유진', 2003, '보컬');
   const jaeJun = new MaleModel('신재준', 1996);

   console.log('오버라이딩 결과:', yuJin.sayHello());
   console.log('부모 그대로:', jaeJun.sayHello());
   console.log('자식 전용:', jaeJun.sing());
}

// =====================================================================
// 3) [고급] 🔥 Prototype Chain + instanceof의 "진짜" 동작
// =====================================================================
{
   section('3. [고급] 프로토타입 체인 + instanceof 🔥');

   class IdolModel {
      name;
      constructor(name) {
         this.name = name;
      }
   }

   class FemaleModel extends IdolModel {}

   const yuJin = new FemaleModel('안유진');

   // instanceof는 "prototype chain"에 해당 prototype이 있는지 확인
   console.log('yuJin instanceof FemaleModel:', yuJin instanceof FemaleModel); // true
   console.log('yuJin instanceof IdolModel  :', yuJin instanceof IdolModel); // true
   console.log('yuJin instanceof Object     :', yuJin instanceof Object); // true

   // 🔥 직접 확인해보기(학습용)
   console.log('Prototype(인스턴스) ->', Object.getPrototypeOf(yuJin));
   console.log('FemaleModel.prototype ->', FemaleModel.prototype);
   console.log(
      'Object.getPrototypeOf(yuJin) === FemaleModel.prototype:',
      Object.getPrototypeOf(yuJin) === FemaleModel.prototype,
   );

   // 체인 한 단계 더 올라가면 IdolModel.prototype
   console.log(
      'Object.getPrototypeOf(FemaleModel.prototype) === IdolModel.prototype:',
      Object.getPrototypeOf(FemaleModel.prototype) === IdolModel.prototype,
   );
}

// =====================================================================
// 4) [실무패턴] ⭐ 공통 규약(인터페이스) 유지: 다형성(Polymorphism)
// =====================================================================
{
   section('4. [실무패턴] 다형성(Polymorphism)로 호출부 단순화 ⭐');

   /**
    * 실무에서 상속을 쓰는 가장 좋은 순간:
    * - "호출부(사용하는 쪽)"는 똑같이 부르는데,
    * - 객체 타입(자식 클래스)에 따라 동작이 달라지게 만들고 싶을 때
    *
    * 왜 좋은가?
    * - if/else로 타입 분기하는 코드가 줄어들어 유지보수성이 올라간다. ⭐
    */

   class Animal {
      name;
      constructor(name) {
         this.name = name;
      }

      // 공통 규약(인터페이스): speak는 모든 동물이 가진다고 "약속"한다.
      speak() {
         // 🛡️ 베이스 클래스는 기본 동작을 두거나(옵션), 에러로 강제할 수도 있다.
         // 여기서는 학습용으로 기본 메시지를 둔다.
         return `${this.name}이(가) 소리를 냅니다.`;
      }
   }

   class Dog extends Animal {
      speak() {
         return `${this.name}: 멍멍!`;
      }
   }

   class Cat extends Animal {
      speak() {
         return `${this.name}: 야옹!`;
      }
   }

   // 호출부: 타입을 몰라도 speak()만 호출하면 된다.
   const zoo = [new Dog('초코'), new Cat('나비'), new Animal('알수없음')];
   zoo.forEach((a) => console.log(a.speak()));
}

// =====================================================================
// 4.5) [심화] 🔥 static 상속: 클래스 레벨 기능도 상속된다
// =====================================================================
{
   section('4.5 [심화] static 상속 🔥');

   class Base {
      static getJob() {
         return '직업은 아이돌입니다.';
      }
   }

   class Child extends Base {}

   // ✅ 자식 클래스에서 부모 static 메서드 호출 가능
   console.log('Child.getJob():', Child.getJob());

   // 🔥 진짜 이유: 클래스 자체도 객체이며, 클래스의 프로토타입 체인이 연결됨
   console.log(
      'Object.getPrototypeOf(Child) === Base:',
      Object.getPrototypeOf(Child) === Base,
   );
}

// =====================================================================
// 5) [핵심정리] 복습 체크리스트 12개 ✅
// =====================================================================
{
   section('5. [핵심정리] 복습 체크리스트 12개 ✅');

   const checklist = [
      '`extends`는 부모 기능을 재사용하기 위한 상속 문법이다.',
      '자식에 constructor가 있으면 super(...)는 반드시 먼저 호출해야 한다. 🔥',
      'super 호출 전에는 this를 사용할 수 없다. (ReferenceError) 🔥',
      '오버라이딩은 "이름은 유지"하고 "동작만 변경"한다. ⭐',
      'super.method()로 부모 기본 동작을 재사용하면서 확장할 수 있다. ⭐',
      '호출부를 단순화하려면 다형성(Polymorphism)으로 if/else 분기를 줄인다. ⭐',
      'instanceof는 프로토타입 체인에 해당 prototype이 있는지 검사한다. 🔥',
      'Object.getPrototypeOf(obj)로 인스턴스의 상위 prototype을 확인할 수 있다.',
      'static 메서드도 상속된다. (ChildClass가 ParentClass의 static 사용 가능) 🔥',
      '클래스 자체도 객체라서 `Object.getPrototypeOf(Child) === Parent`가 성립한다. 🔥',
      '상속은 "is-a" 관계가 명확할 때만 쓰고, 애매하면 조합(composition)도 고려한다. 🛡️',
      '결론: 공통 규약(메서드)을 중심으로 설계하면 상속이 깔끔해진다. ✅',
   ];

   checklist.forEach((item, idx) => {
      console.log(`${String(idx + 1).padStart(2, '0')}. ${item}`);
   });
}

console.log(`\n${line()}`);
console.log('Inheritance 최종 템플릿 끝! ✅');
console.log(line());
