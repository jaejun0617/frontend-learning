/**
 * =====================================================================
 * TypeScript: any vs unknown - 학습+실무 템플릿 (Executable Note)
 * =====================================================================
 * Recommended filename: 06_any_unknown_safety.ts
 *
 * ✅ Keynote (핵심정리 먼저) ⭐🔥
 * - any: 타입 검사를 "포기"한다. (TS의 안전장치를 끈다) → 되도록 금지 ⭐🛡️
 * - unknown: "모른다"를 안전하게 표현한다. (사용 전 좁히기 필수) ⭐
 * - 실무에서는 외부 입력(API/사용자 입력/로컬스토리지)을 unknown으로 받고,
 *   타입가드로 검증한 뒤 안전한 타입으로 변환하는 패턴이 정석 🔥
 */

console.clear?.();

// ---------------------------------------------------------------------
// [Utility] 출력 포맷(학습 가독성)
// ---------------------------------------------------------------------
const line = (n = 70) => '='.repeat(n);
const section = (title: string) => {
   console.log(`\n${line()}\n▶ ${title}\n${line()}`);
};

// =====================================================================
// 1) [초급] any: "무슨 타입이든 OK" (하지만 대가가 큼) 🛡️
// =====================================================================
{
   section('1. [초급] any (되도록 쓰지 말기 🛡️)');

   // any는 TS 타입 체크를 사실상 꺼버림
   // - 아래 코드는 타입 에러 없이 통과하지만 런타임에서 터질 수 있음
   let anyValue: any = 10; // ✅ 어떤 타입이든 될 수 있음

   console.log('anyValue (start):', anyValue);

   anyValue = 'hello'; // ✅ 문자열도 OK
   console.log('anyValue -> string:', anyValue);

   // ❗ any는 "없는 메서드"를 호출해도 컴파일이 막지 않음
   // 런타임에서 TypeError가 날 수 있어 위험
   try {
      // 예: 숫자에 toUpperCase는 없는데 any면 통과해버림
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      console.log('anyValue.toUpperCase():', anyValue.toUpperCase());
   } catch (e) {
      console.log('❌ 런타임 에러 발생 가능(any 위험):', e);
   }

   // any는 다른 타입에 "무단 대입"이 가능해서 타입 안정성을 무너뜨림
   let safeNumber: number = 123;
   safeNumber = anyValue; // ⚠️ 컴파일이 막지 않음 (문자열이 들어갈 수도 있음)
   console.log('safeNumber (but polluted by any):', safeNumber);
}

// =====================================================================
// 2) [중급] unknown: "모르겠음"을 안전하게 다루기 ⭐
// =====================================================================
{
   section('2. [중급] unknown (안전한 모름 ⭐)');

   // unknown은 any처럼 무엇이든 담을 수 있지만,
   // "사용"하려면 먼저 타입을 확인(좁히기)해야 함
   let unknownValue: unknown;

   unknownValue = 10;
   console.log('unknownValue -> number:', unknownValue);

   unknownValue = 'hello';
   console.log('unknownValue -> string:', unknownValue);

   unknownValue = { ok: true };
   console.log('unknownValue -> object:', unknownValue);

   // ❌ unknown은 바로 메서드 호출/대입이 불가(안전장치)
   // unknownValue.toUpperCase(); // 컴파일 에러

   // ✅ 타입 좁히기(narrowing) 후 안전하게 사용
   if (typeof unknownValue === 'string') {
      console.log('narrowed string:', unknownValue.toUpperCase());
   } else if (typeof unknownValue === 'number') {
      console.log('narrowed number:', unknownValue.toFixed(2));
   } else {
      console.log('narrowed else: not string/number');
   }

   // ❌ number에 바로 대입도 막힘(안전)
   // let n: number = unknownValue; // 컴파일 에러
}

// =====================================================================
// 3) [고급] 타입가드 함수: unknown을 안전한 타입으로 "변환" 🔥
// =====================================================================
{
   section('3. [고급] 사용자 정의 타입가드 (unknown -> 안전 타입) 🔥');

   // 실무에서 API/Storage/QueryString은 unknown으로 받고
   // "검증"을 통과한 경우에만 안전한 타입으로 변환하는 흐름이 정석 ⭐
   type User = {
      id: string;
      name: string;
   };

   // 🔥 사용자 정의 타입가드: 반환 타입이 `value is User`
   // - 이 함수가 true를 반환하면, TS가 value를 User로 좁혀줌
   const isUser = (value: unknown): value is User => {
      // 1) object인지 확인(주의: null도 typeof object)
      if (typeof value !== 'object' || value === null) return false;

      // 2) 안전하게 속성 접근을 위해 Record로 캐스팅
      const v = value as Record<string, unknown>;

      return typeof v.id === 'string' && typeof v.name === 'string';
   };

   const fromApi: unknown = { id: 'u_1', name: '신재준' };

   if (isUser(fromApi)) {
      // 여기서 fromApi는 User로 좁혀짐
      console.log('✅ valid user:', fromApi.id, fromApi.name);
   } else {
      console.log('❌ invalid user payload:', fromApi);
   }
}

