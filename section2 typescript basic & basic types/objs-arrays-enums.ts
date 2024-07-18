enum Role { ADMIN = 5, READ_ONLY = 100, AUTHOR = 200}

const person = {
    name: "Christopher",
    age: 33,
    hobbies: ['Cooking', 'Games'],
    role: Role.ADMIN,
}

let favoriteActivities: string[];
favoriteActivities = ['Games'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
}

if (person.role === Role.AUTHOR) {
    console.log('is author')
}