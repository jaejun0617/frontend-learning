/**
 * ==========================================
 * JavaScript 에러 핸들링 (Error Handling) 완벽 정리
 * ==========================================
 *
 * ⭐ = 실무 필수 패턴
 * 🔥 = 비동기 통신(API)에서 무조건 사용
 *
 * [핵심 개념]
 * 1. try: 에러가 발생할 수 있는 코드를 실행
 * 2. catch: 에러가 발생했을 때 잡아내는 곳 (복구/로깅)
 * 3. finally: 성공하든 실패하든 무조건 실행 (청소/로딩해제)
 * 4. throw: 에러를 강제로 발생시킴 (던지기)
 */

// ==========================================
// 1. 기본 문법 (Basic Syntax)
// ==========================================
console.log('=== 1. 기본 문법 ===');

function runner() {
   console.log('--- 실행 시작 ---');

   try {
      console.log('1. 정상 코드 실행');

      // 🔥 에러 강제 발생 (throw)
      // Error 객체를 만들어서 던지는 것이 관례입니다.
      throw new Error('데이터를 불러오는데 실패했습니다!');
   } catch (e) {
      console.log('--- catch (에러 잡음) ---');

      // e는 Error 객체입니다.
      console.log('에러 내용:', e);
   } finally {
      console.log('--- finally (무조건 실행) ---');
      // 용도: 로딩 스피너 종료, DB 연결 해제 등
      console.log('3. 작업 마무리 및 리소스 해제');
   }
}

runner();

console.log('='.repeat(40));

// ==========================================
// 2. Error 객체의 핵심 속성 ⭐⭐
// ==========================================
console.log('\n=== 2. Error 객체 뜯어보기 ===');

try {
   // 없는 함수 호출 (ReferenceError 발생)
   nonExistentFunction();
} catch (e) {
   console.log('1. 에러 이름 (name):', e.name); // 예: ReferenceError
   console.log('2. 에러 메시지 (message):', e.message); // 예: nonExistentFunction is not defined

   // 🔥 스택 트레이스 (Stack Trace) - 디버깅의 핵심
   // 에러가 어디서 발생했는지 파일 위치와 줄 번호를 알려줌
   console.log('3. 스택 트레이스 (stack):', e.stack);
}

console.log('='.repeat(40));

// ==========================================
// 3. 실무형 패턴: 비동기 에러 핸들링 (Async/Await) 🔥🔥🔥
// ==========================================
console.log('\n=== 3. [실무] 비동기 에러 핸들링 ===');

/**
 * 실무에서는 API 통신할 때 가장 많이 씁니다.
 * try-catch가 없으면 네트워크 에러 시 앱이 멈춰버립니다.
 */

const fetchUserData = async () => {
   try {
      console.log('⏳ 서버 데이터 요청 중...');

      // 1초 뒤에 에러가 나는 상황 시뮬레이션
      await new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error('404 Not Found (서버 에러)'));
         }, 1000);
      });

      console.log('✅ 데이터 수신 완료'); // 실행 안됨
   } catch (e) {
      console.log(`🚨 에러 발생: ${e.message}`);

      // 실무 팁: 여기서 '에러 페이지'로 이동시키거나 '토스트 메시지'를 띄움
      // alert('잠시 후 다시 시도해주세요.');
   } finally {
      console.log('🧹 로딩 스피너 끄기 (isLoading = false)');
   }
};

// fetchUserData(); // (비동기라 로그가 섞일 수 있어 주석 처리함)

console.log('='.repeat(40));

// ==========================================
// 4. 에러 다시 던지기 (Re-throwing) ⭐ 고급
// ==========================================
console.log('\n=== 4. 에러 다시 던지기 (Re-throwing) ===');

/**
 * catch에서 해결할 수 없는 에러라면?
 * 로그만 남기고 다시 던져서 상위 함수가 처리하게 만듦.
 */

function dangerousWork() {
   try {
      throw new Error('치명적인 에러');
   } catch (e) {
      console.log('⚠️ 내부에서 1차 기록 남김');
      // 여기서 해결 못하겠음, 밖으로 던짐
      throw e;
   }
}

