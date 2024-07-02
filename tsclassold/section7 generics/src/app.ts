// // const names = ['Christopher', 'Vani']
// const names: Array<string> = [];

// const promise: Promise<number> = new Promise((resolve, reject) => {
//     setTimeout(()=> {
//         resolve(10)
//     }, 2000)
// });

// promise.then(data => {
//     data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({name: 'Christopher', hobbies: ['Games']}, {age: 33});
console.log(mergedObj);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if(element.length === 1) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1){
        descriptionText = `got ${element.length} elements.`
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(mergedObj.name))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`;
}

extractAndConvert({age: '33'}, 'age');

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1)
    }
    getItems(){
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Christopher')
textStorage.addItem('Vani')
textStorage.removeItem('Christopher')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>();


// const objStorage = new DataStorage<object>();
// const chrisObj = {name: 'Christopher'}
// const vaniObj = {name: 'Vani'}
// objStorage.addItem(chrisObj);
// objStorage.addItem(vaniObj);
// //...
// objStorage.removeItem(chrisObj);
// console.log(objStorage.getItems())

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date):CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}