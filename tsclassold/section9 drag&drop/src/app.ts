//Created the custom project type allows us to accept only arrays of type Project[]
//This allows for better coding practice than to accept any type. Now everything
//must have these parameters.
//Project Type
enum ProjectStatus {Active, Finished}

class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
    ) {

    }
}

//Project State Mentement
//Listener is a function that receives our array of projects and does soemthing to it. 
//We don't care about the data that is returned. 
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFunction: Listener<T>) {
        this.listeners.push(listenerFunction)
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState
    
    private constructor() {
        super();
    }

    static getInstance() {
        if(this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject)
        for(const listenerFunction of this.listeners) {
            listenerFunction(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

//Validation
interface Validatable {
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
function validate(validatableInput: Validatable) {
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

//Autobind Decorator
//target and name not used so replaced with _1 and _2
function Autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFunction = originalMethod.bind(this);
            return boundFunction
        }
    }
    return adjustedDescriptor
}

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    //Inside a template that will be rendered.
    templateElement: HTMLTemplateElement;
    //This is still where we are rendering the data (app)
    hostElement: T;
    //Note that this is HTMLElement instead of form due to us working with the data 
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        //Where I want to render
        this.hostElement = document.getElementById(hostElementId)! as T;

        //This will render the content of templateElement (title/description/people)
        //importNode is a global document object, it's parameters are (what you want to import, deep clone/all levels of nesting)
        const importedNode = document.importNode(this.templateElement.content, true)
        //This will be the <h1>
        this.element = importedNode.firstElementChild as U;
        //applies the id of either active/finished, this allows for our rendered form element to access our css
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart);
    }

    //render list to the dom
    private attach(insertAtBeginning: boolean) {
        //insertAdjacentElement is another global document object. The first argument is (after begin/end or before begin/end, what we want to insert)
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin':'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    constructor(hostId: string, project: Project){
        super('single-project', hostId, false, project.id)
        this.project = project

        this.configure();
        this.renderContent();
    }

    configure() {}
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description
    }
}

// Renders active and finished projects and stores them in a list.
// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    //Create a default property that accepts any type of array. This will hold the current project
    //or object that we are working on.
    assignedProjects: Project[];

    //our constructor requires a parameter that is either marked as active or finished
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        //Where I want to render
        this.assignedProjects = [];

        //runs the listener
        this.configure()
        //render the list and the container
        this.renderContent()
    }

    configure() {
        projectState.addListener((projects: Project[]) =>{
            const relevantProjects = projects.filter(prj => {
                if(this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                } else {
                    return prj.status === ProjectStatus.Finished;
                }
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects()
        });
    };

    //render the list and the container
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ` PROJECTS`
    }

    //
    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElement.innerHTML = '';
        for(const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}

//Handles the rendering the form, getting user input, sets parameters for validation, stores user input
//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
        const titleValidatable: Validatable = {
            //Title must exist
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            //Description must exist, minimum length of 5, maximum of 256
            value: enteredDescription,
            required: true,
            minimumLength: 5,
            maximumLength: 256
        }
        const peopleValidatable: Validatable = {
            //People converted to a number, must exist, minimum input of 1, and maximum input of 5
            value: +enteredPeople,
            required: true,
            minimumInput: 1,
            maximumInput: 5
        }

        //This is where we have the logic to validate. Now we can if any of these return false then
        //we will return invalid input. If not then we store the data into a tuple.
        if(
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable) 
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

//Instantiate project
const projectINput = new ProjectInput()
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');