try {
   dangerousWork();
} catch (e) {
   console.log('🚨 메인 시스템에서 최종 포착:', e.message);
}

console.log('='.repeat(40));

// ==========================================
// 5. 커스텀 에러 만들기 (Custom Error) ⭐ 고급
// ==========================================
console.log('\n=== 5. 커스텀 에러 클래스 ===');

/**
 * 그냥 Error 말고, 상황에 맞는 구체적인 에러를 만듦
 */

class PasswordTooShortError extends Error {
   constructor(message) {
      super(message);
      this.name = 'PasswordTooShortError';
   }
}

function register(password) {
   if (password.length < 5) {
      throw new PasswordTooShortError('비밀번호는 5자 이상이어야 합니다.');
   }
   return '가입 성공';
}

try {
   register('1234');
} catch (e) {
   if (e instanceof PasswordTooShortError) {
      console.log('❌ 비밀번호 에러:', e.message);
   } else {
      console.log('❌ 알 수 없는 에러:', e.message);
   }
}

console.log('='.repeat(40));

/**
 * ==========================================
 * 🔥 핵심 요약
 * ==========================================
 *
 * 1. 에러를 발생시킬 땐 문자열 말고 `new Error('메시지')` 객체를 던지자. (스택 추적을 위해)
 * 2. API 요청(`async/await`)이나 JSON 파싱(`JSON.parse`)은 반드시 try-catch로 감싸야 한다.
 * 3. finally는 성공/실패 여부와 상관없이 무조건 실행된다. (로딩 종료 처리에 필수)
 * 4. catch 블록 안을 비워두지 마라. 최소한 `console.error(e)`라도 찍어야 디버깅이 가능하다.
 */

/**
 * =====================================================================
 * 16_try_catch.js - Error Handling (2026 실무형 템플릿)
 * =====================================================================
 * 목표
 * 1) try/catch/finally/throw 기본 + "왜"를 이해
 * 2) 실무에서 가장 많이 터지는 에러(입력 검증/JSON 파싱/비동기 통신) 패턴 확보
 * 3) 에러 분류(운영/개발), 로깅, 사용자 메시지 분리, 재시도(retry)까지 한 번에 정리
 *
 * 핵심 철학
 * - 에러는 숨기지 말고 "분류"해서 다루자
 * - 사용자에게는 친절한 메시지, 개발자에게는 디버깅 가능한 정보
 * - 비동기는 try/catch + finally(로딩 해제)가 기본
 */

console.clear?.();
console.log('='.repeat(60));
console.log('16) Error Handling - try/catch/finally/throw');
console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 0) 유틸: 에러를 "표준 형태"로 정리(로그/토스트/서버 전송용)
// ---------------------------------------------------------------------

/**
 * ✅ normalizeError
 * - 왜? catch의 e는 뭐가 들어올지 확정이 아님(throw '문자열' 같은 케이스)
 * - 그래서 "항상" name/message/stack을 가진 형태로 변환해두면 실무가 편해짐
 */
function normalizeError(e) {
   if (e instanceof Error) {
      return {
         name: e.name,
         message: e.message,
         stack: e.stack,
      };
   }

   // throw가 문자열/객체로 올 수도 있으니 방어
   return {
      name: 'UnknownError',
      message: typeof e === 'string' ? e : JSON.stringify(e),
      stack: undefined,
   };
}

/**
 * ✅ reportError
 * - 왜? 실무에서 catch마다 console.log 찍으면 누락/중복이 생김
 * - 중앙에서 로그 전략을 통일하면 디버깅이 훨씬 쉬워짐
 */
function reportError(e, context = {}) {
   const err = normalizeError(e);

   // 개발 환경에서는 stack까지 (운영에선 Sentry/Datadog 같은 곳으로 보냄)
   console.error('[ERROR]', {
      ...context,
      ...err,
   });
}

// ---------------------------------------------------------------------
// 1) 기본 문법: try / catch / finally / throw
// ---------------------------------------------------------------------
console.log('\n=== 1) 기본 문법 ===');

