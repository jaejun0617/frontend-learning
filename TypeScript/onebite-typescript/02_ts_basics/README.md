# 02_ts_basics — TypeScript 기본 📘

> 이 폴더는 **TypeScript 기본 문법을 “학습 + 실무 참고용”으로 실행 가능한 노트(Executable Note)** 형태로 정리한 트랙입니다.  
> 목표: **타입 문법 암기 ❌ → “값의 범위(집합) + 안전한 설계 감각”**을 몸에 붙이기 ⭐

---

## ✅ Keynote (한 장 요약) ⭐🔥

### 지금 여기서 가져가야 하는 “진짜 핵심”

- **TS 타입 = 값의 범위(집합)** 를 제한하는 도구다. (대충 느낌 ❌) ⭐
- 실무 기본 4종 세트: **type/interface + generics + narrowing + 유니온(리터럴)** ⭐🔥
- 런타임 데이터(API/사용자 입력/스토리지)는 TS가 못 막는다 → **unknown으로 받고 검증(타입가드)** 🔥🛡️
- **never는 ‘분기 누락’을 잡는 안전장치**다(상태 머신/리듀서/스위치에서 초빈출) ⭐🔥
- **튜플은 런타임에 배열이라 push 함정**이 있다 → `readonly tuple` 또는 객체로 방어 🛡️
- **enum은 팀에 따라 “유니온 + as const”로 대체**하는 경우가 많다 🔥

---

## ▶ 실행 방법 (가장 안정 ⭐)

`02_ts_basics` 폴더(= `tsconfig.json` 있는 위치)에서:

```bash
# 컴파일
npx tsc

# 실행(출력 파일 경로는 tsconfig/outDir 설정 및 구조에 따라 달라질 수 있음)
node dist/01_primitive_literal.js
node dist/02_array_tuple.js
node dist/03_object_types_optional_readonly.js
node dist/04_type_alias_index_signature.js
node dist/05_enum.js
node dist/06_any_unknown_safety.js
node dist/07_void_never.js
```

---

## 🗂️ 파일 구성 (학습 순서)

| 파일                                   | 주제                        | 실무 한 줄                                         |
| -------------------------------------- | --------------------------- | -------------------------------------------------- |
| `01_primitive_literal.ts`              | 원시 타입 & 리터럴 타입     | 상태/모드 모델링의 뼈대 ⭐                         |
| `02_array_tuple.ts`                    | 배열 & 튜플                 | 리스트 데이터 가공(map/filter) + 튜플 함정 방어 🛡️ |
| `03_object_types_optional_readonly.ts` | 객체 타입                   | optional/readonly + 구조적 타이핑 이해 ⭐          |
| `04_type_alias_index_signature.ts`     | 타입 별칭 & 인덱스 시그니처 | `Record + keyof + satisfies` 추천 조합 ⭐🔥        |
| `05_enum.ts`                           | enum                        | 팀 컨벤션: enum vs `as const` 선택 🔥              |
| `06_any_unknown_safety.ts`             | any vs unknown              | 외부 입력은 unknown → 검증 후 사용 🔥🛡️            |
| `07_void_never.ts`                     | void & never                | never로 분기 누락을 컴파일 타임에 잡기 ⭐🔥        |

---

## 1) Primitive & Literal (원시/리터럴) — “타입은 값의 범위” ⭐

### 핵심

- **원시 타입**: `number | string | boolean | null | undefined`
- **리터럴 타입**: 값 자체가 타입 (`10`, `"dark"`, `true`)
- **리터럴 유니온**: `"idle" | "loading" | "success" | "error"` 같은 상태 표현에 최강 ⭐

### 실무 패턴

- UI 상태 / 요청 상태 / 권한(Role) / 테마(Theme) 등 “선택지가 제한된 값”은 **리터럴 유니온으로 모델링**.

---

## 2) Array & Tuple (배열/튜플) — 리스트 vs ‘순서가 의미’ ⭐🛡️

### 핵심

- 배열: `T[]` 또는 `Array<T>`
- 섞이면: `(A | B)[]`
- 튜플: `[A, B]` 처럼 **위치/길이가 의미**인 구조

### 🛡️ 함정(중요)

- 튜플은 런타임에서 **그냥 배열**이라 `push/pop`이 가능 → 길이 깨질 수 있음
- 방어: `readonly [A, B]` 또는 `{ x: number; y: number }` 같은 객체로 표현

---

## 3) Object Types — 구조적 타이핑 + optional/readonly ⭐

### 핵심

- TS는 **이름이 아니라 “구조(모양)”**으로 호환된다 🔥
- `?` optional: **없을 수도 있음** → 사용 전 체크/기본값 필요 ⭐🛡️
- `readonly`: 바뀌면 안 되는 값(설정, 키, 생성 시각)을 잠금 🛡️

