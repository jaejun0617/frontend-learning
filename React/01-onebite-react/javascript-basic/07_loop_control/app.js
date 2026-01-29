/**
 * =====================================================================
 * 07_반복문_for_continue_break.js
 * =====================================================================
 * 0N_ex 폴더명 추천: 07_loop_control
 * - 주제: for 반복문 + continue/break로 흐름 제어
 * - 이 파일은 “학습 + 실무 템플릿(Executable Note)” 형태로 구성됨
 *
 * 📌 핵심 개념 (Keynote) 🔥
 * 1) for는 “반복 횟수”가 명확할 때 가장 직관적인 반복문 ⭐
 * 2) continue는 “이번 회차만 스킵” (필터링) ⭐
 * 3) break는 “반복 자체를 종료” (조기 탈출) ⭐
 * 4) 흐름 제어는 강력하지만, 남발하면 가독성/디버깅이 어려워짐 ⚠️
 * 5) 실무에서는 데이터 처리/검증/탐색/성능 최적화(early exit)에 자주 씀 💼
 *
 * 언제 쓰나? 💼
 * - 리스트에서 특정 조건만 처리(continue) / 원하는 값 찾으면 즉시 종료(break)
 * - 검증 루프에서 첫 실패 시 중단(break)
 * - UX: 무거운 작업에서 “충분하면 멈추기”(early exit)
 */

console.clear?.();
console.log('07_loop_control: for / continue / break');

// =====================================================================
// 1) 🌱 초급: for 기본 (0부터 N까지 반복)
// =====================================================================
{
   console.log('\n[🌱 초급] for 기본: 1~5 출력');

   // ✅ 좋은 예: idx라는 의미 있는 반복 변수명 사용
   for (let idx = 1; idx <= 5; idx += 1) {
      // why: 반복 중 현재 idx를 확인하기 위해 출력
      console.log('idx =', idx);
   }

   // ✅ 실행 결과
   console.log('결과: 1,2,3,4,5가 순서대로 출력됨');
}

// =====================================================================
// 2) 🚀 중급: continue로 "조건 필터링" 하기 ⭐
// =====================================================================
{
   console.log('\n[🚀 중급] continue: 홀수만 출력(짝수는 스킵)');

   for (let idx = 1; idx <= 10; idx += 1) {
      // why: 짝수라면 처리할 가치가 없으니 다음 반복으로 넘김(필터링)
      if (idx % 2 === 0) {
         continue; // ✅ 이번 회차만 건너뛰고 다음 idx로
      }

      console.log('odd idx =', idx);
   }

   // ✅ 실행 결과
   console.log('결과: 1,3,5,7,9만 출력됨');

   // ❌ 나쁜 예: 조건이 길어질수록 "continue 남발"은 흐름 파악을 어렵게 함
   console.log('\n❌ 나쁜 예(가독성 저하): continue 남발');
   for (let idx = 1; idx <= 6; idx += 1) {
      // 조건이 늘어날수록 여기서 사고가 자주 남
      if (idx === 2) continue;
      if (idx === 4) continue;
      if (idx === 6) continue;
      console.log('kept idx =', idx);
   }

   // ✅ 좋은 예: 조건을 한 번에 표현(가독성/확장성 ↑) 💡
   console.log('✅ 좋은 예(조건 통합): 제외 목록(Set) 활용');
   const excludedSet = new Set([2, 4, 6]);

   for (let idx = 1; idx <= 6; idx += 1) {
      // why: 제외할 값이면 스킵
      if (excludedSet.has(idx)) continue;
      console.log('kept idx =', idx);
   }
}