// =====================================================================
// 4) [실무패턴] unknown 입력 + parse/validate + 안전한 반환 ⭐
// =====================================================================
{
   section('4. [실무패턴] parse + validate + safe return ⭐');

   // 예: localStorage / API 응답(JSON string) -> unknown -> 안전 타입
   type Settings = {
      theme: 'light' | 'dark';
      fontSize: number;
   };

   const DEFAULT_SETTINGS: Settings = {
      theme: 'light',
      fontSize: 14,
   };

   const isSettings = (value: unknown): value is Settings => {
      if (typeof value !== 'object' || value === null) return false;
      const v = value as Record<string, unknown>;

      const themeOk = v.theme === 'light' || v.theme === 'dark';
      const fontOk = typeof v.fontSize === 'number';

      return themeOk && fontOk;
   };

   // ⭐ 실무 함수 패턴: 실패하면 기본값으로 폴백(안전)
   const parseSettings = (json: string): Settings => {
      try {
         const parsed: unknown = JSON.parse(json);
         if (isSettings(parsed)) return parsed;
         return DEFAULT_SETTINGS;
      } catch {
         return DEFAULT_SETTINGS;
      }
   };

   const raw1 = '{"theme":"dark","fontSize":16}';
   const raw2 = '{"theme":"purple","fontSize":"big"}';
   const raw3 = 'not-json';

   console.log('parseSettings(raw1):', parseSettings(raw1));
   console.log('parseSettings(raw2):', parseSettings(raw2));
   console.log('parseSettings(raw3):', parseSettings(raw3));
}

// =====================================================================
// 🛡️ 방어적 코딩: 함정/주의사항
// =====================================================================
{
   section('🛡️ 방어적 코딩: 함정 & 주의사항');

   /**
    * 1) any는 "타입 시스템을 끄는 스위치"다
    *    - 어떤 코드든 통과 -> 런타임 오류 + 리팩토링 지옥
    *    - 되도록 unknown + 타입가드로 바꾸는 게 정석 ⭐
    */

   /**
    * 2) unknown은 안전하지만 "귀찮음"이 있다
    *    - 사용 전 반드시 좁히기 필요
    *    - 그래서 실무에선 타입가드/파서 함수로 공통화(재사용) ⭐
    */

   /**
    * 3) typeof null === 'object' 함정
    *    - 객체 체크 시 value === null 조건을 같이 넣어야 안전 🛡️
    */

   /**
    * 4) JSON.parse 결과는 무조건 unknown으로 받아라
    *    - JSON.parse는 런타임 데이터 → TS가 보장 못함
    *    - 바로 캐스팅(as Settings)은 "거짓 안전"이 될 수 있음 🛡️
    */

   /**
    * 5) 'as any'로 급한 불 끄면, 나중에 더 큰 불이 남
    *    - 당장은 편하지만, 프로젝트가 커질수록 타입 안전이 무너짐
    */

   console.log('✅ 방어 섹션 체크 완료');
}

// =====================================================================
// ✅ 복습 핵심정리 (10~12개)
// =====================================================================
{
   section('✅ 복습 핵심정리 (10~12개)');

   const recap = [
      '1) any는 타입 체크를 포기한다(안전장치 OFF). 🛡️',
      '2) any는 없는 메서드 호출도 통과해 런타임 오류를 만든다. 🛡️',
      '3) any는 다른 타입에 무단 대입을 허용해 타입 안정성을 오염시킨다. 🛡️',
      '4) unknown은 무엇이든 담지만, 사용 전 좁히기(검증)가 필수다. ⭐',
      '5) unknown은 다른 타입에 바로 대입이 막혀 안전하다. ⭐',
      '6) narrowing( typeof / instanceof / in )로 unknown을 안전하게 사용한다.',
      '7) 사용자 정의 타입가드(value is T)는 실무에서 매우 유용하다. 🔥',
      '8) API/Storage/JSON.parse 결과는 unknown으로 받고 검증 후 변환한다. 🔥',
      '9) 검증 실패 시 기본값 폴백 전략이 안정적이다. ⭐',
      '10) typeof null === "object" 함정은 항상 null 체크로 방어한다. 🛡️',
      '11) as any는 최후의 수단이며, 가능하면 타입가드로 대체한다. 🛡️',
      '12) 팀 레벨에서 any 금지 룰(ESLint) 도입이 도움이 된다. ⭐',
   ];

   recap.forEach((item) => console.log(item));
}

console.log(
   `\n${line()}\n✅ 06 any vs unknown Executable Note DONE\n${line()}`,
);
