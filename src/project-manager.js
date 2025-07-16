export default class ProjectManager {
    
    static projects = [];

    static addProject(newProject) {
        this.projects.push(newProject);
    }

    static getProjectList() {
        return this.projects;
    }

    static getProjectById(id) {
        const project = this.projects.find(project => project.id === id);
        return project;
    }

    static updateProject(id, newDetails) {
        const projectToBeUpdated = getProjectById(id);
        projectToBeUpdated.updateDetails(newDetails);
    }

    static deleteProject(id) {
        const projectIndex = this.projects.findIndex(project => project.id === id);
        // The if statement only performs a splice if a valid index is found.
        if (projectIndex !== -1) this.projects.splice(projectIndex, 1); 
    }

    static nukeProjects() {
        this.projects = [];
    }
}