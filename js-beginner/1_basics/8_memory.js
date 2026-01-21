/**
 * ==========================================
 * JavaScript 메모리 구조 완벽 정리 (2026)
 * ==========================================
 * - Stack / Heap
 * - Primitive vs Reference
 * - 얕은 복사 vs 깊은 복사
 * - Garbage Collection 개념
 *
 * 👉 "왜 값이 바뀌었지?"에 답하는 파일
 */

// ==========================================
// 1. 자바스크립트 메모리 구조 개요
// ==========================================
console.log('--- 메모리 구조 개요 ---');

/**
 * JavaScript 메모리는 크게 두 영역
 *
 * 1️⃣ Stack (스택 메모리)
 * - 원시 타입 저장
 * - 함수 실행 컨텍스트
 * - 빠름, 자동 관리
 *
 * 2️⃣ Heap (힙 메모리)
 * - 객체, 배열, 함수 저장
 * - 참조(reference) 기반
 * - Garbage Collector가 관리
 */

console.log('Stack vs Heap 이해가 핵심');

console.log('='.repeat(40));

// ==========================================
// 2. Primitive Type (원시 타입)
// ==========================================
console.log('--- Primitive Type ---');

/**
 * Primitive Type 특징
 * - 값 자체가 Stack에 저장
 * - 복사 시 "값 복사"
 * - 서로 완전히 독립
 *
 * 종류:
 * string, number, boolean
 * null, undefined, symbol, bigint
 */

let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20

/**
 * 메모리 상태
 * a -> 10
 * b -> 20
 *
 * 👉 서로 영향 없음
 */

console.log('='.repeat(40));

// ==========================================
// 3. Reference Type (참조 타입)
// ==========================================
console.log('--- Reference Type ---');

/**
 * Reference Type 특징
 * - 실제 데이터는 Heap에 저장
 * - Stack에는 "주소(참조)"만 저장
 * - 복사 시 "주소 복사"
 *
 * 종류:
 * object, array, function
 */

const user1 = {
   name: '신재준',
   age: 25,
};

const user2 = user1;

user2.age = 30;

console.log(user1.age); // 30
console.log(user2.age); // 30

/**
 * 메모리 상태
 * user1 ─┐
 *        ├─> Heap { name, age: 30 }
 * user2 ─┘
 *
 * 👉 같은 객체를 가리킴
 */

console.log('='.repeat(40));

// ==========================================
// 4. Primitive vs Reference 차이 요약
// ==========================================
console.log('--- Primitive vs Reference ---');

let x = 1;
let y = x;
y = 2;

const obj1 = { value: 1 };
const obj2 = obj1;
obj2.value = 2;

console.log(x, y); // 1, 2
console.log(obj1.value, obj2.value); // 2, 2

/**
 * Primitive → 값 복사
 * Reference → 주소 복사
 */

console.log('='.repeat(40));

// ==========================================
// 5. 함수와 메모리 (중요)
// ==========================================
console.log('--- 함수와 메모리 ---');

function changeValue(num, obj) {
   num = 100;
   obj.name = '안유진';
}

let number = 10;
let person = { name: '신재준' };

changeValue(number, person);

console.log(number); // 10 ❗
console.log(person.name); // 안유진 ❗

/**
 * 이유:
 * - num → primitive → 값 복사
 * - obj → reference → 주소 복사
 */

console.log('='.repeat(40));

// ==========================================
// 6. 얕은 복사 (Shallow Copy)
// ==========================================
console.log('--- 얕은 복사 ---');

/**
 * 얕은 복사란?
 * - 겉만 복사
 * - 내부 reference는 공유
 */

const original = {
   name: '신재준',
   skills: ['JS', 'React'],
};

// 얕은 복사 방법
const copy1 = Object.assign({}, original);
const copy2 = { ...original };

copy1.skills.push('TypeScript');

console.log(original.skills); // ['JS', 'React', 'TypeScript']
console.log(copy1.skills); // 같은 결과

/**
 * 👉 내부 배열은 여전히 같은 Heap 참조
 */

console.log('='.repeat(40));

// ==========================================
// 7. 깊은 복사 (Deep Copy)
// ==========================================
console.log('--- 깊은 복사 ---');

/**
 * 깊은 복사란?
 * - Heap 내부까지 완전 복사
 * - 서로 독립
 */

// 방법 1️⃣ JSON (단점 있음)
const deepCopy1 = JSON.parse(JSON.stringify(original));
deepCopy1.skills.push('Vue');

console.log(original.skills); // 영향 없음
console.log(deepCopy1.skills);

// 방법 2️⃣ structuredClone (권장)
const deepCopy2 = structuredClone(original);
deepCopy2.skills.push('Next.js');

console.log(original.skills);
console.log(deepCopy2.skills);

console.log('='.repeat(40));

// ==========================================
// 8. Garbage Collection (GC)
// ==========================================
console.log('--- Garbage Collection ---');

/**
 * Garbage Collection이란?
 * - 더 이상 참조되지 않는 Heap 메모리 정리
 * - 개발자가 직접 메모리 해제 ❌
 */

let temp = { data: 123 };
temp = null;

/**
 * Heap에 있던 { data: 123 }
 * → 참조 없음
 * → GC 대상
 */

console.log('GC는 자동으로 동작');

console.log('='.repeat(40));

// ==========================================
// 9. 메모리 누수 예시 (주의)
// ==========================================
console.log('--- 메모리 누수 ---');

let cache = [];

function addCache(item) {
   cache.push(item);
}

addCache({ huge: 'data' });
addCache({ huge: 'data' });

/**
 * 전역 배열, 이벤트 리스너, 클로저
 * → 참조가 남아있으면 GC 불가
 */

console.log('불필요한 참조는 제거 필요');

console.log('='.repeat(40));

// ==========================================
// 10. 핵심 정리
// ==========================================
/**
 * ✅ 메모리 핵심 요약
 *
 * 1️⃣ Primitive
 * - 값 복사
 * - Stack 저장
 *
 * 2️⃣ Reference
 * - 주소 복사
 * - Heap 저장
 *
 * 3️⃣ 함수 인자
 * - Primitive: 영향 없음
 * - Object: 원본 변경 가능
 *
 * 4️⃣ 얕은 복사
 * - 1단계만 복사
 * - 내부 참조 공유
 *
 * 5️⃣ 깊은 복사
 * - Heap까지 복사
 * - structuredClone 권장
 *
 * 6️⃣ Garbage Collection
 * - 참조 없으면 자동 정리
 *
 * ⚠️ 실무 포인트
 * - 객체를 함수에 넘길 때 항상 "원본 변경" 의식
 * - 상태 관리(React)에서 특히 중요
 */

console.log('메모리 이론 정리 끝!');