// =====================================================================
// 3) ⚡ 고급: break로 "조기 탈출(Early Exit)" ⭐🔥
// =====================================================================
{
   console.log('\n[⚡ 고급] break: 원하는 값을 찾으면 즉시 종료');

   const numbers = [3, 7, 2, 9, 5, 9, 1];
   const target = 9;

   let foundIndex = -1; // why: 못 찾으면 -1로 남겨서 결과 판별

   for (let idx = 0; idx < numbers.length; idx += 1) {
      const value = numbers[idx];

      // why: 타겟을 찾는 순간 더 돌 필요가 없음(성능 + 의도 명확)
      if (value === target) {
         foundIndex = idx;
         break; // ✅ 반복 종료
      }
   }

   console.log('numbers =', numbers);
   console.log('target =', target);
   console.log('foundIndex =', foundIndex);
   console.log(
      '결과:',
      foundIndex >= 0 ? `target 발견(인덱스 ${foundIndex})` : 'target 미발견',
   );

   // 💡 같은 작업을 배열 메서드로도 가능(가독성↑)
   // 하지만 break처럼 "중간 상태를 로깅" 하거나 "복잡한 조건"이면 for가 더 유리할 때도 많음
   console.log(
      '💡 참고: numbers.findIndex(v => v === target) =',
      numbers.findIndex((v) => v === target),
   );
}

// =====================================================================
// 4) 💼 실무 패턴: 데이터 처리(검증/탐색/수집) 시나리오 3개 ⭐
// =====================================================================
{
   console.log('\n[💼 실무 패턴] 실제 사용 시나리오');

   // ------------------------------------------------------------
   // 시나리오 A) 유효성 검사: 첫 에러에서 중단(break)
   // ------------------------------------------------------------
   console.log('\nA) 유효성 검사: 첫 실패에서 중단(break)');

   const emails = ['a@a.com', 'bad-email', 'b@b.com'];
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   let firstInvalidEmail = null;

   for (let idx = 0; idx < emails.length; idx += 1) {
      const email = emails[idx];

      // why: 실패를 발견하면 더 검사할 필요 없음(빠른 피드백)
      if (!emailRegex.test(email)) {
         firstInvalidEmail = email;
         break;
      }
   }

   console.log('emails =', emails);
   console.log('firstInvalidEmail =', firstInvalidEmail);

   // ------------------------------------------------------------
   // 시나리오 B) 필터링 수집: continue로 스킵(빈 값/비활성) ⭐
   // ------------------------------------------------------------
   console.log('\nB) 필터링 수집: 비활성/빈 값 스킵(continue)');

   const users = [
      { id: 1, name: 'Jaejun', active: true },
      { id: 2, name: '', active: true },
      { id: 3, name: 'Min', active: false },
      { id: 4, name: 'Soo', active: true },
   ];

   const activeNames = [];

   for (let idx = 0; idx < users.length; idx += 1) {
      const user = users[idx];

      // why: 비활성이면 처리 대상 아님
      if (!user.active) continue;

      // why: 빈 문자열은 의미 있는 이름이 아니므로 스킵
      if (user.name.trim().length === 0) continue;

      activeNames.push(user.name);
   }

   console.log('activeNames =', activeNames);

   // ------------------------------------------------------------
   // 시나리오 C) 제한 수집: N개만 모이면 멈추기(break) 🔥
   // ------------------------------------------------------------
   console.log('\nC) 제한 수집: 3개만 모이면 멈추기(break)');

   const feed = ['post1', 'post2', 'post3', 'post4', 'post5'];
   const limit = 3;
   const picked = [];

   for (let idx = 0; idx < feed.length; idx += 1) {
      picked.push(feed[idx]);

      // why: 필요한 만큼만 모았으면 더 순회할 이유가 없음
      if (picked.length >= limit) break;
   }

   console.log('picked =', picked);

   // 팀 협업 시 고려사항 🤝
   console.log('\n🤝 팀 협업 고려사항');
   console.log('- continue/break는 주석으로 “왜”를 붙이면 리뷰 속도가 빨라짐');
   console.log(
      '- 조건이 복잡해지면 함수로 분리(예: isValidEmail, isActiveUser)',
   );
   console.log(
      '- 반복문 안에서 상태 변경/로그를 과하게 하지 말기(사이드 이펙트 최소화)',
   );

   // 디버깅 팁 🧩
   console.log('\n🧩 디버깅 팁');
   console.log(
      '- break 직전에 foundIndex/value를 로그로 찍으면 원인 파악이 빠름',
   );
   console.log(
      '- continue가 많다면 “어떤 조건으로 스킵되는지” 카운터를 두는 것도 좋음',
   );
}

