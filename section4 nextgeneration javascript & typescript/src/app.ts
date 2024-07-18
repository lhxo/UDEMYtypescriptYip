// const add = (a: number, b: number = 5) => {
//     return a+b;
// }

// const printOutput = (output: string | number) => {
//     console.log(output)
// }

// printOutput(add(3));
// const add = (a: number, b:number) => a +b

// console.log(add(2,5));



// const printOutput: (a: number | string) => void = output => console.log(output);

// const button = document.querySelectorAll('button');

// button.forEach(button => {
//     button.addEventListener('click', event => console.log(event));
// });

const hobbies = ['Sports', 'Cooking']
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies)

const person = {
    firstName: 'Christopher',
    age: 33,
};

const copiedPerson = { ...person};

const add = (...numbers: number[]) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};

const addNumbers = add(5,10,2,3.7)

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies);

const { firstName: userName, age } = person;

console.log(userName, age)