/**
 * =====================================================================
 * JavaScript Operators (연산자) - Executable Note 📌
 * =====================================================================
 * 🎯 핵심정리 Keynote (먼저 읽기)
 *
 * [초급]
 * - 산술(+ - * / %)과 대입(=, +=)으로 "값을 만든다".
 * - 비교(===)로 "같다"를 안전하게 판정한다. ⭐
 *
 * [중급]
 * - 논리(|| && !)는 "true/false"만이 아니라 "값"을 반환한다. ⭐
 * - null 병합(??)은 "진짜 없음(null/undefined)"만 기본값으로 대체한다. 🔥
 *
 * [고급]
 * - typeof는 빠르지만 함정이 있다(null/array). 🔥
 * - 삼항(?:)은 "짧은 분기"에 최고, 길어지면 if가 더 낫다. ⭐
 *
 * [실무패턴]
 * - 기본값: || 대신 ?? 를 우선 고려(0, '' 같은 값 보존). 🔥
 * - 타입 판별: typeof + Array.isArray + (value === null) 조합. 🔥
 */

console.clear?.();

// ---------------------------------------------------------------------
// 공용 유틸: 출력 가독성
// ---------------------------------------------------------------------
{
   const hr = (title) => {
      console.log('\n' + '='.repeat(52));
      console.log(title);
      console.log('='.repeat(52));
   };

   // =============================================================
   // 1) 초급: 대입 / 산술 / 복합대입
   // =============================================================
   {
      hr('1) [초급] 대입(=) / 산술(+ - * / %) / 복합대입(+= 등)');

      // 1-1) 대입 연산자: 오른쪽 값을 왼쪽 변수에 저장
      let assigned = 1; // ✅ 숫자 1을 변수 assigned에 저장
      console.log('assigned =', assigned);

      // 1-2) 산술 연산자: 계산해서 새로운 값을 만든다
      const a = 3; // ✅ 상수: 이 예제에서 변하지 않는 기준값
      const b = 2;

      const add = a + b; // ✅ 더하기
      const sub = a - b; // ✅ 빼기
      const mul = a * b; // ✅ 곱하기
      const div = a / b; // ✅ 나누기(소수 가능)
      const mod = a % b; // ✅ 나머지(짝/홀, 주기 계산에 ⭐)

      console.log({ add, sub, mul, div, mod });

      // 1-3) 복합 대입 연산자: "계산 + 대입"을 한 번에
      let x = 10;
      console.log('x(start) =', x);

      x += 5; // x = x + 5
      console.log('x += 5 ->', x);

      x -= 5; // x = x - 5
      console.log('x -= 5 ->', x);

      x *= 5; // x = x * 5
      console.log('x *= 5 ->', x);

      x /= 5; // x = x / 5
      console.log('x /= 5 ->', x);

      x %= 5; // x = x % 5
      console.log('x %= 5 ->', x);
   }

   // =============================================================
   // 2) 중급: 증감 / 논리 / 비교
   // =============================================================
   {
      hr('2) [중급] 증감(++/--) / 논리(|| && !) / 비교(===, > 등)');

      // 2-1) 증감 연산자: 1씩 증가/감소
      let n = 10;

      n++; // ✅ 후위 증가: n = n + 1
      console.log('n++ ->', n);

      // (참고) 전위/후위 차이: 반환값이 다름
      let p = 10;
      const post = p++; // post는 증가 전 값(10), p는 11

      let q = 10;
      const pre = ++q; // q를 먼저 11로 만든 뒤 pre에 11

      console.log({ post, p, pre, q });

      // 2-2) 논리 연산자: true/false 뿐 아니라 "값"을 반환한다 ⭐
      const orValue = true || false; // true면 왼쪽 반환
      const andValue = true && false; // 왼쪽이 true면 오른쪽 평가
      const notValue = !true; // 반전

      console.log({ orValue, andValue, notValue });

      // ⭐ 실무 포인트: || / && 는 "단락 평가"로 값 선택에도 사용됨
      const fallbackByOr = 0 || 10; // ⚠️ 0은 falsy라서 10이 됨(원치 않는 경우 많음)
      const pickByAnd = 'ok' && 'next'; // 'ok'가 truthy라서 'next'

      console.log({ fallbackByOr, pickByAnd });

      // 2-3) 비교 연산자: === 를 기본으로 사용 ⭐🔥
      const eqStrict = 1 === 1; // 타입까지 비교(안전)
      const neStrict = 1 !== 2;

      const gt = 2 > 1;
      const lt = 2 < 1;
      const gte = 2 >= 2;
      const lte = 2 <= 2;

      console.log({ eqStrict, neStrict, gt, lt, gte, lte });
   }

   // =============================================================
   // 3) 고급: null 병합(??) / typeof / 삼항(?:)
   // =============================================================
   {
      hr('3) [고급] null 병합(??) / typeof / 삼항(?:)');

      // 3-1) null 병합(??): null/undefined 일 때만 오른쪽을 사용 🔥
      let maybeValue; // undefined
      const v1 = maybeValue ?? 20; // maybeValue가 undefined -> 20

      const zero = 0;
      const v2 = zero ?? 20; // 0은 "값"이므로 0 유지 (||와 차이 ⭐)

      const empty = '';
      const v3 = empty ?? 'DEFAULT'; // '' 유지

      console.log({ v1, v2, v3 });

      // || 와 비교: falsy(0, '', false)도 기본값으로 바꿔버릴 수 있음
      const v2Or = zero || 20; // 20
      const v3Or = empty || 'DEFAULT'; // 'DEFAULT'
      console.log({ v2Or, v3Or });

      // 3-2) typeof: 타입을 문자열로 알려줌 (하지만 함정이 있다 🔥)
      let mixed = 1;
      mixed = 'hello';

      const typeOfMixed = typeof mixed; // 'string'
      console.log('typeof mixed ->', typeOfMixed);

      // 🔥 함정 1) typeof null === 'object'
      const nullValue = null;
      console.log('typeof null ->', typeof nullValue);

      // 🔥 함정 2) 배열도 typeof로는 'object'
      const arr = [1, 2, 3];
      console.log(
         'typeof [1,2,3] ->',
         typeof arr,
         'Array.isArray ->',
         Array.isArray(arr),
      );

      // 3-3) 삼항 연산자: 조건 ? A : B ⭐
      const num = 10;
      const parity = num % 2 === 0 ? '짝수' : '홀수';
      console.log(`num=${num} ->`, parity);
   }

   // =============================================================
   // 4) 실무패턴: "기본값/판별/분기"를 안전하게
   // =============================================================
   {
      hr('4) [실무패턴] 안전한 기본값/타입판별/짧은 분기');

      // 4-1) 기본값은 ?? 우선 고려 🔥
      const inputCount = 0; // 사용자가 0을 넣은 건 "의미 있는 값"일 수 있음
      const safeCount = inputCount ?? 100; // 0 유지

      const unsafeCount = inputCount || 100; // ⚠️ 0이 falsy라서 100으로 바뀜

      console.log({ safeCount, unsafeCount });

      // 4-2) 타입 판별 패턴 🔥
      const values = [null, undefined, 123, 'hi', [1, 2], { a: 1 }];

      for (const v of values) {
         const kind =
            v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v; // 'number' | 'string' | 'undefined' | 'object'

         console.log('value =', v, '-> kind =', kind);
      }

      // 4-3) 삼항은 "짧을 때"만 ⭐ (길면 if/else 추천)
      const score = 72;
      const grade =
         score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
      console.log({ score, grade });
   }

   // =============================================================
   // 🛡️ 방어적 코딩: 자주 터지는 함정들
   // =============================================================
   {
      hr('🛡️ 방어적 코딩 (함정/주의사항)');

      /**
       * 1) == 사용 지양 🔥
       *    - 0 == '0' -> true 같은 "강제 형변환"이 섞이면 디버깅이 어려움
       *    - 실무에선 === / !== 를 기본으로
       */

      /**
       * 2) ||로 기본값 주면 0, '', false가 날아갈 수 있음 ⭐
       *    - "정말 없음"만 처리하려면 ?? 사용
       */

      /**
       * 3) typeof는 만능이 아님 🔥
       *    - typeof null === 'object'
       *    - 배열은 Array.isArray로 판별
       */

      /**
       * 4) ++/-- 남발 주의
       *    - 전위/후위가 섞이면 읽기 난이도 상승
       *    - 팀 컨벤션에 따라 += 1 선호
       */

      console.log('✅ 방어 체크 완료');
   }

   // -----------------------------------------------------------------
   // ✅ 복습 핵심정리 (10~12개)
   // -----------------------------------------------------------------
   {
      hr('✅ 복습 핵심정리 (10초 체크)');

      console.log(
         [
            '1) = 은 "대입"이다.',
            '2) % 는 나머지(짝/홀/주기 계산)에 ⭐.',
            '3) += 는 "계산+대입"을 줄여쓴다.',
            '4) === 를 기본 비교로 사용한다(타입까지 비교) ⭐🔥.',
            '5) || / && 는 boolean이 아니라 "값"을 반환할 수 있다 ⭐.',
            '6) || 기본값은 0/""/false까지 바꿀 수 있어 위험.',
            '7) ?? 는 null/undefined만 대체한다 🔥.',
            '8) typeof는 타입 문자열을 준다.',
            '9) typeof null === "object" 는 함정 🔥.',
            '10) 배열 판별은 Array.isArray(value) ⭐.',
            '11) 삼항(?:)은 짧은 분기에 최고 ⭐.',
            '12) 분기가 길어지면 if/else로 가독성을 챙긴다.',
         ].join('\n'),
      );
   }
}
