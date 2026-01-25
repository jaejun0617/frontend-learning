/**
 * =====================================================================
 * JavaScript Static Keyword - 학습 + 실무 템플릿 (2026)
 * =====================================================================
 * ⭐ = 실무에서 자주 씀 / 🔥 = 중요·최신 관점 / 🛡️ = 방어적 코딩(Safety)
 *
 * [핵심정리(먼저 읽기) 🔥]
 * 1) static은 "인스턴스(new 객체)"가 아니라 "클래스(설계도)"에 붙는다.
 * 2) 그래서 `obj.staticMember` ❌, `Class.staticMember` ✅
 * 3) 실무에서 static은 3종 세트로 가장 많이 등장한다:
 *    - ⭐ Factory Method: 입력 형태가 달라도 "같은 규격의 인스턴스"로 표준화
 *    - 🔥 Utility Helper: 상태 없이 기능만 제공(예: Math.max, Date.now)
 *    - ⭐ Constant/Config: 모든 인스턴스가 공유하는 상수/설정값
 * 4) 🛡️ static은 공유(전역에 가까움)라서 "변경 가능한 상태"를 두면 디버깅 난이도가 폭증한다.
 */

console.clear?.();

// ---------------------------------------------------------------------
// [Utility] 출력 포맷팅 (학습 가독성용)
// ---------------------------------------------------------------------
const line = (n = 72) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(`▶ ${title}`);
   console.log(line());
};

// =====================================================================
// 1) [초급] static 기본 개념: 인스턴스 vs 클래스
// =====================================================================
{
   section('1. [초급] static 기본 개념 (인스턴스 vs 클래스)');

   class IdolModel {
      name;

      // ⭐ static 필드: 모든 인스턴스가 공유하는 값
      // 왜? 그룹명 같은 값은 객체마다 복제할 필요가 없고, "한 곳"에서 관리하는 게 정확하다.
      static groupName = '아이브';

      constructor(name) {
         this.name = name;
      }

      // 🔥 static 메서드: 인스턴스 상태(this.name)가 필요 없는 "클래스 기능"
      // 왜? this(개별 객체)가 필요 없는 동작을 인스턴스에 두면, 의미가 흐려지고 오해가 생긴다.
      static announce() {
         // static에서의 this는 "클래스 자체"를 가리킨다.
         return `우리는 ${this.groupName}입니다.`;
      }

      // 비교용: 인스턴스 메서드(개별 객체 상태 사용)
      introduce() {
         return `안녕하세요, ${this.name}입니다.`;
      }
   }

   const yuJin = new IdolModel('안유진');

   console.log('인스턴스 메서드:', yuJin.introduce());
   console.log('인스턴스에서 static 접근:', yuJin.groupName); // undefined (의도적으로 불가)
   console.log('클래스에서 static 접근:', IdolModel.groupName);
   console.log('정적 메서드 호출:', IdolModel.announce());
}

// =====================================================================
// 2) [중급] ⭐ Factory Method: 생성 로직을 표준화 (실무 1순위)
// =====================================================================
{
   section('2. [중급] Factory Method (실무 활용 1순위 ⭐)');

   /**
    * 왜 Factory Method가 실무에서 중요할까?
    * - JS는 생성자 오버로딩이 없다. (constructor를 여러 개 둘 수 없음)
    * - 그런데 입력 데이터는 API/로컬스토리지/폼 등에서 객체/배열/JSON으로 다양하게 들어온다.
    *
    * 해결:
    * - `fromObject`, `fromList`, `fromJson` 같은 static 메서드로
    *   "입력 표준화 + 검증"을 한곳에서 처리한다.
    */

   class User {
      #name;
      #age;

      constructor(name, age) {
         this.#name = name;
         this.#age = age;
      }

      // 🛡️ 공통 검증을 private static으로 모아두면 생성 규칙 변경 시 수정 지점이 1곳
      static #assertValid(name, age) {
         if (typeof name !== 'string' || name.trim().length < 2) {
            throw new TypeError('name은 2자 이상 문자열이어야 합니다.');
         }
         if (!Number.isFinite(age) || age < 0) {
            throw new TypeError('age는 0 이상의 유효한 숫자여야 합니다.');
         }
      }

      // 팩토리 1: 객체 데이터
      static fromObject(obj) {
         // 왜 optional chaining? 외부 데이터는 누락/깨짐이 흔해서 안전하게 접근해야 한다. 🛡️
         const name = obj?.name;
         const age = obj?.age;

         this.#assertValid(name, age);
         return new User(name.trim(), age);
      }

      // 팩토리 2: 배열 데이터
      static fromList(list) {
         const name = list?.[0];
         const age = list?.[1];

         this.#assertValid(name, age);
         return new User(String(name).trim(), age);
      }

      // 팩토리 3: JSON 문자열
      static fromJson(jsonString) {
         // 🛡️ JSON.parse는 런타임 에러가 날 수 있으므로 try/catch로 감싸야 "원인"이 명확해진다.
         try {
            const parsed = JSON.parse(jsonString);
            return this.fromObject(parsed);
         } catch {
            throw new TypeError(
               'JSON 파싱 실패: 올바른 JSON 문자열을 전달하세요.',
            );
         }
      }

      // Getter로 조회만 제공(캡슐화)
      get info() {
         return `${this.#name} (${this.#age})`;
      }
   }

   const user1 = User.fromObject({ name: ' 장원영 ', age: 20 });
   const user2 = User.fromList(['안유진', 21]);
   const user3 = User.fromJson('{"name":"가을","age":22}');

   console.log('fromObject:', user1.info);
   console.log('fromList  :', user2.info);
   console.log('fromJson  :', user3.info);

   // 실패 예시(학습용) - 필요하면 주석 해제해서 확인
   // User.fromObject({ name: 'A', age: -1 });
   // User.fromJson('{broken json}');
}

