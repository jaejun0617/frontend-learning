/**
 * =====================================================================
 * DOM + Async Autocomplete (Type-along) (2026)
 * =====================================================================
 * ⭐ = 실무 빈출 / 🔥 = 핵심 / 🛡️ = 실수 방지
 *
 * [맨 위 진짜 중요한 것 ⭐🔥]
 * 1) 입력 이벤트는 매우 자주 발생한다 → 디바운스로 요청 폭발 방지
 * 2) 비동기 응답은 순서가 보장되지 않는다 → "최신 요청만 반영" 방어 필요 🛡️
 * 3) 상태(state)로 관리하고 render() 한 곳에서만 DOM 갱신
 */

console.clear?.();

const $ = (sel, parent = document) => parent.querySelector(sel);

// ---------------------------------------------------------------------
// [Fake Server] 자동완성 데이터 + 네트워크 흉내
// ---------------------------------------------------------------------
const WORDS = [
   'react',
   'redux',
   'router',
   'render',
   'ref',
   'request',
   'response',
   'promise',
   'prototype',
   'proxy',
   'typescript',
   'tailwind',
   'testing',
   'throttle',
   'debounce',
   'javascript',
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function makeSuggestions(query) {
   const q = query.trim().toLowerCase();
   if (!q) return [];
   return WORDS.filter((w) => w.startsWith(q)).slice(0, 7);
}

// 네트워크를 흉내내는 비동기 함수
async function fakeFetchSuggestions(query) {
   // 랜덤 지연: "응답 순서가 바뀔 수 있음"을 체감시키기 위해 일부러 랜덤 🔥
   const ms = 120 + Math.floor(Math.random() * 500);
   await delay(ms);

   // 실패도 가끔 발생(흉내)
   if (Math.random() < 0.12) {
      throw new Error('네트워크 오류(흉내)');
   }

   return { ms, data: makeSuggestions(query) };
}

// ---------------------------------------------------------------------
// [Debounce] 입력이 멈춘 뒤에만 실행 ⭐
// ---------------------------------------------------------------------
function debounce(fn, wait = 300) {
   let timerId = null;

   return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), wait);
   };
}

// ---------------------------------------------------------------------
// DOM Elements
// ---------------------------------------------------------------------
const $app = $('#app');
const $input = $('#q');
const $list = $('#list');
const $status = $('#status');

// ---------------------------------------------------------------------
// State (화면의 원본 데이터)
// ---------------------------------------------------------------------
let state = {
   query: '',
   loading: false,
   error: null,
   items: [],
   lastMs: null,
};

// 🛡️ 경쟁 조건 방지용: 요청 토큰(번호)
// - 요청을 보낼 때마다 +1
// - 응답이 돌아왔을 때, "현재 토큰"과 다르면 무시
let requestSeq = 0;

// ---------------------------------------------------------------------
// Render: DOM 갱신은 여기 한 곳 ⭐
// ---------------------------------------------------------------------
function render() {
   const { query, loading, error, items, lastMs } = state;

   if (!query.trim()) {
      $status.textContent = 'status: idle';
   } else if (loading) {
      $status.textContent = `status: loading...`;
   } else if (error) {
      $status.textContent = `status: error (${error})`;
   } else {
      $status.textContent = `status: ok (${items.length}개, ${lastMs ?? '-'}ms)`;
   }

   $list.innerHTML = '';

   if (!query.trim()) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '입력하면 추천이 표시됩니다.';
      $list.appendChild(li);
      return;
   }

   if (loading) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '불러오는 중...';
      $list.appendChild(li);
      return;
   }

   if (error) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '에러 발생! 다시 입력해보세요.';
      $list.appendChild(li);
      return;
   }

   if (items.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '추천 결과가 없습니다.';
      $list.appendChild(li);
      return;
   }

   items.forEach((word, idx) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.dataset.word = word;

      const left = document.createElement('b');
      left.textContent = word;

      const right = document.createElement('small');
      right.textContent = `#${idx + 1}`;

      li.append(left, right);
      $list.appendChild(li);
   });
}

// ---------------------------------------------------------------------
// Async Flow: query 변경 → fetch → state 업데이트 → render
// ---------------------------------------------------------------------
async function runSearch(query) {
   const mySeq = ++requestSeq;

   // state 업데이트(로딩)
   state = { ...state, query, loading: true, error: null, lastMs: null };
   render();

   try {
      const { ms, data } = await fakeFetchSuggestions(query);

      // 🛡️ 핵심: 오래된 응답이면 무시
      if (mySeq !== requestSeq) return;

      state = { ...state, loading: false, items: data, lastMs: ms };
      render();
   } catch (err) {
      if (mySeq !== requestSeq) return;

      state = { ...state, loading: false, items: [], error: err.message };
      render();
   }
}

// ---------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------
const debouncedSearch = debounce((q) => runSearch(q), 300);

$input.addEventListener('input', () => {
   const q = $input.value;
   state = { ...state, query: q }; // 입력값은 즉시 state에 반영
   debouncedSearch(q); // 요청은 디바운스로 늦게 실행 ⭐
});

$input.addEventListener('keydown', (e) => {
   if (e.key === 'Escape') {
      $input.value = '';
      requestSeq++; // 🛡️ 진행 중 요청 무효화
      state = {
         query: '',
         loading: false,
         error: null,
         items: [],
         lastMs: null,
      };
      render();
   }
});

// 버튼/리스트는 위임으로 처리 ⭐
$app.addEventListener('click', (e) => {
   const $btn = e.target.closest('button');
   if ($btn?.dataset.role === 'clear') {
      $input.value = '';
      requestSeq++; // 🛡️ 진행 중 요청 무효화
      state = {
         query: '',
         loading: false,
         error: null,
         items: [],
         lastMs: null,
      };
      render();
      $input.focus();
      return;
   }

   const $item = e.target.closest('.item');
   if ($item) {
      // 추천 클릭 → input 채우고 즉시 검색
      const word = $item.dataset.word;
      $input.value = word;
      state = { ...state, query: word };
      runSearch(word); // 클릭은 즉시 실행(디바운스 생략)
   }
});

render();

// ---------------------------------------------------------------------
// [핵심정리] 12개 ✅
// ---------------------------------------------------------------------
console.log('\n[Autocomplete Checklist ✅]');
[
   'input 이벤트는 매우 자주 발생한다 → 디바운스가 필수 ⭐',
   '비동기는 응답 순서가 바뀔 수 있다 → 최신 요청만 반영 🛡️',
   'state(원본) → render(화면) 패턴은 React로 바로 연결된다 ⭐🔥',
   'DOM은 한 곳(render)에서만 갱신하면 예측 가능해진다 ⭐',
   '사용자 입력은 textContent로 렌더링(보안) 🛡️',
   '동적 리스트 클릭은 이벤트 위임이 편하다 ⭐',
   'Escape/Clear 같은 UX는 작은데 만족도가 크다 ⭐',
   '로딩/에러/빈 결과 상태를 분기해 사용자에게 보여줘라 ⭐',
   '요청 폭발은 성능/서버 비용을 망친다 → 디바운스/스로틀 🔥',
   'Promise/async-await는 에러 처리 흐름을 정리해준다 ⭐',
   '병렬은 Promise.all, 하지만 자동완성은 최신만 살리는 게 핵심 🔥',
   '실무에서는 AbortController로 취소도 많이 한다(다음 단계) ⭐',
].forEach((v, i) => console.log(`${String(i + 1).padStart(2, '0')}. ${v}`));
