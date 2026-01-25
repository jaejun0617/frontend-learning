/**
 * =====================================================================
 * 14_object.js - Object(객체) 핵심 + 실무 패턴 템플릿
 * =====================================================================
 * 목표:
 * - 객체의 핵심(키/값, 접근 방식, this)
 * - 실무에서 버그 줄이는 패턴(불변 업데이트, 안전 접근, 순회)
 * - 면접 포인트(얕은 복사, const 재할당 vs 내부 변경)
 */

console.log('='.repeat(50));
console.log('Object 핵심 + 실무 패턴');
console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 1) 객체 기본: key-value + 접근 방식(. vs [])
// ---------------------------------------------------------------------

const yuJin = {
   name: '안유진',
   group: '아이브',
   // ✅ this가 필요한 메서드는 "메서드 축약" 문법이 안전
   // - 화살표 함수는 this가 렉시컬(바깥 스코프)로 고정되므로
   //   객체 메서드에서 this를 기대하면 헷갈릴 수 있음
   dance() {
      return `${this.name}이 춤을 춥니다.`;
   },
};

console.log('--- 1) 기본 접근 ---');
console.log(yuJin.name); // ✅ 정적(고정) 키 접근
console.log(yuJin['name']); // ✅ 동적 키가 필요할 때도 가능
console.log(yuJin.dance());

// ✅ 동적 키 접근은 "[]"만 가능
const dynamicKey = 'group';
console.log('동적 키 접근:', yuJin[dynamicKey]);

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 2) Computed Property (동적 키로 객체 만들기)
// ---------------------------------------------------------------------

const nameKey = 'name';
const nameValue = '안유진';
const groupKey = 'group';
const groupValue = '아이브';

const yuJin2 = {
   // ✅ 키를 변수로 만들고 싶다면 [key] 문법(Computed Property)
   [nameKey]: nameValue,
   [groupKey]: groupValue,
   dance() {
      return `${this.name}이 춤을 춥니다.`;
   },
};

console.log('--- 2) Computed Property ---');
console.log(yuJin2);
console.log(yuJin2.dance());

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 3) const 객체의 진실: 재할당 ❌, 내부 변경 ✅
// ---------------------------------------------------------------------

// ❗️자주 헷갈리는 포인트
// - const는 "변수(레퍼런스) 재할당"만 막음
// - 객체 내부 프로퍼티 변경은 가능(= 같은 참조를 가리키는 상태)

const wonYoung = {
   name: '장원영',
   group: '아이브',
};

console.log('--- 3) const 객체 변경 ---');
console.log('before:', wonYoung);

// wonYoung = {}; // ❌ 재할당은 불가
wonYoung.group = '코드팩토리'; // ✅ 내부 프로퍼티 변경은 가능
console.log('after:', wonYoung);

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 4) 실무 패턴: "불변 업데이트"(원본을 안 바꾸는 업데이트)
// ---------------------------------------------------------------------

// ✅ 상태 관리(React 등)에서는 원본을 직접 변경(mutation)하면
//   버그가 생기기 쉬워서, 보통 불변 업데이트로 새 객체를 만듦

const wonYoungUpdated = {
   ...wonYoung, // ✅ 얕은 복사(Shallow Copy): 1 depth만 새로
   group: '아이브', // ✅ 변경할 키만 덮어쓰기
};

console.log('--- 4) 불변 업데이트 ---');
console.log('원본:', wonYoung);
console.log('새 객체:', wonYoungUpdated);
console.log('같은 객체?', wonYoung === wonYoungUpdated); // false

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 5) 프로퍼티 추가/삭제: delete 보다 "제외 후 새 객체"를 선호
// ---------------------------------------------------------------------

const profile = {
   name: '안유진',
   group: '아이브',
   enName: 'An Yu Jin',
};

console.log('--- 5) 추가/삭제(실무형) ---');

// ✅ 추가(불변): 새 객체로
const profileWithCity = {
   ...profile,
   city: '고양시',
};

// ⚠️ delete는 동작은 하지만, 상태 관리/추적/최적화 측면에서
//   "키 제거"를 새 객체로 처리하는 패턴이 더 안전한 경우가 많음
// ✅ 제거(불변): 구조분해로 제외
const { enName, ...profileWithoutEnName } = profileWithCity;

console.log('원본:', profile);
console.log('추가된 새 객체:', profileWithCity);
console.log('enName 제거된 새 객체:', profileWithoutEnName);

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 6) 키/값 가져오기 + 안전한 순회(Object.entries)
// ---------------------------------------------------------------------

console.log('--- 6) keys/values/entries ---');
console.log('keys:', Object.keys(wonYoungUpdated));
console.log('values:', Object.values(wonYoungUpdated));

for (const [key, value] of Object.entries(wonYoungUpdated)) {
   // ✅ 객체 순회는 Object.entries + for...of가 의도가 명확
   console.log(key, value);
}

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 7) ES6 단축 프로퍼티(Shorthand)
// ---------------------------------------------------------------------

const name = '안유진';
const yuJin3 = {
   // ✅ name: name 과 동일
   name,
};

console.log('--- 7) Shorthand ---');
console.log(yuJin3);

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 8) 안전 접근(Optional Chaining) + 기본값(Nullish Coalescing)
// ---------------------------------------------------------------------

const apiResponse = {
   user: {
      profile: null,
   },
};

// ✅ 실무에서 API 응답은 null/undefined가 섞이기 쉬움
// - ?. 로 안전하게 내려가고
// - ?? 로 null/undefined일 때만 기본값 적용
const city = apiResponse.user?.profile?.city ?? '도시 정보 없음';

console.log('--- 8) 안전 접근 ---');
console.log('city:', city);

console.log('='.repeat(50));

// ---------------------------------------------------------------------
// 9) (선택) 설정 객체는 freeze로 실수 방지
// ---------------------------------------------------------------------

const config = Object.freeze({
   theme: 'dark',
   version: 1,
});

console.log('--- 9) Object.freeze ---');
console.log(config);

// config.version = 2; // ⚠️ 엄격 모드에서는 에러, 아니면 무시될 수 있음

console.log('='.repeat(50));
console.log('Object 정리 끝!');
