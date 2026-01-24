/**
 * ==========================================
 * JavaScript super 키워드 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * [핵심 포인트]
 * 1. super(): 부모 생성자 호출 (자식 인스턴스 생성의 시작점)
 * 2. super.prop:
 *    - 일반 메서드 내부: 부모의 프로토타입(Parent.prototype)을 가리킴
 *    - 정적 메서드 내부: 부모 클래스 자체(Parent)를 가리킴
 * 3. [[HomeObject]]: super가 동작하는 내부 메커니즘 (면접용 심화)
 */

// ==================================================
// [초급] 1) 생성자에서의 super (The Rule)
// ==================================================
console.log('=== [초급] 생성자 호출 ===');

class IdolModel {
   name;
   year;

   constructor(name, year) {
      this.name = name;
      this.year = year;
   }

   sayHello() {
      return `안녕하세요, ${this.name}입니다.`;
   }
}

class FemaleModel extends IdolModel {
   part;

   constructor(name, year, part) {
      // 🚨 TDZ(Temporal Dead Zone) 경고
      // console.log(this); // ❌ ReferenceError: super() 호출 전에는 this가 존재하지 않음!

      super(name, year); // ✅ 부모가 먼저 this를 만들어줘야 함

      this.part = part; // 이제 this 사용 가능
      console.log(`✅ ${this.name} 인스턴스 생성 완료`);
   }

   // [중급] 메서드 오버라이딩 (덮어쓰기 + 재사용)
   sayHello() {
      // super.sayHello()는 IdolModel.prototype.sayHello.call(this)와 같음
      return `[Female] ${super.sayHello()} 담당은 ${this.part}입니다.`;
   }
}

const yuJin = new FemaleModel('안유진', 2003, '보컬');
console.log(yuJin.sayHello());

console.log('='.repeat(40));

// ==================================================
// [중급] 2) Static에서의 super (Context 차이)
// ==================================================
console.log('\n=== [중급] Static Context ===');

class BaseFactory {
   static getType() {
      return 'Base';
   }

   static create() {
      // 여기서 this는 BaseFactory 클래스 자체
      return `[${this.getType()}] 생성됨`;
   }
}

class IdolFactory extends BaseFactory {
   static getType() {
      return 'Idol';
   }

   static create() {
      // super.create()를 부르면
      // 부모의 create가 실행되지만, 'this'는 여전히 자식(IdolFactory)을 가리킴! 🔥 중요
      return `${super.create()} (by Startship)`;
   }
}

console.log(IdolFactory.create());
// 결과: "[Idol] 생성됨 (by Startship)"
// 설명: 부모의 create가 실행됐지만, 내부의 this.getType()은 자식의 'Idol'을 가져옴 (다형성)

console.log('='.repeat(40));

// ==================================================
// [고급] 3) 객체 리터럴에서의 super 😲
// - 클래스가 아니어도 super를 쓸 수 있다!
// ==================================================
console.log('\n=== [고급] 객체 리터럴과 super ===');

const parentProto = {
   name: '부모',
   greet() {
      return 'Hello!';
   },
};

const childObj = {
   name: '자식',
   // ⚠️ 중요: 메서드 축약형(method shorthand)을 써야만 super 사용 가능
   greet() {
      return `${super.greet()} I am ${this.name}`;
   },

   // ❌ 일반 함수 표현식에서는 super 사용 불가
   // greet: function() { return super.greet(); } // SyntaxError
};

// 프로토타입 연결
Object.setPrototypeOf(childObj, parentProto);

console.log(childObj.greet()); // Hello! I am 자식

console.log('='.repeat(40));

// ==================================================
// [실무] 4) Web Component / Library 패턴
// - 프레임워크나 라이브러리를 확장할 때 super는 필수
// ==================================================
console.log('\n=== [실무] 라이프사이클 확장 패턴 ===');

class Component {
   constructor() {
      this.state = {};
   }

   // 라이프사이클 메서드 (부모가 정의)
   connectedCallback() {
      console.log('🔹 [Core] 이벤트 리스너 연결');
      console.log('🔹 [Core] 초기 데이터 로딩');
   }
}

class MyWidget extends Component {
   constructor() {
      super();
      this.state = { active: true };
   }

   // 부모의 핵심 로직을 유지하면서 내 기능을 추가
   connectedCallback() {
      super.connectedCallback(); // 부모의 세팅 먼저 실행 (필수)
      console.log('🔸 [Widget] 커스텀 UI 렌더링');
      console.log('🔸 [Widget] 애니메이션 시작');
   }
}

const widget = new MyWidget();
widget.connectedCallback();

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 심화 개념: [[HomeObject]] (면접용)
 * ==========================================
 *
 * Q: super.method()는 어떻게 부모를 찾나요? this.__proto__ 인가요?
 * A: 아닙니다! [[HomeObject]]라는 내부 슬롯을 사용합니다.
 *
 * 1. 클래스나 객체 메서드 축약형(`foo() {}`)을 정의할 때,
 *    JS 엔진은 해당 함수가 속한 객체를 [[HomeObject]]로 기억해둡니다.
 * 2. super.method()를 호출하면,
 *    [[HomeObject]]의 프로토타입(부모)을 찾아서 메서드를 실행합니다.
 *
 * * 그래서 메서드를 다른 객체로 복사해서 가져가도, super는 여전히 원래 부모를 가리킵니다.
 */
