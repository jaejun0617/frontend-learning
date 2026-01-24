/**
 * ==========================================
 * JavaScript Static Keyword 완벽 정리 (2026년 최신)
 * ==========================================
 *
 * ⭐ = 실무 필수 패턴 (Factory Pattern)
 * 🔥 = 메모리 효율성과 유틸리티 함수
 *
 * [핵심 요약]
 * 1. static은 '인스턴스(객체)'가 아니라 '클래스 자체'에 귀속된다.
 * 2. new 키워드 없이 클래스 이름으로 바로 접근한다.
 * 3. 데이터를 공유하거나, 객체 생성 로직을 다양화할 때 쓴다.
 */

// ==========================================
// [초급] 기본 개념 (Class Level Property)
// ==========================================
console.log('=== [초급] 스태틱 기본 ===');

class IdolModel {
   name;
   year;

   // static 필드: 모든 객체가 공유하는 값 (붕어빵 틀에 써있는 글씨)
   static groupName = '아이브';

   constructor(name, year) {
      this.name = name;
      this.year = year;
   }

   // static 메서드: 객체 생성 없이 호출 가능
   static returnGroupName() {
      return `우리는 ${IdolModel.groupName}입니다.`;
   }
}

const yuJin = new IdolModel('안유진', 2003);

console.log(yuJin.name); // 안유진 (인스턴스 속성)

// ❌ 인스턴스에서는 static에 접근 불가!
console.log(yuJin.groupName); // undefined

// ✅ 클래스 자체에서 접근해야 함
console.log(IdolModel.groupName); // 아이브
console.log(IdolModel.returnGroupName());

console.log('='.repeat(40));

// ==========================================
// [중급] 팩토리 패턴 (Factory Pattern) ⭐⭐⭐
// ==========================================
console.log('\n=== [중급] 팩토리 패턴 (실무 핵심) ===');

/**
 * 실무에서는 서버에서 내려주는 데이터 모양이 제각각일 때가 많습니다.
 * - 어떨 때는 JSON 객체로 오고 ({ name: ... })
 * - 어떨 때는 배열로 오고 (['이름', ...])
 *
 * 이때 static 메서드를 '커스텀 생성자'처럼 사용합니다.
 */

class User {
   name;
   age;

   constructor(name, age) {
      this.name = name;
      this.age = age;
   }

   // 1. 객체로부터 생성
   static fromObject(obj) {
      if (!obj.name || !obj.age) {
         throw new Error('데이터가 불완전합니다.');
      }
      return new User(obj.name, obj.age);
   }

   // 2. 배열로부터 생성
   static fromList(list) {
      return new User(list[0], list[1]);
   }

   // 3. JSON 문자열로부터 생성
   static fromJson(jsonString) {
      const parsed = JSON.parse(jsonString);
      return new User(parsed.name, parsed.age);
   }
}

// 상황 1: 객체로 데이터가 왔을 때
const user1 = User.fromObject({ name: '장원영', age: 20 });
console.log('fromObject:', user1);

// 상황 2: 배열로 왔을 때
const user2 = User.fromList(['안유진', 21]);
console.log('fromList:', user2);

// 상황 3: JSON으로 왔을 때
const user3 = User.fromJson('{"name": "가을", "age": 22}');
console.log('fromJson:', user3);

console.log('='.repeat(40));

// ==========================================
// [실무] 유틸리티 클래스 (Utility Class) 🔥
// ==========================================
console.log('\n=== [실무] 유틸리티 클래스 ===');

/**
 * 객체를 생성할 필요 없이, 함수들만 모아놓은 통(Container)으로 사용.
 * 예: Math.max(), Date.now() 등도 다 static입니다.
 */

class DateUtils {
   // 2026-01-24 형태로 변환해주는 유틸 함수
   static formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
   }

   // 오늘 날짜인지 확인
   static isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate();
   }
}

// new DateUtils() 할 필요 없음! 그냥 도구상자처럼 꺼내 씀.
const now = new Date();
console.log(DateUtils.formatDate(now));
console.log('오늘인가요?', DateUtils.isToday(now));

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 핵심 요약: 언제 static을 쓰나요?
 * ==========================================
 *
 * 1. Factory Method (가장 중요 ⭐):
 *    - `fromObject`, `fromList`, `create` 처럼
 *    - 데이터를 받아서 인스턴스를 '만들어주는' 역할을 할 때.
 *    - JS에는 생성자 오버로딩(생성자 여러 개 만들기)이 없어서 이 패턴을 씁니다.
 *
 * 2. Utility Helper:
 *    - `Math.random()` 처럼 상태값 없이 기능만 수행하는 함수들을 모아둘 때.
 *
 * 3. Shared Constant:
 *    - `static MAX_COUNT = 100` 처럼 모든 객체가 공유하는 설정값.
 */