function runBasic() {
   console.log('--- 실행 시작 ---');

   try {
      console.log('1) 정상 코드 실행');

      // ✅ throw는 문자열보다 Error 객체 권장
      // - 왜? stack trace가 있어야 "어디서" 터졌는지 추적 가능
      throw new Error('데이터를 불러오는데 실패했습니다!');
   } catch (e) {
      console.log('--- catch: 에러 잡음 ---');
      reportError(e, { scope: 'runBasic' });
   } finally {
      // ✅ finally는 성공/실패 상관없이 실행
      // - 왜? 로딩 해제 / 리소스 정리(타이머, 이벤트, 연결) 등은 무조건 해야 함
      console.log('--- finally: 무조건 실행 ---');
      console.log('3) 작업 마무리(리소스 정리/로딩 해제)');
   }
}

runBasic();
console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 2) Error 객체: name / message / stack
// ---------------------------------------------------------------------
console.log('\n=== 2) Error 객체 뜯어보기 ===');

try {
   // 없는 함수 호출 -> ReferenceError
   nonExistentFunction();
} catch (e) {
   const err = normalizeError(e);
   console.log('name:', err.name);
   console.log('message:', err.message);
   // stack은 길어서 전체를 출력하면 지저분할 수 있음
   console.log('stack exists?', Boolean(err.stack));
}

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 3) 실무 패턴 A: 입력 검증(Validation) + 커스텀 에러
// ---------------------------------------------------------------------
console.log('\n=== 3) [실무] 입력 검증 + 커스텀 에러 ===');

class ValidationError extends Error {
   constructor(message, meta) {
      super(message);
      this.name = 'ValidationError';
      this.meta = meta;
   }
}

/**
 * ✅ assert
 * - 왜? 조건이 깨지면 "빨리" 실패시키는 게 유지보수에 좋음
 * - (중첩 if 제거 + 에러가 난 지점을 명확히)
 */
function assert(condition, message, meta) {
   if (!condition) throw new ValidationError(message, meta);
}

function register(password) {
   // ✅ 정책(비즈니스 룰)은 예외로 표현하면 흐름이 깔끔
   assert(typeof password === 'string', '비밀번호는 문자열이어야 합니다.', {
      password,
   });
   assert(password.length >= 5, '비밀번호는 5자 이상이어야 합니다.', {
      length: password.length,
   });

   return '가입 성공';
}

try {
   register('1234');
} catch (e) {
   if (e instanceof ValidationError) {
      // 사용자에게 보여줄 메시지(친절하게)
      console.log('❌ 입력 오류:', e.message);
      // 개발자용 컨텍스트(디버깅)
      reportError(e, { scope: 'register', meta: e.meta });
   } else {
      console.log('❌ 알 수 없는 오류');
      reportError(e, { scope: 'register' });
   }
}

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 4) 실무 패턴 B: JSON 파싱은 반드시 try/catch
// ---------------------------------------------------------------------
console.log('\n=== 4) [실무] JSON.parse 에러 핸들링 ===');

function safeJSONParse(jsonText) {
   try {
      // ✅ JSON.parse는 형식 조금만 틀려도 바로 SyntaxError
      return { ok: true, value: JSON.parse(jsonText) };
   } catch (e) {
      reportError(e, { scope: 'safeJSONParse', jsonText });
      return { ok: false, error: normalizeError(e) };
   }
}

console.log(safeJSONParse('{"a": 1}'));
console.log(safeJSONParse('{a: 1}')); // ❌

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 5) 실무 패턴 C: async/await 에러 핸들링 + finally(로딩)
// ---------------------------------------------------------------------
console.log('\n=== 5) [실무] async/await + finally (로딩 해제) ===');

/**
 * ✅ mockApi
 * - 실제 fetch 대신 실패/성공을 시뮬레이션
 */
async function mockApi({ shouldFail = false, delay = 400 } = {}) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldFail) reject(new Error('503 Service Unavailable'));
         else resolve({ ok: true, data: { id: 1, name: '안유진' } });
      }, delay);
   });
}

