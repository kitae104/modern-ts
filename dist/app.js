"use strict";
const userName = "Max";
let age2 = 30;
function add(a, b) {
    let result;
    result = a + b;
    return result;
}
const add2 = (a, b) => {
    return a + b;
};
const add3 = (a, b = 1) => a + b;
const printOutput = output => console.log(output);
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}
console.log(add2(2, 5));
console.log(add3(5, 6));
printOutput(add3(5));
const hobbies = ['Sports', 'Cooking', 'Hiking', 'Coding'];
console.log(hobbies[0], hobbies[1]);
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
const person = {
    firstName: 'Max',
    age: 30
};
const copiedPerson = Object.assign({}, person);
console.log(copiedPerson);
const add4 = (...numbers) => {
    let result = 0;
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addNumbers = add4(5, 10, 2, 3.7);
console.log(addNumbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName: FName, age } = person;
console.log(FName, age, person);
//# sourceMappingURL=app.js.map