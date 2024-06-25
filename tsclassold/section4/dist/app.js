"use strict";
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
const person = {
    firstName: 'Christopher',
    age: 33,
};
const copiedPerson = Object.assign({}, person);
const add = (...numbers) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};
const addNumbers = add(5, 10, 2, 3.7);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies);
const { firstName: userName, age } = person;
console.log(userName, age);
//# sourceMappingURL=app.js.map