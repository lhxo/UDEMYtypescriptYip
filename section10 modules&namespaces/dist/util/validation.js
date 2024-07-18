export function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minimumLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minimumLength;
    }
    if (validatableInput.maximumLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maximumLength;
    }
    if (validatableInput.minimumInput != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.minimumInput;
    }
    if (validatableInput.maximumInput != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.maximumInput;
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map