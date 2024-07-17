//Created the custom project type allows us to accept only arrays of type Project[]
//This allows for better coding practice than to accept any type. Now everything
//must have these parameters.
//Project Type
export enum ProjectStatus {Active, Finished}

export class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
    ) {

    }
}