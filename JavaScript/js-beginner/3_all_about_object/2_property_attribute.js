/**
 * =====================================================================
 * JavaScript Property Attribute(프로퍼티 어트리뷰트) - 학습 + 실무 템플릿 (2026)
 * =====================================================================
 * ⭐ = 실무에서 자주 씀 / 🔥 = 중요·심화 / 🛡️ = 방어적 코딩(Safety)
 *
 * [핵심정리(먼저 읽기) 🔥]
 * 1) 프로퍼티 어트리뷰트는 "프로퍼티의 동작 규칙"이다.
 *    - value / writable / enumerable / configurable
 * 2) 기본값(일반 리터럴로 만든 프로퍼티): writable✅ enumerable✅ configurable✅
 * 3) defineProperty로 만들면 기본값이 다르다(특히 enumerable❌). → 명시가 안전 🛡️
 * 4) 실무에서 제일 자주 쓰는 조합 ⭐
 *    - 읽기 전용: writable:false
 *    - 숨김(내부용): enumerable:false
 *    - 완전 고정: configurable:false (+ 필요하면 writable:false)
 * 5) Seal vs Freeze 🔥
 *    - seal: 추가/삭제 ❌, 수정 ✅
 *    - freeze: 추가/삭제/수정 ❌ (얕은 동결)
 */

console.clear?.();

// ---------------------------------------------------------------------
// [Utility] 출력 포맷팅
// ---------------------------------------------------------------------
const line = (n = 76) => '='.repeat(n);
const section = (title) => {
   console.log(`\n${line()}`);
   console.log(`▶ ${title}`);
   console.log(line());
};

// =====================================================================
// 1) [초급] 데이터 프로퍼티 vs 접근자(get/set) 프로퍼티
// =====================================================================
{
   section('1. [초급] Data Property vs Accessor Property');

   /**
    * 왜 구분하나?
    * - 데이터 프로퍼티: 값을 직접 가진다.
    * - 접근자 프로퍼티(get/set): 값을 "가진 척" 하지만 내부 로직(계산/검증)을 실행한다. 🔥
    */

   const person = {
      // 데이터 프로퍼티
      name: '신재준',
      year: 1996,

      // 접근자 프로퍼티 (getter)
      get age() {
         // 왜 getter? 호출부가 person.getAge() 대신 person.age로 읽어서 더 직관적
         return new Date().getFullYear() - this.year;
      },

      // 접근자 프로퍼티 (setter)
      set age(nextAge) {
         // 🛡️ setter는 "직접 할당"처럼 보이지만 내부적으로는 검증/변환 수행
         if (!Number.isFinite(nextAge) || nextAge < 0) {
            throw new TypeError('age는 0 이상의 숫자여야 합니다.');
         }
         this.year = new Date().getFullYear() - nextAge;
      },
   };

   console.log('name:', person.name);
   console.log('age(getter):', person.age);

   person.age = 20;
   console.log('age 변경 후 year:', person.year);
}

// =====================================================================
// 2) [중급] descriptor 읽기: getOwnPropertyDescriptor(s)
// =====================================================================
{
   section('2. [중급] Descriptor 읽기 (getOwnPropertyDescriptor)');

   /**
    * 왜 descriptor를 보나?
    * - 객체는 "값" 뿐 아니라 "규칙"도 같이 가진다.
    * - 디버깅할 때 "왜 수정이 안 되지?" 같은 문제의 정답이 descriptor에 있다. ⭐
    */

   const obj = { name: '안유진', year: 2003 };

   const desc = Object.getOwnPropertyDescriptor(obj, 'name');
   console.log('name descriptor:', desc);

   console.log('all descriptors:', Object.getOwnPropertyDescriptors(obj));
}

// =====================================================================
// 3) [고급] 🔥 3대 어트리뷰트(writable/enumerable/configurable) 실험
// =====================================================================
{
   section('3. [고급] writable/enumerable/configurable 실험 🔥');

   // (1) writable: false → 값 변경 차단
   const user = {};
   Object.defineProperty(user, 'id', {
      value: 'user_123',
      writable: false, // 🔥 변경 불가
      enumerable: true,
      configurable: true,
   });

   console.log('user.id:', user.id);

   // strict mode가 아니면 "조용히 무시"될 수 있다. 그래서 테스트는 try/catch로 보는 게 안전 🛡️
   try {
      user.id = 'user_456';
   } catch (e) {
      console.log('id 변경 에러:', e?.message);
   }
   console.log('id 변경 후:', user.id);

   // (2) enumerable: false → 반복/직렬화에서 숨김
   const product = { name: '노트북', price: 1500000 };
   Object.defineProperty(product, 'internalCode', {
      value: 'PROD_12345',
      enumerable: false, // 🔥 숨김
      writable: true,
      configurable: true,
   });

   console.log('Object.keys:', Object.keys(product)); // internalCode 제외
   console.log('JSON.stringify:', JSON.stringify(product)); // internalCode 제외
   console.log('direct access:', product.internalCode); // 접근은 가능

   // (3) configurable: false → 재정의/삭제 차단
   const settings = {};
   Object.defineProperty(settings, 'apiKey', {
      value: 'secret_key_123',
      writable: true,
      enumerable: false,
      configurable: false, // 🔥 재정의/삭제 불가
   });

   try {
      Object.defineProperty(settings, 'apiKey', { enumerable: true });
   } catch (e) {
      console.log('재정의 실패:', e?.message);
   }

   delete settings.apiKey; // 삭제 실패(조용히 무시)
   console.log('삭제 시도 후 apiKey:', settings.apiKey);

   // ⚠️ 예외 규칙: configurable:false라도 writable은 true→false로만 변경 가능
   Object.defineProperty(settings, 'apiKey', { writable: false });
   console.log(
      'writable만 변경:',
      Object.getOwnPropertyDescriptor(settings, 'apiKey'),
   );
}

