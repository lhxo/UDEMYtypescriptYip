import { Component } from './base-component.js';
import * as Validation from '../util/validation.js';
import { Autobind } from '../decorators/autobind-decorator.js';
import { projectState } from '../state/project-state.js';

    //Handles the rendering the form, getting user input, sets parameters for validation, stores user input
    //ProjectInput Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        //tsconfig allows us to use html typing due to dom:true
        //Form elements
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        //The constructor will select the data and the setup then run our insertion methods below.
        constructor() {
            super('project-input', 'app', true, 'user-input')

            //We assign these elements to the id's of our forms. This allows us to store our content of those id's in these variables.
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

            //Executes our methods
            this.configure()
        }

        configure() {
            //This is our event listener to when we click our submit button
            //A reminder that we have to bind or create an autobind decorator because addEventListener will point at undefined instead of this.
            this.element.addEventListener('submit', this.submitHandler)

        }

        renderContent() {
            
        }

        //We are gathering the user's input for title, description, and people and storing it into a tuple (defined array)
        //Additionally we either return a tuple or void. The void catches our validation. We also describe our requirements
        //for what is needed in our inputs and run it through our validator
        private gatherUserInput(): [string, string, number] | void {
            //storing values
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            
            //These three variables store what needs to be validated.
            const titleValidatable: Validation.Validatable = {
                //Title must exist
                value: enteredTitle,
                required: true
            }
            const descriptionValidatable: Validation.Validatable = {
                //Description must exist, minimum length of 5, maximum of 256
                value: enteredDescription,
                required: true,
                minimumLength: 5,
                maximumLength: 256
            }
            const peopleValidatable: Validation.Validatable = {
                //People converted to a number, must exist, minimum input of 1, and maximum input of 5
                value: +enteredPeople,
                required: true,
                minimumInput: 1,
                maximumInput: 5
            }

            //This is where we have the logic to validate. Now we can if any of these return false then
            //we will return invalid input. If not then we store the data into a tuple.
            if(
                !Validation.validate(titleValidatable) ||
                !Validation.validate(descriptionValidatable) ||
                !Validation.validate(peopleValidatable) 
            ) {
                //Sends an error if any of our inputs do not meet our requirements
                alert('Invalid input!')
                //this returns void
                return
            } else {
                //this returns our tuple, also +enteredPeople converts it into a number.
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }

        //function that removes text from our form
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        //When our button is clicked we will run gatherUserInput() and store inside userInput and only use it if it returns a Tuple.
        @Autobind
        private submitHandler(event: Event) {
            //stops an httprequest
            event.preventDefault()
            const userInput = this.gatherUserInput()
            //We run Array.isArray because we want to check if userInput is a tuple. Tuple is in TS, but not JS
            if(Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title,description,people);
                this.clearInputs()
            }
        }
    }
