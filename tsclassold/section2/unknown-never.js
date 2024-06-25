"use strict";
let userInput;
let uUsername;
userInput = 5;
userInput = 'Christopher';
if (typeof userInput === 'string') {
    uUsername = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An error occurred!', 500);