### 실무 팁

- optional 값은 `??`로 기본값 제공 패턴이 깔끔함  
  예: `const safeId = user.id ?? 0`

---

## 4) type alias & index signature — “재사용 + 딕셔너리” ⭐🔥

### 핵심

- `type`: 타입(구조/범위) 재사용을 위한 **이름표**
- index signature: `[key: string]: V` (키가 동적으로 늘어나는 맵)
- 하지만 실무에서는 **`Record<K, V>`가 더 안전**한 경우가 많음 ⭐

### 🔥 추천 조합 (실무 강추)

- `Record + keyof + satisfies`
   - 키를 제한해서 오타를 막고
   - `satisfies`로 **검증은 엄격, 타입 추론은 깔끔**하게 유지

---

## 5) enum — 선택지 집합 (팀 컨벤션 주제) 🔥

### 핵심

- 숫자 enum: reverse mapping 생김 → 번들/트리쉐이킹 측면에서 팀마다 선호 갈림 🔥
- 문자열 enum: 더 예측 가능 (로깅/전송에 유리) ⭐

### 실무 대안(많이 씀)

- `as const` + 리터럴 유니온
   - 값(런타임 객체) + 타입(유니온)을 동시에 확보 ⭐🔥

---

## 6) any vs unknown — 안전한 외부 입력 처리 🔥🛡️

### 핵심

- `any`: 타입 체크 OFF → “편함” 대신 “런타임 폭탄” 🛡️
- `unknown`: “모름”을 안전하게 표현 → **사용 전 narrowing 필수** ⭐

### 실무 정석

- **외부 입력은 unknown으로 받고 → 타입가드로 검증 → 안전 타입으로 변환** 🔥
- `JSON.parse` 결과도 `unknown`으로 받는 습관이 중요 🛡️

---

## 7) void & never — 반환의 의미 / 도달 불가 체크 ⭐🔥

### 핵심

- `void`: 반환값을 “쓰지 않는다” (핸들러/콜백에서 흔함) ⭐
- `never`: 절대 도달 불가(throw/무한루프) + **분기 누락을 잡는 타입 장치** 🔥

### 실무 패턴(정말 중요) ⭐🔥

- `assertNever(x: never)`로 switch/if 분기에서 **빠진 케이스를 컴파일 타임에 검출**  
  (상태 머신, reducer, UI 모드 처리에서 빈출)

---

## ✅ 복습 핵심정리 12 (시험지처럼) 🧠

1. 타입은 “값의 범위(집합)”를 제한한다. ⭐
2. 리터럴 타입 + 유니온은 상태/모드 모델링의 기본이다. ⭐
3. optional(`?`)은 없을 수 있으니 체크/기본값이 필수다. 🛡️
4. readonly는 “바뀌면 안 되는 값”을 잠근다. 🛡️
5. TS는 구조(모양)로 타입 호환을 판단한다. 🔥
6. 배열은 `T[]`/`Array<T>`, 섞이면 `(A|B)[]`. ⭐
7. 튜플은 런타임 배열이라 push 함정이 있고 readonly로 방어 가능. 🛡️
8. 인덱스 시그니처는 편하지만 오타 키를 잡기 어렵다. 🛡️
9. `Record + keyof`는 키 범위를 제한해 딕셔너리를 안전하게 만든다. ⭐
10.   `satisfies`는 “검증 엄격 + 추론 유지”를 동시에 노린다. 🔥
11.   any는 TS 안전장치를 끈다(최후의 수단). 🛡️
12.   never + assertNever는 분기 누락을 잡는 실무급 안전장치다. ⭐🔥

---

## 📎 참고 자료

- winterlood 핸드북(강의 내용과 1:1 정리): https://ts.winterlood.com/
- (해당 섹션) 기본타입이란: https://ts.winterlood.com/c3003661-2e05-4044-a637-a4c5f1284919
- 배열과 튜플: https://ts.winterlood.com/43888ee0-9227-4a8d-994e-2336ee78bfcf
- 타입 별칭과 인덱스 시그니처: https://ts.winterlood.com/156628c8-e779-4ea9-b40b-a77dd083e214
- 열거형 타입: https://ts.winterlood.com/ed2b0365-72ea-4c3e-b646-7e9e22a472aa
- void와 never: https://ts.winterlood.com/2fc094af-7fe4-46d4-8c24-bb0596172b2e
- 타입 계층도(이해하기 섹션): https://ts.winterlood.com/1d6906f2-b724-43d0-bc61-8ec455e6d8e8
