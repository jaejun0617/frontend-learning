// ==========================================
// 1. Raw Data (데이터 정의)
// ==========================================
// 기존처럼 변수를 따로 두지 않고, 전체 구조를 하나의 객체로 만듭니다.
const kpopData = {
   country: '대한민국',
   groups: [
      {
         groupName: '아이브',
         gender: 'female', // 성별 정보 추가 (클래스 분기용)
         members: [
            { name: '가을', birth: '2002-09-24' },
            { name: '안유진', birth: '2003-09-01' },
            { name: '레이', birth: '2004-02-03' },
            { name: '장원영', birth: '2004-08-31' },
            { name: '리즈', birth: '2004-11-21' },
            { name: '이서', birth: '2007-02-21' },
         ],
      },
      {
         groupName: '방탄소년단',
         gender: 'male',
         members: [
            { name: 'RM', birth: '1994-09-12' },
            { name: '진', birth: '1992-12-04' },
            { name: '슈가', birth: '1993-03-09' },
            { name: '제이홉', birth: '1994-02-18' },
            { name: '지민', birth: '1995-10-13' },
            { name: '뷔', birth: '1995-12-30' },
            { name: '정국', birth: '1997-09-01' },
         ],
      },
   ],
};

// ==========================================
// 2. 클래스 정의 (All Together 로직 추가)
// ==========================================

class Idol {
   name;
   birth;
   constructor(name, birth) {
      this.name = name;
      this.birth = birth;
   }
}

class MaleIdol extends Idol {
   sing() {
      return `${this.name}이(가) 노래를 부릅니다 🎤`;
   }
}

class FemaleIdol extends Idol {
   dance() {
      return `${this.name}이(가) 춤을 춥니다 💃`;
   }
}

class IdolGroup {
   name;
   members;
   constructor(name, members) {
      this.name = name;
      this.members = members;
   }
}

class Country {
   name;
   idolGroups; // IdolGroup[]

   constructor(name, idolGroups) {
      this.name = name;
      this.idolGroups = idolGroups;
   }

   // 🔥 여기가 핵심! (All Together 메서드)
   // 데이터만 넣으면 Country -> Group -> Member까지 싹 다 만들어줌
   static fromData(data) {
      // 1. 그룹 데이터를 순회하며 IdolGroup 인스턴스 생성
      const groups = data.groups.map((groupData) => {
         // 2. 멤버 데이터를 순회하며 Idol 인스턴스 생성
         const members = groupData.members.map((memberData) => {
            // 성별에 따라 클래스 분기 처리
            if (groupData.gender === 'female') {
               return new FemaleIdol(memberData.name, memberData.birth);
            } else {
               return new MaleIdol(memberData.name, memberData.birth);
            }
         });

         // 3. 그룹 생성 후 반환
         return new IdolGroup(groupData.groupName, members);
      });

      // 4. 최종적으로 Country 생성 후 반환
      return new Country(data.country, groups);
   }
}

// ==========================================
// 3. 실행 (한 줄로 끝내기)
// ==========================================

// 기존: map 돌리고, new 하고, 변수 담고... (복잡)
// 변경: 데이터만 넣으면 끝!
const korea = Country.fromData(kpopData);

console.log(korea);

// 잘 만들어졌는지 테스트
const firstGroup = korea.idolGroups[0]; // 아이브
const secondGroup = korea.idolGroups[1]; // 방탄

console.log(`\n그룹명: ${firstGroup.name}`);
console.log(firstGroup.members[1].dance()); // 안유진 춤 (FemaleIdol)

console.log(`\n그룹명: ${secondGroup.name}`);
console.log(secondGroup.members[1].sing()); // RM 노래 (MaleIdol)
