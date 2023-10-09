const userName = "Max";
//userName = "Maximilian";   // 수정 불가
let age2 = 30;


function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
}

//console.log(result)

// 화살표 함수 
const add2 = (a: number, b: number) => {
  return a + b;
}

// 화살표 함수 축약
const add3 = (a: number, b: number=1) => a + b;

// 화살표 함수 축약2
const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if(button) {
  button.addEventListener('click', event => console.log(event));
}

console.log(add2(2, 5));
console.log(add3(5, 6));
printOutput(add3(5));

// Spread 연산자
const hobbies = ['Sports', 'Cooking', 'Hiking', 'Coding'];
console.log(hobbies[0], hobbies[1]);

const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
console.log(activeHobbies);

const person = {
  firstName: 'Max',
  age: 30
};

const copiedPerson = {...person};
console.log(copiedPerson);

const add4 = (...numbers: number[]) => {
  let result = 0;
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
    }, 0);                        // 0은 초기값
};

const addNumbers = add4(5, 10, 2, 3.7);
console.log(addNumbers);

// 배열, 객체 비구조 할당
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

const {firstName: FName, age} = person;
console.log(FName, age, person);