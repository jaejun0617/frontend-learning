/**
 * ==========================================
 * JavaScript Class 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * ⭐ = 실무에서 자주 사용
 * 🔥 = 최신 문법 / 중요 개념
 *
 * [핵심 요약]
 * - Class는 객체를 만들기 위한 '설계도(Blueprint)'이다.
 * - 사실 내부적으로는 '함수(Function)'와 '프로토타입(Prototype)'으로 동작한다.
 */

// ==========================================
// [초급] 클래스의 기본 (Declaration) ⭐
// ==========================================
console.log('=== [초급] 클래스 기본 ===');

class IdolModel {
   // 1. 필드 선언 (옵션이지만 쓰는 게 좋음)
   name;
   year;
   group;

   // 2. 생성자 (Constructor) - 초기화 담당
   constructor(name, year, group) {
      this.name = name;
      this.year = year;
      this.group = group;
   }

   // 3. 메서드 (Method) - 행동 정의
   sayName() {
      return `안녕하세요, 저는 ${this.group}의 ${this.name}입니다.`;
   }
}

// 인스턴스(Instance) 생성: 설계도로 실제 건물을 짓는 행위
const yuJin = new IdolModel('안유진', 2003, '아이브');
const gaEul = new IdolModel('가을', 2002, '아이브');

console.log(yuJin.sayName()); // 안녕하세요, 저는 아이브의 안유진입니다.
console.log(gaEul.sayName());

// ⚠️ 클래스의 실체는 '함수'다!
console.log(typeof IdolModel); // function (중요 면접 질문)
console.log(typeof yuJin); // object

console.log('='.repeat(40));

// ==========================================
// [중급] 접근 제어와 접근자 (Encapsulation) 🔥
// ==========================================
console.log('\n=== [중급] Private & Getter/Setter ===');

/**
 * 2026년 기준, Private 필드(#)가 표준입니다.
 * 외부에서 함부로 값을 바꾸지 못하게 막을 때 씁니다.
 */

class IdolRevenue {
   #revenue; // #을 붙이면 Private 필드 (외부 접근 불가)

   constructor(initialRevenue) {
      this.#revenue = initialRevenue;
   }

   // Getter: 값을 읽어올 때
   get revenue() {
      return `${this.#revenue}원`; // 포맷팅해서 줄 수 있음
   }

   // Setter: 값을 수정할 때 (검증 로직 추가 가능)
   set revenue(money) {
      if (money < 0) {
         console.log('❌ 매출은 마이너스가 될 수 없습니다.');
         return;
      }
      this.#revenue = money;
   }
}

const iveShop = new IdolRevenue(10000);

// console.log(iveShop.#revenue); // ❌ 에러! (Private field must be declared...)
console.log(iveShop.revenue); // 10000원 (Getter 호출)

iveShop.revenue = -5000; // ❌ 매출은 마이너스가 될 수 없습니다. (Setter 방어)
iveShop.revenue = 20000; // 정상 변경
console.log(iveShop.revenue); // 20000원

console.log('='.repeat(40));

// ==========================================
// [고급] 상속과 오버라이딩 (Inheritance) ⭐⭐
// ==========================================
console.log('\n=== [고급] 상속 (extends) ===');

/**
 * extends: 부모 클래스의 기능을 물려받음
 * super: 부모 클래스를 호출함
 */

// 부모 클래스
class FemaleIdol {
   name;
   constructor(name) {
      this.name = name;
   }

   dance() {
      return `${this.name}이 춤을 춥니다.`;
   }
}

// 자식 클래스 (상속)
class IVE extends FemaleIdol {
   constructor(name, part) {
      // 🔥 자식 생성자에서 this를 쓰려면 super()를 먼저 불러야 함! (국룰)
      super(name);
      this.part = part;
   }

   // 메서드 오버라이딩 (덮어쓰기)
   dance() {
      return `${super.dance()} (아이브 안무를 춥니다!)`;
   }
}

const wonYoung = new IVE('장원영', '센터');
console.log(wonYoung.name); // 장원영 (부모 거)
console.log(wonYoung.part); // 센터 (내 거)
console.log(wonYoung.dance()); // 장원영이 춤을 춥니다. (아이브 안무를 춥니다!)

console.log('='.repeat(40));

// ==========================================
// [실무] Static과 Factory 패턴 🔥🔥🔥
// ==========================================
console.log('\n=== [실무] Static Method ===');

/**
 * static: 인스턴스(new) 없이 클래스 자체에서 호출하는 함수
 * 용도: 유틸리티 함수, 객체 생성 도우미(Factory)
 */

class IdolFactory {
   static groupName = '아이브';

   // 정적 메서드
   static createMember(name) {
      // 여기서 this는 클래스 자체(IdolFactory)를 가리킴
      return new IdolModel(name, 2024, this.groupName);
   }
}

// new 없이 바로 사용
console.log(IdolFactory.groupName); // 아이브

// 팩토리 패턴으로 객체 생성
const rei = IdolFactory.createMember('레이');
console.log(rei); // IdolModel { name: '레이', year: 2024, group: '아이브' }

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 핵심 요약: 객체 리터럴 vs Class 언제 써요?
 * ==========================================
 *
 * 1. 객체 리터럴 ({ ... }):
 *    - 데이터가 하나만 필요할 때 (예: 설정값 config, 일회성 데이터)
 *    - 구조가 간단할 때
 *
 * 2. Class:
 *    - '동일한 구조'의 객체를 여러 개 만들어야 할 때 (예: 사용자 User, 상품 Product)
 *    - 데이터와 관련된 복잡한 기능(메서드)을 함께 관리해야 할 때
 *    - '상속'을 통해 기능을 확장해야 할 때
 *    - TypeScript를 쓴다면 Class가 타입 정의에 유리함
 */