// =====================================================================
// 3) [고급] 🔥 static vs instance: 선택 기준(의도/테스트/메모리)
// =====================================================================
{
   section('3. [고급] static vs instance 선택 기준 🔥');

   /**
    * 선택 기준 1문장:
    * - "개별 객체 상태(this)에 의존하나?"
    *   YES → 인스턴스 메서드
    *   NO  → static 메서드(의도 명확 + 테스트 쉬움)
    */

   class Price {
      value;

      constructor(value) {
         if (!Number.isFinite(value) || value < 0) {
            throw new TypeError('가격은 0 이상의 유효한 숫자여야 합니다.');
         }
         this.value = value;
      }

      // 인스턴스 메서드: 이 객체의 value에 의존
      formatKRW() {
         return `₩${this.value.toLocaleString('ko-KR')}`;
      }

      // 🔥 static factory: "가격 규격"으로 표준화
      static of(value) {
         return new Price(value);
      }

      // 🔥 static utility: 상태 없는 계산
      static add(a, b) {
         return Price.of(a).value + Price.of(b).value;
      }
   }

   const p = Price.of(19900);
   console.log('format:', p.formatKRW());
   console.log('add   :', Price.add(1000, 2500));
}

// =====================================================================
// 4) [실무패턴] ⭐ Utility Class + 🛡️ new 방지 + 입력 검증
// =====================================================================
{
   section('4. [실무패턴] Utility Class 설계 (⭐/🛡️)');

   /**
    * Utility Class란?
    * - 인스턴스가 필요 없는 함수들을 "한 네임스페이스"로 묶는 패턴
    *
    * 왜 클래스에 묶나?
    * - 전역 함수 난립 방지
    * - 관련 기능을 한 곳에서 찾기 쉬움
    * - 테스트/리팩토링 시 이동이 쉬움
    */

   class DateUtils {
      constructor() {
         // 🛡️ 유틸은 인스턴스를 만들 이유가 없다. 실수를 원천 차단.
         throw new Error(
            'DateUtils는 인스턴스화 할 수 없습니다. (static only)',
         );
      }

      static #isValidDate(date) {
         // 🛡️ Invalid Date 방어: instanceof만으로는 부족함
         return date instanceof Date && !Number.isNaN(date.getTime());
      }

      static formatDate(date) {
         if (!this.#isValidDate(date)) {
            throw new TypeError('유효한 Date 객체를 전달하세요.');
         }

         const y = String(date.getFullYear());
         const m = String(date.getMonth() + 1).padStart(2, '0');
         const d = String(date.getDate()).padStart(2, '0');
         return `${y}-${m}-${d}`;
      }

      // ⭐ 실무에서 자주 쓰는 형태: 오늘인지 확인
      static isToday(date) {
         if (!this.#isValidDate(date)) return false;

         const today = new Date();
         return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
         );
      }
   }

   const now = new Date();
   console.log('오늘 날짜:', DateUtils.formatDate(now));
   console.log('오늘인가요?', DateUtils.isToday(now));
}

// =====================================================================
// 4.5) [심화] 🔥 static 상속: 클래스 레벨 기능도 상속된다
// =====================================================================
{
   section('4.5 [심화] static 상속 🔥');

   class Parent {
      static hello() {
         return '부모 클래스의 안녕';
      }
   }

   class Child extends Parent {}

   // ✅ 자식 클래스에서도 부모의 static 메서드 호출 가능
   console.log('Static 상속 확인:', Child.hello());
}

// =====================================================================
// 5) [핵심정리] 복습 체크리스트 12개 ✅
// =====================================================================
{
   section('5. [핵심정리] 복습 체크리스트 12개 ✅');

   const checklist = [
      'static은 인스턴스가 아니라 클래스에 붙는다. (Class.member)',
      'obj.staticMember가 아닌 Class.staticMember로 접근한다.',
      'this에 의존하지 않는 기능은 static이 의도가 더 정직하다. 🔥',
      '생성자 오버로딩이 없어서 Factory Method가 특히 유용하다. ⭐',
      'Factory는 입력 표준화 + 검증을 한곳으로 모아 유지보수를 쉽게 한다. ⭐',
      '외부 데이터는 항상 방어적으로 접근한다. (obj?.prop / list?.[0]) 🛡️',
      'JSON.parse는 실패 가능: try/catch로 에러 원인을 명확히 한다. 🛡️',
      'Utility Class는 인스턴스가 필요 없으니 new를 막아 실수를 방지한다. 🛡️',
      'Date 검증은 instanceof만으론 부족하고 Invalid Date도 막아야 한다. 🛡️',
      'static 상수/설정값은 중복을 줄이고 의미를 선명하게 한다. ⭐',
      'static에 변경 가능한 상태를 두면 공유 부작용으로 디버깅이 어려워진다. 🛡️',
      '결론: 생성(Factory)·기능(Utility)·공유(Const)로 정리하면 대부분 해결된다. ✅',
   ];

   checklist.forEach((item, idx) => {
      console.log(`${String(idx + 1).padStart(2, '0')}. ${item}`);
   });
}

console.log(`\n${line()}`);
console.log('Static Keyword 최종 템플릿 끝! ✅');
console.log(line());