// =====================================================================
// 5) 🛡️ 방어적 코딩: 함정/에러/해결법
// =====================================================================
{
   console.log('\n[🛡️ 방어적 코딩] 함정 & 해결');

   // ⚠️ 함정 1) 무한 루프: 증가/감소를 빼먹음
   console.log('\n⚠️ 함정 1) 증감 누락 -> 무한 루프 위험');
   console.log('해결: for(초기; 조건; 증감) 3요소를 항상 눈으로 점검');

   // ❌ 나쁜 예(설명용 - 실행 금지)
   console.log('❌ 나쁜 예: for (let i = 0; i < 3;) { ... }  // i 증가 없음');

   // ✅ 좋은 예
   console.log('✅ 좋은 예: for (let i = 0; i < 3; i += 1) { ... }');

   // ⚠️ 함정 2) break/continue가 중첩되면 흐름이 헷갈림
   console.log('\n⚠️ 함정 2) 중첩 if + continue/break -> 흐름 파악 어려움');
   console.log(
      '해결: 조건을 “가드(guard)” 형태로 위에서 걸러내거나 함수로 분리',
   );

   // ✅ 좋은 예(가드 패턴) ⭐
   console.log('✅ 좋은 예(가드 패턴): early continue로 깊은 중첩 방지');
   for (let idx = 1; idx <= 5; idx += 1) {
      if (idx === 3) {
         console.log('skip idx = 3');
         continue;
      }
      console.log('work idx =', idx);
   }

   // ⚠️ 함정 3) for...in을 배열에 쓰면 인덱스가 string으로 들어오고 예측이 깨질 수 있음
   console.log('\n⚠️ 함정 3) 배열에 for...in 사용 자제');
   console.log(
      '해결: 배열은 for / for...of / forEach / map/filter를 주로 사용',
   );
}

// =====================================================================
// 6) 🎓 핵심 정리 (10~12개 포인트)
// =====================================================================
{
   console.log('\n[🎓 핵심 정리]');

   const summary = [
      '1) for는 반복 횟수/인덱스가 명확할 때 강력하다 ⭐',
      '2) continue는 “이번 회차만 스킵”이다(필터링에 자주 씀) ⭐',
      '3) break는 “반복 종료”다(탐색/검증/limit에 자주 씀) ⭐',
      '4) continue/break는 남발하면 흐름이 끊겨 가독성이 떨어진다 ⚠️',
      '5) early exit(break)는 성능 최적화에 큰 도움이 된다 🔥',
      '6) 조건이 많아지면 Set/함수 분리로 조건을 단순화하자 💡',
      '7) 중첩 if는 가드(early continue)로 깊이를 줄이면 유지보수성이 좋아진다 ⭐',
      '8) 배열 탐색은 상황에 따라 find/findIndex도 고려하자 💡',
      '9) 반복문 안에서 사이드 이펙트(상태 변경/로그)를 최소화하면 디버깅이 쉬워진다',
      '10) 무한 루프는 대부분 증감 누락/조건 실수에서 온다(3요소 점검) ⚠️',
      '11) 배열에 for...in은 지양하고 for/for...of를 사용하자 ⚠️',
      '12) 팀 코드에서는 “왜 continue/break인지” 주석이 리뷰 시간을 줄인다 💼',
   ];

   for (let idx = 0; idx < summary.length; idx += 1) {
      console.log(summary[idx]);
   }
}

// =====================================================================
// 7) 🔗 실전 적용 (프로젝트 예시)
// =====================================================================
{
   console.log('\n[🔗 실전 적용] 프로젝트 예시');

   console.log('예시 1) 검색 자동완성: 추천 10개만 채우면 break로 중단');
   console.log('예시 2) 폼 검증: 첫 에러 필드 발견 시 break하고 포커스 이동');
   console.log('예시 3) 렌더 리스트 전처리: 비활성/빈 값은 continue로 스킵');
}
