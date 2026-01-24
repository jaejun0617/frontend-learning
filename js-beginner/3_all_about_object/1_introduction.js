/**
 * ==========================================
 * JavaScript 객체 생성 마스터 가이드 (2026년 최신)
 * ==========================================
 *
 * [결론부터 말합니다]
 * 1. 단순 데이터 묶음 -> Object Literal ({}) 사용
 * 2. 핵심 비즈니스 모델 -> Class (Private + Static Factory) 사용 ⭐ (가장 중요)
 * 3. 나머지(생성자 함수, 단순 팩토리) -> 개념만 이해하고 실무에선 지양
 */

// ==========================================
// [Level 1] 객체 리터럴 (Object Literal)
// 👉 용도: 설정 파일, 일회성 데이터 전송 (DTO)
// ==========================================
console.log('=== 1. 객체 리터럴 (가벼운 용도) ===');

const simpleProfile = {
   name: '안유진',
   year: 2003,
   // 간단한 동작 정의 가능
   greet() {
      console.log(`안녕하세요, ${this.name}입니다!`);
   },
};

simpleProfile.greet();

console.log('='.repeat(40));

// ==========================================
// [Level 2] 생성자 함수 (Constructor Function)
// 👉 용도: 💀 사용 금지 (Class의 조상님, 면접용 지식)
// ==========================================
console.log('\n=== 2. 생성자 함수 (Legacy / 학습용) ===');

function LegacyIdol(name, year) {
   this.name = name;
   this.year = year;
}

// 메서드를 공유하기 위해 프로토타입에 직접 붙이던 시절... (불편함)
LegacyIdol.prototype.dance = function () {
   console.log(`${this.name}이 춤을 춥니다.`);
};

const legacyMember = new LegacyIdol('가을', 2002);
legacyMember.dance();

console.log('='.repeat(40));

// ==========================================
// [Level 3] 팩토리 함수 (Factory Function)
// 👉 용도: 가벼운 유틸리티 생성 (메모리 효율 낮음)
// ==========================================
console.log('\n=== 3. 팩토리 함수 (가벼운 유틸리티) ===');

const createIdolUtil = (name, year) => {
   return {
      name,
      year,
      // ⚠️ 단점: 객체를 만들 때마다 함수가 새로 생성됨 (메모리 낭비)
      introduce: () => console.log(`[Factory] 저는 ${name}입니다.`),
   };
};

const factoryMember1 = createIdolUtil('레이', 2004);
const factoryMember2 = createIdolUtil('리즈', 2004);

// 서로 다른 함수를 가지고 있음 (메모리 2배)
console.log(
   '함수 공유 여부:',
   factoryMember1.introduce === factoryMember2.introduce,
); // false ❌

console.log('='.repeat(40));

// ==========================================
// [Level 4] 🏆 방탄 클래스 (Robust Class Pattern)
// 👉 용도: 실무 핵심 로직, 데이터 모델링 (Best Practice)
// ==========================================
console.log('\n=== 4. 🏆 방탄 클래스 (실무 최종 정답) ===');

class IdolEntity {
   // 🔒 Private Fields: 외부 해킹 방지
   #name;
   #year;

   constructor({ name, year }) {
      // 🛡️ Validation: 생성 단계에서 불량 데이터 차단
      if (!name || typeof name !== 'string') {
         throw new Error(`잘못된 이름입니다: ${name}`);
      }
      if (!year || typeof year !== 'number') {
         throw new Error(`잘못된 연도입니다: ${year}`);
      }

      this.#name = name;
      this.#year = year;
   }

   // Getter: 읽기 전용 (수정 불가)
   get name() {
      return this.#name;
   }
   get year() {
      return this.#year;
   }

   // 메서드: 모든 인스턴스가 공유함 (메모리 효율적)
   introduce() {
      return `[Class] ${this.#year}년생 ${this.#name}입니다.`;
   }

   // 🏭 Static Factory: 데이터 -> 객체 변환 로봇
   static from(data) {
      return new IdolEntity(data);
   }
}

// --- 실무 시뮬레이션 ---

// 1. API에서 넘어온 날것의 데이터 (불량 섞임)
const rawDataList = [
   { name: '장원영', year: 2004 }, // ✅ 정상
   { name: '이서', year: 2007 }, // ✅ 정상
   { name: '오류남', year: '몰라' }, // ❌ 불량 (연도 문자열)
];

// 2. 안전하게 변환 (Map & Filter)
const safeMembers = rawDataList
   .map((data) => {
      try {
         return IdolEntity.from(data);
      } catch (e) {
         console.warn(`⚠️ 데이터 스킵: ${e.message}`);
         return null;
      }
   })
   .filter((member) => member !== null); // null 제거

// 3. 결과 확인
console.log(`\n총 ${safeMembers.length}명의 멤버가 생성되었습니다.`);

safeMembers.forEach((member) => {
   console.log(member.introduce());
});

// 4. 효율성 증명
const memberA = safeMembers[0];
const memberB = safeMembers[1];
console.log('함수 공유 여부:', memberA.introduce === memberB.introduce); // true ✅ (메모리 절약)

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 최종 요약 가이드
 * ==========================================
 *
 * Q: 실무에서 뭐 써요?
 * A: [Level 4] 방탄 클래스 패턴을 가장 많이 씁니다.
 *    (Class + Private Field + Static Factory)
 *
 * 이유 1. 메모리 효율 (함수 공유)
 * 이유 2. 족보 확인 가능 (instanceof)
 * 이유 3. 데이터 보호 및 검증 (Private & Validation)
 *
 * 👉 이 코드를 템플릿처럼 저장해두고 계속 쓰세요!
 */
