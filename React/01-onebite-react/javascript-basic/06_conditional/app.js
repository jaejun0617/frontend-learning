/**
 * ==========================================
 * 06/app.js
 * 조건문 (if / else if / switch)
 * ==========================================
 * 목적: 조건 분기 로직을 "학습 + 실무 템플릿"으로 정리
 * 실행: node app.js
 */

// =======================================================
// 1) 📌 핵심 개념 + 키노트 + 언제 쓰는지
// =======================================================
{
   console.log('1) 📌 핵심 개념 (if / else if / switch)');

   /**
    * ✅ 핵심 개념
    * - if / else if / else: 조건을 "범위"로 나누거나 순서가 중요한 분기에 적합 ⭐
    * - switch: 하나의 값(식)을 "동등 비교"로 분기할 때 가독성이 좋음 ⭐
    *
    * 🔥 키노트
    * - if는 위에서부터 "처음으로 true"인 블록만 실행 (순서가 결과를 바꿈) 🔥
    * - switch는 기본적으로 "==="'(엄격 비교)로 case를 판단함 ⚠️
    * - switch에서 break를 빼먹으면 fall-through(연쇄 실행)됨 ⚠️
    *
    * 💡 언제 쓰는지
    * - if: 점수 구간, 나이 범위, 배송비 구간 등 "범위" 분기
    * - switch: 상태 값(status), 타입(type), 메뉴 선택(action) 등 "값 매칭" 분기
    */

   console.log('✅ if: 범위/순서 분기, ✅ switch: 값 매칭 분기');
   console.log('- if는 위에서부터 첫 true만 실행');
   console.log('- switch는 === 비교 + break 필수');
   console.log('='.repeat(60));
}

// =======================================================
// 2) 🌱 초급 → 🚀 중급 → ⚡ 고급 → 💼 실무 패턴
//    - 각 단계: 설명 → 직관적 코드 → 실행 결과
// =======================================================

// -------------------------------------------------------
// 🌱 초급: if / else if / else 기본
// -------------------------------------------------------
{
   console.log('2-1) 🌱 초급: if / else if / else 기본');

   // ✅ 변수명은 의미가 드러나게 camelCase로 작성 (why: 읽는 사람이 조건 의도를 바로 이해)
   const userScore = 72; // 점수 예시

   // ✅ if는 조건이 true일 때만 실행 (why: 조건에 따라 흐름 분기)
   if (userScore >= 90) {
      console.log('A 등급');
   } else if (userScore >= 80) {
      console.log('B 등급');
   } else if (userScore >= 70) {
      console.log('C 등급');
   } else {
      console.log('D 등급');
   }

   // ✅ 실행 결과 예시
   console.log('➡️ 실행 결과(예상): C 등급');
   console.log('='.repeat(60));
}

// -------------------------------------------------------
// 🚀 중급: 조건 순서의 중요성 + Bad → Good
// -------------------------------------------------------
{
   console.log('2-2) 🚀 중급: 조건 순서의 중요성 (Bad → Good)');

   const age = 18; // 나이 예시

   // ❌ 나쁜 예: 범위 조건을 큰 범위부터 검사하면 아래 조건이 영원히 실행되지 않을 수 있음
   // (why: age >= 0이면 대부분 true라서 뒤 조건이 "죽음")
   if (age >= 0) {
      console.log('❌ Bad: 무조건 여기로 들어오기 쉬움 (나이 범위 분기 실패)');
   } else if (age >= 20) {
      console.log('❌ Bad: 이 코드는 사실상 도달하기 어려움');
   }

   // ✅ 좋은 예: 더 "좁은/큰 기준"을 먼저 검사해서 분기를 정확하게
   // (why: 우선순위가 높은 조건부터 배치하면 의도대로 분기됨)
   if (age >= 20) {
      console.log('✅ Good: 성인입니다');
   } else if (age >= 0) {
      console.log('✅ Good: 미성년입니다');
   } else {
      console.log('✅ Good: 나이가 음수일 수 없습니다');
   }

   console.log('➡️ 실행 결과(예상):');
   console.log('- Bad: ❌ Bad...');
   console.log('- Good: ✅ Good: 미성년입니다');
   console.log('='.repeat(60));
}

// -------------------------------------------------------
// ⚡ 고급: switch + fall-through(함정) + Bad → Good
// -------------------------------------------------------
{
   console.log('2-3) ⚡ 고급: switch (fall-through 함정) (Bad → Good)');

   const selectedAnimal = 'cat'; // 하나의 값으로 분기할 때 switch가 깔끔 ⭐

   // ❌ 나쁜 예: break 누락 → 다음 case까지 연쇄 실행됨 (fall-through) ⚠️
   switch (selectedAnimal) {
      case 'cat':
         console.log('❌ Bad: 고양이');
      case 'dog':
         console.log('❌ Bad: 개 (break 없어서 cat이어도 실행됨)');
         break;
      default:
         console.log('❌ Bad: 그 외');
   }

   // ✅ 좋은 예: case마다 break로 종료 (why: 의도한 분기만 실행되게)
   switch (selectedAnimal) {
      case 'cat': {
         console.log('✅ Good: 고양이');
         break;
      }
      case 'dog': {
         console.log('✅ Good: 개');
         break;
      }
      case 'elephant': {
         console.log('✅ Good: 코끼리');
         break;
      }
      default: {
         console.log('✅ Good: 그런 동물은 없습니다');
      }
   }

   console.log('➡️ 실행 결과(예상):');
   console.log('- Bad: 고양이 + 개(연쇄)');
   console.log('- Good: 고양이');
   console.log('='.repeat(60));
}

