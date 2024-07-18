let userInput: unknown;
let uUsername: string;

userInput = 5;
userInput = 'Christopher';
if (typeof userInput === 'string'){
    uUsername = userInput;
}

function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code};
}

generateError('An error occurred!', 500);