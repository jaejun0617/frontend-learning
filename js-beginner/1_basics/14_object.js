// Object (객체) 굉장히 매우 중요!

// 키 : 밸류 페어
let yuJin = {
   name: '안유진',
   group: '아이브',
   dance: function () {
      return `${this.name}이 춤을 춥니다.`;
   },
};
console.log(yuJin);
console.log(yuJin.name);
// console.log(yuJin['name']);

// const key = 'name';
// console.log(yuJin[key]);

console.log(yuJin.dance());

const nameKey = 'name';
const nameValue = '안유진';
const groupKey = 'group';
const groupValue = '아이브';

const yuJin2 = {
   [nameKey]: nameValue,
   [groupKey]: groupValue,
   dance: function () {
      return `${this.name} 이 춤을 춥니다`;
   },
};

console.log(yuJin2);
console.log(yuJin2.dance());

yuJin2['group'] = '코드팩토리';

console.log(yuJin2);

yuJin2['enName'] = 'An Yu Jin';
console.log(yuJin2);

delete yuJin2['enName'];

console.log(yuJin2);

// 객체의 특징
// 1 콘스트로 선언할경우 객체 자체를 변경 못함
// 2 객체 안의 프로퍼티나 메서드는 변강할수있다

const wonYoung = {
   name: '장원영',
   group: '아이브',
};

console.log(wonYoung);
// wonYoung = {};

wonYoung['group'] = '코드팩토리';
console.log(wonYoung);

// 모든 키 값 다 가져오기
console.log(Object.keys(wonYoung));
console.log(Object.values(wonYoung));

const name = '안유진';

const yuJin3 = {
   name,
};

console.log(yuJin3);