// -------------------------------------------------------
// 💼 실무 패턴: 실제 시나리오 3개 + 협업/디버깅 팁
// -------------------------------------------------------
{
   console.log('2-4) 💼 실무 패턴: 실제 사용 시나리오 3개');

   // ===================================================
   // 시나리오 1) ⭐ API 응답 상태(status) 분기 (switch)
   // ===================================================
   /**
    * ⭐ 실무 포인트
    * - status는 보통 정해진 값들의 집합 → switch가 깔끔
    * - default는 "예상 못 한 상태"를 잡는 안전망
    */
   const apiStatus = 'loading'; // 'loading' | 'success' | 'error'

   switch (apiStatus) {
      case 'loading': {
         console.log('UI: 로딩 스피너 표시');
         break;
      }
      case 'success': {
         console.log('UI: 데이터 렌더링');
         break;
      }
      case 'error': {
         console.log('UI: 에러 메시지 표시 + 재시도 버튼');
         break;
      }
      default: {
         console.log('⚠️ UI: 알 수 없는 상태 (로그/모니터링 필요)');
      }
   }

   // ===================================================
   // 시나리오 2) ⭐ 권한(Role)별 기능 제한 (if)
   // ===================================================
   /**
    * ⭐ 실무 포인트
    * - 권한 체크는 보안과 직결 → "명확한 분기"가 중요
    * - 단순히 UI 숨김만으로 끝내지 말고, 서버에서도 검증 필요 ⚠️
    */
   const userRole = 'viewer'; // 'admin' | 'editor' | 'viewer'

   if (userRole === 'admin') {
      console.log('Admin: 모든 기능 접근 가능');
   } else if (userRole === 'editor') {
      console.log('Editor: 콘텐츠 편집 가능');
   } else {
      console.log('Viewer: 읽기 전용');
   }

   // ===================================================
   // 시나리오 3) 💡 입력값 정규화 후 분기 (실수 방지)
   // ===================================================
   /**
    * 💡 꿀팁
    * - 사용자 입력은 대소문자/공백 등 변형이 많음
    * - 분기 전에 정규화(trim + toLowerCase)하면 버그가 줄어듦
    */
   const rawCommand = '  SAVE  '; // 사용자 입력
   const normalizedCommand = rawCommand.trim().toLowerCase();

   switch (normalizedCommand) {
      case 'save': {
         console.log('Command: 저장 실행');
         break;
      }
      case 'delete': {
         console.log('Command: 삭제 실행');
         break;
      }
      default: {
         console.log('Command: 알 수 없는 명령');
      }
   }

   // ===================================================
   // 🤝 팀 협업 시 고려사항
   // ===================================================
   console.log('🤝 팀 협업 체크리스트');
   console.log(
      '- 조건 분기 기준을 상수/enum(또는 const 객체)로 관리하면 오타 줄어듦',
   );
   console.log(
      '- switch default에는 모니터링/로그 포인트를 남기면 운영에서 도움',
   );
   console.log(
      '- if 범위 분기는 "경계값"(예: 70, 80, 90)을 테스트 케이스로 남기기',
   );

   // ===================================================
   // 🧪 디버깅 팁
   // ===================================================
   console.log('🧪 디버깅 팁');
   console.log('- 조건식과 입력값을 같이 로그로 찍으면 원인 파악이 빨라짐');
   console.log(
      `- rawCommand="${rawCommand}", normalizedCommand="${normalizedCommand}"`,
   );
   console.log('='.repeat(60));
}