async function fetchUserData() {
   let isLoading = true;

   try {
      console.log('⏳ 요청 시작');
      const res = await mockApi({ shouldFail: true });
      console.log('✅ 응답:', res);
      return res;
   } catch (e) {
      // ✅ 사용자 메시지(간단) + 개발자 로그(상세) 분리
      console.log('🚨 잠시 후 다시 시도해주세요.');
      reportError(e, { scope: 'fetchUserData' });
      return null;
   } finally {
      // ✅ 어떤 경우든 로딩 해제
      isLoading = false;
      console.log('🧹 로딩 종료:', isLoading);
   }
}

// fetchUserData(); // 비동기 로그가 섞일 수 있어 필요할 때만 실행

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 6) 고급: 재시도(Retry) 패턴 (네트워크에서 자주 씀)
// ---------------------------------------------------------------------
console.log('\n=== 6) [고급] Retry 패턴 ===');

/**
 * ✅ retry
 * - 왜? 네트워크는 일시적으로 실패할 수 있음
 * - 일정 횟수만 재시도하면 UX가 좋아짐
 *
 * 옵션
 * - retries: 총 재시도 횟수
 * - delayMs: 재시도 전 대기
 * - shouldRetry: 어떤 에러면 재시도할지 결정(확장 포인트)
 */
async function retry(task, { retries = 2, delayMs = 300, shouldRetry } = {}) {
   let lastError;

   for (let attempt = 0; attempt <= retries; attempt++) {
      try {
         return await task(attempt);
      } catch (e) {
         lastError = e;

         const allowRetry =
            typeof shouldRetry === 'function' ? shouldRetry(e) : true;

         if (!allowRetry || attempt === retries) {
            throw e; // ✅ 최종 실패는 밖에서 처리
         }

         // ✅ 재시도 전 대기
         await new Promise((r) => setTimeout(r, delayMs));
      }
   }

   // 이 라인은 논리상 도달하지 않지만, 타입 안정성을 위해 반환
   throw lastError;
}

(async () => {
   try {
      // 1~2번은 실패, 3번째에 성공시키는 시뮬레이션
      const res = await retry(
         async (attempt) => {
            const shouldFail = attempt < 2;
            return await mockApi({ shouldFail, delay: 200 });
         },
         { retries: 3, delayMs: 250 },
      );

      console.log('✅ retry 성공:', res);
   } catch (e) {
      console.log('🚨 retry 최종 실패');
      reportError(e, { scope: 'retry-demo' });
   }
})();

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 7) 고급: 에러 다시 던지기(Re-throw) - 책임 분리
// ---------------------------------------------------------------------
console.log('\n=== 7) [고급] Re-throw (책임 분리) ===');

function dangerousWork() {
   try {
      // 내부에서 할 수 있는 로깅/정리만 하고
      throw new Error('치명적인 에러');
   } catch (e) {
      reportError(e, { scope: 'dangerousWork' });
      // ✅ 여기서 해결 불가면 상위 레이어로 전달
      throw e;
   }
}

try {
   dangerousWork();
} catch (e) {
   console.log('🚨 상위 레이어에서 최종 처리:', normalizeError(e).message);
}

console.log('='.repeat(60));

// ---------------------------------------------------------------------
// 8) 핵심 요약(복습용)
// ---------------------------------------------------------------------
console.log('\n=== 8) 핵심 요약 ===');
console.log('1) throw는 Error 객체로(스택 추적 필수)');
console.log('2) JSON.parse / API 요청(async/await)은 반드시 try/catch');
console.log('3) finally는 로딩/정리(무조건 실행)');
console.log('4) 사용자 메시지 vs 개발자 로그를 분리');
console.log('5) 재시도(Retry)는 네트워크 UX 개선에 효과적');
console.log('6) 처리 불가 에러는 re-throw로 상위에서 책임지게');

console.log('\n' + '='.repeat(60));
console.log('try/catch 정리 끝!');
console.log('='.repeat(60));
