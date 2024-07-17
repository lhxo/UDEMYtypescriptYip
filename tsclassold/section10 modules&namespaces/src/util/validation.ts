//Validation
export interface Validatable {
    //what we are validating
    value: string | number;
    //the question marks allow these fields to be optional. This way we can create a validator function
    //that allows us to put what kind of parameters to validate.
    //if it is a required field
    required?: boolean;
    //length of what we are validating
    minimumLength?: number;
    maximumLength?: number;
    //size of what we are validating
    minimumInput?: number;
    maximumInput?: number;
}

//This validate function takes parameters that are in our interface.
export function validate(validatableInput: Validatable) {
    //Assumes that initially the inputted value is valid
    let isValid = true;
    //Now we will go through each of our requirements for validation
    //If our target is required then...
    if(validatableInput.required) {
        //if isValid is true AND our inputted value is not empty
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    //if our target's minimum length is not set AND  is a string
    if(validatableInput.minimumLength != null && typeof validatableInput.value === 'string') {
        //if isvalid is true AND our input is larger than our set minimum
        isValid = isValid && validatableInput.value.length >= validatableInput.minimumLength;
    }
    //if our target's maximum length is set' AND  is a string
    if(validatableInput.maximumLength != null && typeof validatableInput.value === 'string') {
        //if isvalid is true AND our input is smaller than our set maximum
        isValid = isValid && validatableInput.value.length <= validatableInput.maximumLength;
    }
    //if our target's minimum input is not set AND is a number
    if(validatableInput.minimumInput != null && typeof validatableInput.value === 'number') {
        //if isvalid is true AND our input is greater than our minimum value
        isValid = isValid && validatableInput.value >= validatableInput.minimumInput;
    }
    //if our target's maximum input is not set AND is a number
    if(validatableInput.maximumInput != null && typeof validatableInput.value === 'number') {
        //if isvalid is true AND our input is smaller than our maximum value
        isValid = isValid && validatableInput.value <= validatableInput.maximumInput;
    }
    //If all these checks are true, then return true
    return isValid;
}