// =====================================================================
// 4) [실무패턴] ⭐ 실전 조합: 상수/숨김/읽기전용/봉인/동결
// =====================================================================
{
   section('4. [실무패턴] 조합 패턴 모음 ⭐');

   // --------------------------------------------------------
   // 패턴 1) 상수(완전 고정) ⭐
   // --------------------------------------------------------
   /**
    * 왜 이런 조합?
    * - 상수는 바뀌면 시스템 전체가 흔들림
    * - 그래서 writable:false + configurable:false로 "완전 고정"이 흔함
    */
   const CONFIG = {};
   Object.defineProperties(CONFIG, {
      API_URL: {
         value: 'https://api.example.com',
         writable: false,
         enumerable: true,
         configurable: false,
      },
      TIMEOUT: {
         value: 5000,
         writable: false,
         enumerable: true,
         configurable: false,
      },
   });

   CONFIG.API_URL = 'https://hack.com'; // 무시(또는 strict에서는 에러)
   console.log('CONFIG:', CONFIG);

   // --------------------------------------------------------
   // 패턴 2) 내부 메타데이터 숨기기(enumerable:false) ⭐
   // --------------------------------------------------------
   class User {
      constructor(username, password) {
         this.username = username;
         this.createdAt = new Date();

         // 🛡️ 민감 정보는 반복/JSON에서 빠지는 게 기본 안전선
         Object.defineProperty(this, '_password', {
            value: password,
            writable: true,
            enumerable: false,
            configurable: false,
         });

         Object.defineProperty(this, '_loginAttempts', {
            value: 0,
            writable: true,
            enumerable: false,
            configurable: false,
         });
      }

      login(password) {
         if (this._password === password) {
            this._loginAttempts = 0;
            return '✅ 로그인 성공';
         }
         this._loginAttempts += 1;
         return `❌ 로그인 실패 (${this._loginAttempts}회)`;
      }

      // ⭐ toJSON을 주면 "외부로 내보낼 형태"를 통제 가능
      toJSON() {
         return {
            username: this.username,
            createdAt: this.createdAt,
         };
      }
   }

   const u = new User('yujin', 'password123');
   console.log('keys:', Object.keys(u)); // _password, _loginAttempts 제외
   console.log('json:', JSON.stringify(u)); // 민감 정보 제외
   console.log(u.login('wrong'));
   console.log(u.login('password123'));

   // --------------------------------------------------------
   // 패턴 3) seal vs freeze 🔥
   // --------------------------------------------------------
   const sealedObj = { name: '안유진', age: 21 };
   Object.seal(sealedObj);
   sealedObj.name = '장원영'; // ✅ 수정 가능
   sealedObj.newProp = 'nope'; // ❌ 추가 불가
   delete sealedObj.age; // ❌ 삭제 불가
   console.log('sealed:', sealedObj, 'isSealed:', Object.isSealed(sealedObj));

   const frozenObj = { name: '가을', age: 22 };
   Object.freeze(frozenObj);
   frozenObj.name = '레이'; // ❌ 수정 불가
   frozenObj.newProp = 'nope'; // ❌ 추가 불가
   delete frozenObj.age; // ❌ 삭제 불가
   console.log('frozen:', frozenObj, 'isFrozen:', Object.isFrozen(frozenObj));
}

// =====================================================================
// 5) [핵심정리] 복습 체크리스트 12개 ✅
// =====================================================================
{
   section('5. [핵심정리] 복습 체크리스트 12개 ✅');

   const checklist = [
      '프로퍼티 어트리뷰트는 프로퍼티의 "동작 규칙"이다. 🔥',
      '데이터 프로퍼티는 value를 갖고, 접근자 프로퍼티는 get/set으로 동작한다. 🔥',
      '일반 리터럴 프로퍼티 기본값: writable/enumerable/configurable 모두 true다.',
      'defineProperty로 만든 프로퍼티는 기본값이 false일 수 있어 항상 명시가 안전하다. 🛡️',
      'writable:false는 값 변경을 막아 읽기 전용 속성을 만든다. ⭐',
      'enumerable:false는 Object.keys/for...in/JSON.stringify에서 숨긴다. ⭐',
      'configurable:false는 재정의/삭제를 막아 완전 고정에 가깝다. ⭐',
      'configurable:false라도 writable은 true→false로만 변경 가능하다. 🔥',
      'descriptor는 "왜 안 바뀌지?" 같은 디버깅의 정답이다. ⭐',
      '민감 정보는 enumerable:false + toJSON으로 출력 통제하는 게 안전하다. 🛡️',
      'seal은 추가/삭제만 막고 수정은 허용한다. 🔥',
      'freeze는 추가/삭제/수정 모두 막는다(얕은 동결). 🔥',
   ];

   checklist.forEach((item, idx) => {
      console.log(`${String(idx + 1).padStart(2, '0')}. ${item}`);
   });
}

console.log(`\n${line()}`);
console.log('Property Attribute 최종 템플릿 끝! ✅');
console.log(line());
