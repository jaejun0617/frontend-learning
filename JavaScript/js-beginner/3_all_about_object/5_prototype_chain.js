/**
 * =====================================================================
 * Prototype Chain(프로토타입 체인) - 학습 + 실무 템플릿 (2026)
 * =====================================================================
 * ⭐ = 실무에서 자주 씀 / 🔥 = 중요·심화 / 🛡️ = 방어적 코딩(Safety)
 *
 * [맨 위 결론: "진짜 중요" vs "개념만" ✅]
 * ✅ 진짜 중요(계속 쓰고, 실무에서 바로 만남) ⭐🔥
 * - 객체가 메서드를 찾는 방식: (내 것) → (프로토타입) → (Object.prototype) → null
 * - prototype에 메서드를 두면 인스턴스들이 함수를 "공유"한다(메모리/성능)
 * - instanceof / hasOwnProperty가 왜 그렇게 동작하는지
 *
 * ☑️ 개념만 이해하면 충분(암기 필요 X)
 * - __proto__ 직접 사용(레거시): 요즘은 getPrototypeOf/setPrototypeOf 권장
 * - 엔진 내부 슬롯([[Prototype]]) 같은 내부 용어: 원리만 알면 OK
 *
 * [핵심정리(먼저 읽기) 🔥]
 * 1) 모든 객체는 보이지 않는 연결([[Prototype]])을 가진다.
 * 2) 함수(생성자)에는 `prototype`이 있고, `new`로 만든 인스턴스의 [[Prototype]]이 그걸 가리킨다.
 * 3) 메서드 탐색은 "체인"으로 진행된다: obj → obj.__proto__ → ... → Object.prototype → null
 * 4) 실무 정석 ⭐: 인스턴스 메서드는 prototype에 두어 공유한다.
 */

console.clear?.();

// ---------------------------------------------------------------------
// [Utility] 출력 포맷팅
// ---------------------------------------------------------------------
const line = (n = 80) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(`▶ ${title}`);
   console.log(line());
};

// =====================================================================
// 1) [초급] "프로토타입 체인"이란? (메서드 찾기 순서)
// =====================================================================
{
   section('1. [초급] 메서드 찾기 순서(프로토타입 체인)');

   /**
    * 왜 중요?
    * - "왜 내 객체에 toString이 있지?" → Object.prototype에서 온 것
    * - 디버깅에서 "어디서 온 메서드인지"를 알면 훨씬 빨리 해결된다 ⭐
    */

   const testObj = {};

   // ✅ 권장: getPrototypeOf
   console.log(
      'testObj의 prototype === Object.prototype ?',
      Object.getPrototypeOf(testObj) === Object.prototype,
   );

   // 레거시(보이기만): __proto__는 학습용으로는 OK지만 실무에선 지양
   console.log(
      'testObj.__proto__ === Object.prototype ?',
      testObj.__proto__ === Object.prototype,
   );

   // testObj에 없는데도 호출 가능한 이유: 체인에서 찾음
   console.log('testObj.toString():', testObj.toString());
}

// =====================================================================
// 2) [중급] 생성자 함수 + new: instance.__proto__ === Constructor.prototype
// =====================================================================
{
   section('2. [중급] new가 하는 일: prototype 연결');

   function IdolModel(name, year) {
      this.name = name;
      this.year = year;
   }

   // 생성자 함수에는 prototype이 있다.
   console.log('IdolModel.prototype:', IdolModel.prototype);

   const jaeJun = new IdolModel('신재준', 1996);

   // 🔥 핵심 공식
   console.log(
      'Object.getPrototypeOf(jaeJun) === IdolModel.prototype ?',
      Object.getPrototypeOf(jaeJun) === IdolModel.prototype,
   );

   // constructor도 원형에 기본으로 있다(서로 연결)
   console.log(
      'IdolModel.prototype.constructor === IdolModel ?',
      IdolModel.prototype.constructor === IdolModel,
   );
}

// =====================================================================
// 3) [고급] ⭐ 메서드 공유: 인스턴스 메서드 vs prototype 메서드
// =====================================================================
{
   section('3. [고급] 메서드 공유(⭐ 실무 핵심)');

   /**
    * 왜 prototype에 메서드를 두나?
    * - 인스턴스마다 함수를 만들면 메모리 낭비
    * - prototype에 두면 인스턴스들이 "같은 함수"를 공유한다 ⭐
    */

   // (A) 나쁜 예: 인스턴스마다 sayHello가 새로 생성됨
   function IdolModel2(name) {
      this.name = name;
      this.sayHello = function () {
         return `[instance] 안녕하세요, ${this.name}입니다.`;
      };
   }

   const a = new IdolModel2('안유진');
   const b = new IdolModel2('장원영');

   console.log(a.sayHello());
   console.log(b.sayHello());
   console.log('인스턴스 메서드 공유?', a.sayHello === b.sayHello); // false ❌
   console.log('a.hasOwnProperty("sayHello") ?', a.hasOwnProperty('sayHello')); // true

   // (B) 정석: prototype에 sayHello를 둬서 공유
   function IdolModel3(name) {
      this.name = name;
   }

   IdolModel3.prototype.sayHello = function () {
      return `[proto] 안녕하세요, ${this.name}입니다.`;
   };

   const c = new IdolModel3('레이');
   const d = new IdolModel3('리즈');

   console.log(c.sayHello());
   console.log(d.sayHello());
   console.log('프로토타입 메서드 공유?', c.sayHello === d.sayHello); // true ✅
   console.log('c.hasOwnProperty("sayHello") ?', c.hasOwnProperty('sayHello')); // false
}