// =======================================================
// 3) 🛡️ 방어적 코딩 (함정·에러·해결법)
// =======================================================
{
   console.log('3) 🛡️ 방어적 코딩');

   // ---------------------------------------------------
   // 함정 1) switch는 === 비교 (타입 다르면 매칭 실패) ⚠️
   // ---------------------------------------------------
   const statusCodeFromServer = 200; // 숫자

   // ❌ 나쁜 예: 문자열 case만 두면 200(숫자)와 '200'(문자열)이 다름
   switch (statusCodeFromServer) {
      case '200':
         console.log('❌ Bad: 여기는 실행되지 않음 (타입 불일치)');
         break;
      default:
         console.log('❌ Bad: default로 떨어짐 (원인은 타입 불일치)');
   }

   // ✅ 좋은 예: 타입을 맞추거나(권장) 정규화 후 비교
   const normalizedStatusCode = String(statusCodeFromServer); // 정규화

   switch (normalizedStatusCode) {
      case '200': {
         console.log('✅ Good: 200 OK');
         break;
      }
      default: {
         console.log('✅ Good: 기타 코드');
      }
   }

   // ---------------------------------------------------
   // 함정 2) if 조건식에서 truthy/falsy 오해 ⚠️
   // ---------------------------------------------------
   const discountRate = 0; // 0은 falsy

   // ❌ 나쁜 예: "값이 0"인데도 falsy라서 분기 의도와 다를 수 있음
   if (discountRate) {
      console.log('❌ Bad: 할인 있음');
   } else {
      console.log('❌ Bad: 할인 없음 (0이라도 의도상 할인률일 수 있음)');
   }

   // ✅ 좋은 예: 값 존재 여부가 아니라 "정확한 조건"으로 비교
   if (discountRate >= 0) {
      console.log(`✅ Good: 할인률은 ${discountRate}% (0도 유효)`);
   }

   // ---------------------------------------------------
   // 해결법) 예상 못한 값은 early return / default로 잡기
   // ---------------------------------------------------
   const userInput = null;

   // ✅ 좋은 예: 입력 검증을 먼저 하고(early guard), 나머지 로직을 단순화
   if (typeof userInput !== 'string') {
      console.log('✅ Good: 입력이 문자열이 아니어서 처리 중단 (에러 예방)');
   } else {
      console.log('✅ Good: 문자열 입력 처리 계속');
   }

   console.log('='.repeat(60));
}

// =======================================================
// 4) 🎓 핵심 정리 (10~12개)
// =======================================================
{
   console.log('4) 🎓 핵심 정리');

   const summaryPoints = [
      '1) if는 조건을 위에서부터 평가하고, 처음 true인 블록만 실행된다 🔥',
      '2) 범위 분기(점수/나이/금액 구간)는 if/else if가 보통 더 자연스럽다 ⭐',
      '3) 값 매칭(status/type/action)은 switch가 가독성이 좋다 ⭐',
      '4) switch는 기본적으로 ===(엄격 비교)라서 타입이 다르면 매칭 실패한다 ⚠️',
      '5) switch에서 break를 빼먹으면 fall-through로 다음 case가 연쇄 실행된다 ⚠️',
      '6) default는 "예상 못 한 값"의 안전망이며 운영 로그 포인트로도 좋다 💡',
      '7) 조건 순서가 결과를 바꿀 수 있으니 우선순위 높은 조건을 먼저 배치한다 🔥',
      '8) truthy/falsy(예: 0, "")로 의도치 않은 분기가 생길 수 있으니 명시 비교가 안전하다 ⚠️',
      '9) 입력값은 trim/toLowerCase 같은 정규화 후 분기하면 버그가 줄어든다 💡',
      '10) 권한/보안 관련 분기는 UI만이 아니라 서버 검증도 함께 고려한다 ⭐',
      '11) 경계값(예: 69/70/79/80/89/90)은 테스트 케이스로 반드시 잡는다 🔥',
      '12) 디버깅 시 입력값 + 조건식을 같이 로그로 찍으면 원인 파악이 빨라진다 💡',
   ];

   summaryPoints.forEach((point) => console.log(point));
   console.log('='.repeat(60));
}

// =======================================================
// 5) 🔗 실전 적용 (프로젝트 예시)
// =======================================================
{
   console.log('5) 🔗 실전 적용 (프로젝트 예시)');

   /** hookup: 포트폴리오/React 프로젝트에서 흔한 적용 예시
    * 1) "필터 UI"에서 선택된 탭에 따라 목록을 바꿀 때 (switch)
    * 2) "유효성 검사"에서 입력값이 비었는지/범위를 넘었는지 체크할 때 (if)
    * 3) "에러 처리"에서 에러 코드에 따라 메시지를 다르게 보여줄 때 (switch)
    */

   // 예시) 게시글 목록 필터 탭
   const selectedTab = 'popular'; // 'all' | 'popular' | 'recent'

   switch (selectedTab) {
      case 'all': {
         console.log('프로젝트 예시: 전체 게시글을 보여준다');
         break;
      }
      case 'popular': {
         console.log('프로젝트 예시: 인기 게시글만 보여준다');
         break;
      }
      case 'recent': {
         console.log('프로젝트 예시: 최신 게시글만 보여준다');
         break;
      }
      default: {
         console.log('프로젝트 예시: 알 수 없는 탭 (fallback: 전체)');
      }
   }

   // 예시) 폼 입력 검증
   const emailInput = 'test@example.com';

   if (!emailInput.includes('@')) {
      console.log('프로젝트 예시: 이메일 형식이 아닙니다');
   } else {
      console.log('프로젝트 예시: 이메일 형식 OK');
   }

   console.log('='.repeat(60));
}
