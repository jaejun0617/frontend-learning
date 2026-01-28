/**
 * =====================================================================
 * TypeScript: 원시 타입(Primitive) & 리터럴 타입(Literal)
 * =====================================================================
 * ⭐ 실무 포인트
 * - TS 타입은 “값의 범위(집합)”라고 생각하면 이해가 빠릅니다.
 * - 원시 타입: 가장 기본 범주(number/string/boolean/null/undefined)
 * - 리터럴 타입: 값 그 자체가 타입(예: 10, "hello", true)
 *
 * 🔥 진짜 중요한 것(먼저 읽기)
 * 1) 타입은 "대충"이 아니라 "허용되는 값의 범위"를 제한한다.
 * 2) 리터럴 타입 + 유니온은 상태/모드(예: "idle" | "loading")에 매우 자주 쓴다.
 * 3) null/undefined는 strict 모드에서 더 엄격하게 다뤄진다.
 */

console.clear?.();

// ---------------------------------------------------------------------
// 0) 빠른 핵심 요약 (면접/복습용)

// ---------------------------------------------------------------------
{
   /**
    * Primitive = 값의 큰 분류(숫자/문자/불리언/없음)
    * Literal   = "딱 그 값만" 허용(10만 허용, 'hello'만 허용)
    */
}

// =====================================================================
// 1) Primitive Types (원시 타입)
// =====================================================================
{
   // 1-1) number: 정수/실수/특수값(Infinity, NaN)까지 포함
   let num1: number = 123;
   let num2: number = -123;
   let num3: number = 0.123;
   let num4: number = -0.123;

   // JS number의 특수 값들도 number 타입에 포함
   let num5: number = Infinity;
   let num6: number = -Infinity;
   let num7: number = NaN;

   // 1-2) string: 작은따옴표/큰따옴표/템플릿 리터럴 모두 가능
   let str1: string = 'hello';
   let str2: string = 'hello';
   let str3: string = `hello`;

   // 템플릿 리터럴은 "값 삽입"에 강함
   let str4: string = `hello ${num1}`;

   // 1-3) boolean: true / false
   let bool1: boolean = true;
   let bool2: boolean = false;

   // 1-4) null / undefined
   // - strict 모드에서는 "null을 number에 넣기" 같은 게 기본적으로 막힘
   // - 값이 '없음'을 표현할 때 명시적으로 사용
   let null1: null = null;
   let undef1: undefined = undefined;

   // ❌ strict:true 에서는 보통 이런 할당이 막힘(이유: 런타임 오류 예방)
   // let numA: number = null;

   // (참고) 실제 실무에서는 아래처럼 "유니온"으로 표현하는 경우가 많음
   // let price: number | null = null;
   // let name: string | undefined;
}

// =====================================================================
// 2) Literal Types (리터럴 타입)
// =====================================================================
{
   /**
    * 리터럴 타입은 "값"이 곧 타입이 됩니다.
    * - number literal: 10, 0, 999
    * - string literal: 'hello', 'dark'
    * - boolean literal: true, false
    */

   // 2-1) number literal: 10만 허용
   let onlyTen: 10 = 10;
   // onlyTen = 12; // ❌ 10만 가능

   // 2-2) string literal: 'hello'만 허용
   let onlyHello: 'hello' = 'hello';
   // onlyHello = 'hi'; // ❌ 'hello'만 가능

   // 2-3) boolean literal: true만 허용
   let onlyTrue: true = true;
   // onlyTrue = false; // ❌ true만 가능

   // ⭐ 실무에서 가장 많이 쓰는 형태: "리터럴 + 유니온" (상태/모드 표현)
   type RequestState = 'idle' | 'loading' | 'success' | 'error';

   let state: RequestState = 'idle';
   state = 'loading';
   // state = 'pending'; // ❌ 허용되지 않는 상태

   // 예: 테마/권한/정렬 같은 UI 옵션에도 자주 사용
   type Theme = 'light' | 'dark';
   const theme: Theme = 'dark';

   // (주의) 리터럴은 너무 과하게 쓰면 유연성이 떨어질 수 있음
   // -> "정말 제한하고 싶은 값"에만 사용하면 베스트
}

// ---------------------------------------------------------------------
// ✅ 복습 체크리스트 (10초 점검)
// ---------------------------------------------------------------------
{
   /**
    * [ ] number/string/boolean/null/undefined가 원시 타입이다.
    * [ ] 리터럴 타입은 "값" 그 자체를 타입으로 제한한다.
    * [ ] 리터럴 + 유니온은 상태/모드 모델링에 매우 자주 사용한다.
    * [ ] strict 모드에서는 null/undefined가 더 엄격하게 동작한다.
    */
}