// =====================================================================
// 4) [실무패턴] 오버라이딩: "내 것"이 있으면 내 것이 이김 ⭐
// =====================================================================
{
   section('4. [실무패턴] 오버라이딩(⭐ 체인 우선순위)');

   /**
    * 왜 오버라이딩이 자연스럽나?
    * - 메서드를 찾을 때 "내 객체"(own property)를 먼저 본다.
    * - 있으면 그걸 쓰고, 없으면 prototype으로 올라간다.
    */

   function IdolModel(name) {
      this.name = name;

      // 인스턴스에 직접 달면 prototype보다 우선
      this.sayHello = function () {
         return `[instance override] 하이! ${this.name}`;
      };
   }

   IdolModel.prototype.sayHello = function () {
      return `[prototype] 안녕하세요, ${this.name}입니다.`;
   };

   const yuJin = new IdolModel('안유진');
   console.log(yuJin.sayHello());

   // 🧪 인스턴스 오버라이드 제거하면 prototype 버전이 다시 보인다
   delete yuJin.sayHello;
   console.log('인스턴스 메서드 삭제 후:', yuJin.sayHello());
}

// =====================================================================
// 4.5) [심화] 🛡️ setPrototypeOf는 "학습용". 실무에서는 지양
// =====================================================================
{
   section('4.5 [심화] setPrototypeOf 사용 주의(🛡️)');

   /**
    * 왜 지양?
    * - 런타임에 프로토타입을 바꾸면 엔진 최적화가 깨질 수 있어 성능에 안 좋을 수 있다.
    * - 대신: "처음부터" 올바른 prototype으로 생성되게 만들거나(class/extends 사용)
    */

   function IdolModel(name) {
      this.name = name;
   }
   IdolModel.prototype.sayHello = function () {
      return `안녕하세요, ${this.name}입니다.`;
   };

   function FemaleIdolModel(name) {
      this.name = name;
      this.dance = function () {
         return `${this.name}이(가) 춤을 춥니다 💃`;
      };
   }

   const ray = new FemaleIdolModel('레이');

   console.log('ray.dance():', ray.dance());

   // 원래는 sayHello가 없다.
   console.log('ray.sayHello 존재?', typeof ray.sayHello);

   // 학습용으로만: 프로토타입을 바꿔서 sayHello를 "빌려" 오게 만들기
   Object.setPrototypeOf(ray, IdolModel.prototype);
   console.log('프로토타입 변경 후 ray.sayHello():', ray.sayHello());

   // ⚠️ 주의: constructor 정보가 기대와 다를 수 있다.
   console.log(
      'ray.constructor === FemaleIdolModel ?',
      ray.constructor === FemaleIdolModel,
   ); // false
   console.log(
      'ray.constructor === IdolModel ?',
      ray.constructor === IdolModel,
   ); // true
}

// =====================================================================
// 5) [핵심정리] 복습 체크리스트 12개 ✅
// =====================================================================
{
   section('5. [핵심정리] 복습 체크리스트 12개 ✅');

   const checklist = [
      '객체의 메서드 탐색은 체인: own → prototype → Object.prototype → null. 🔥',
      'Object.getPrototypeOf(obj)로 [[Prototype]](부모 링크)를 확인한다. ⭐',
      '__proto__는 레거시이며 학습용으로만 이해하고 실무에선 지양한다. 🛡️',
      '생성자 함수에는 prototype이 있고, new로 만든 인스턴스는 그 prototype을 바라본다. 🔥',
      '핵심 공식: Object.getPrototypeOf(instance) === Constructor.prototype. 🔥',
      'prototype에 메서드를 두면 인스턴스들이 함수를 공유해 메모리 효율이 좋다. ⭐',
      '인스턴스에 메서드를 직접 달면 객체마다 함수가 새로 생겨 낭비가 된다. 🔥',
      'hasOwnProperty는 "내 것(own property)"인지 검사한다. ⭐',
      '오버라이딩은 체인의 우선순위 때문에 자연스럽게 발생한다(내 것이 먼저). ⭐',
      'Object.setPrototypeOf로 런타임에 prototype을 바꾸는 건 학습용이며 실무에선 지양. 🛡️',
      'constructor는 prototype 체인에 의해 결정되며, prototype을 바꾸면 의도와 달라질 수 있다. 🔥',
      '결론: 공유할 건 prototype, 상태는 인스턴스. 신규 코드는 class/extends로 표현하면 된다. ✅',
   ];

   checklist.forEach((item, idx) => {
      console.log(`${String(idx + 1).padStart(2, '0')}. ${item}`);
   });
}

console.log(`\n${line()}`);
console.log('Prototype Chain 최종 템플릿 끝! ✅');
console.log(line());
