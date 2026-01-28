/**
 * =====================================================================
 * TypeScript: 객체 타입(Object Types) - Executable Note
 * =====================================================================
 * Recommended filename: 03_object_types_optional_readonly.ts
 *
 * ✅ 왜 필요해?
 * - JS 객체는 구조가 자유로워서, 런타임에 "없는 프로퍼티" 접근 같은 실수가 자주 납니다.
 * - TS 객체 타입은 객체의 "모양(구조)"을 미리 정의해서, 실행 전에 실수를 잡아줘요.
 *
 * ⭐ 실무에서 이렇게 씀
 * - API 응답 모델링: User, Product 같은 데이터 구조를 타입으로 고정
 * - 컴포넌트 props / 상태(state) 구조 정의
 * - 설정값/키처럼 바뀌면 안 되는 값은 `readonly`로 보호
 *
 * 🔥 진짜 핵심
 * 1) TS는 이름이 아니라 "구조"로 타입을 판단(구조적 타입 시스템).
 * 2) `?` optional은 "있을 수도 없음" -> 사용 전 체크(좁히기)가 필요.
 * 3) 리터럴 타입은 값 자체를 고정하지만, 데이터 모델에는 과하면 불편할 수 있음.
 */

console.clear?.();

// ---------------------------------------------------------------------
// 1) 객체 리터럴 타입: 인라인으로 "모양" 정의하기
// ---------------------------------------------------------------------
{
   // ✅ 인라인 객체 타입(학습/간단 테스트에 편함)
   const user: {
      id?: number; // ⭐ optional: 있을 수도, 없을 수도 있음 (number | undefined 느낌)
      name: string; // ✅ 일반적으로는 string이 자연스러움(데이터 모델)
   } = {
      id: 1, // ✅ optional이라 없어도 되지만, 있으면 number여야 함
      name: '신재준', // ✅ string
   };

   // 실행 확인용 로그
   console.log('user:', user);
   console.log('user.name:', user.name);

   // optional 사용 시: undefined 가능성 -> 방어적으로 체크
   if (user.id !== undefined) {
      console.log('user.id exists ->', user.id);
   } else {
      console.log('user.id is missing');
   }
}

// ---------------------------------------------------------------------
// 2) 구조적 타입 시스템: "이름"이 아니라 "모양"이 같으면 호환
// ---------------------------------------------------------------------
{
   type Dog = {
      name: string; // ✅ 이름
      color: string; // ✅ 색
   };

   const dog: Dog = {
      name: '돌돌이',
      color: 'blue',
   };

   console.log('dog:', dog);

   // ✅ 구조가 같으면 대입 가능(구조적 타입)
   const anotherDogLike: { name: string; color: string } = dog;
   console.log('anotherDogLike:', anotherDogLike);
}

// ---------------------------------------------------------------------
// 3) 리터럴 타입: "값" 그 자체를 타입으로 고정하기
// ---------------------------------------------------------------------
{
   // ⚠️ 주의: 아래는 string이 아니라 '신재준'만 가능한 타입
   const fixedNameUser: {
      name: '신재준'; // 🔥 리터럴 타입: 오직 이 값만 허용
   } = {
      name: '신재준',
   };

   console.log('fixedNameUser:', fixedNameUser);

   // fixedNameUser.name = '홍길동'; // ❌ 불가(리터럴 타입 고정)

   // ⭐ 실무에서 리터럴 타입은 "상태/모드" 표현에 더 자주 사용
   type RequestState = 'idle' | 'loading' | 'success' | 'error';
   let state: RequestState = 'idle';
   console.log('state:', state);
   state = 'loading';
   console.log('state -> loading:', state);
}

// ---------------------------------------------------------------------
// 4) readonly: 변경되면 안 되는 값을 타입 레벨에서 잠그기
// ---------------------------------------------------------------------
{
   const config: {
      readonly apiKey: string; // 🛡️ 수정 금지(설정/키/토큰 등)
   } = {
      apiKey: 'my-api-key',
   };

   console.log('config.apiKey:', config.apiKey);

   // config.apiKey = 'hacked'; // ❌ 컴파일 에러(readonly)
}

// ---------------------------------------------------------------------
// 🛡️ 방어적 코딩: optional, 리터럴, 객체 모델링 함정
// ---------------------------------------------------------------------
{
   /**
    * 1) optional(`?`)은 "없을 수 있음"을 의미
    *    - 그래서 사용 전 체크가 필요(또는 기본값/좁히기)
    */
   type User = { id?: number; name: string };
   const u1: User = { name: 'A' };

   // ✅ 기본값 제공 패턴(실무에서 자주)
   const safeId = u1.id ?? 0; // id가 없으면 0
   console.log('safeId (u1.id ?? 0):', safeId);

   /**
    * 2) 리터럴 타입을 데이터 모델에 과하게 쓰면 불편
    *    - 예: name: '신재준'은 다른 이름을 못 넣음
    *    - 리터럴은 상태/모드 같은 "제한된 선택지"에 쓰는 편이 좋음
    */

   /**
    * 3) 객체는 "추가 프로퍼티"에 민감할 수 있음(잉여 프로퍼티 검사)
    *    - 리터럴로 바로 넣을 때는 엄격
    *    - 변수에 담아서 넣으면 통과하는 경우가 있음
    */
   type Profile = { name: string };

   // const p1: Profile = { name: 'A', age: 10 }; // ❌ 리터럴은 잉여 프로퍼티 검사로 막힘

   const temp = { name: 'A', age: 10 };
   const p2: Profile = temp; // ✅ 변수 경유 시 통과(구조적 타입 + 검사 규칙 차이)
   console.log('p2 (Profile):', p2);
}

console.log('\n✅ 03 Object Types Executable Note DONE');
