
    // Component Base Class
    export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
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