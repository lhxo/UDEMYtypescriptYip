import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project-model';
import { Component } from './base-component';
import { Autobind } from '../decorators/autobind-decorator';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';
// Renders active and finished projects and stores them in a list.
    // ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
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

        @Autobind
        dragOverHandler(event: DragEvent): void {
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable')
            }
        }

        @Autobind
        dropHandler(event: DragEvent): void {
            const projectID = event.dataTransfer!.getData('text/plain')
            projectState.moveProject(projectID, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
        }

        @Autobind
        dragLeaveHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable')
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler)
            this.element.addEventListener('dragleave', this.dragLeaveHandler)
            this.element.addEventListener('drop', this.dropHandler)
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