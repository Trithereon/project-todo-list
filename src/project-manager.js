export default class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(newProject) {
        this.projects.push(newProject);
    }

    getProjectList() {
        return this.projects;
    }

    getProjectById(id) {
        const project = this.projects.find(project => project.id === id);
        // console.log(project);
        // console.log("the above output is the value project from getprojectById method in Project");
        return project;
    }

    updateProject(id, newDetails) {
        const projectToBeUpdated = this.getProjectById(id);
        // console.log(projectToBeUpdated);
        // console.log('the above output is "projectToBeUpdated" inside updateProject in Project class');
        projectToBeUpdated.updateDetails(newDetails);
    }

    deleteProject(id) {
        const projectIndex = this.projects.findIndex(project => project.id === id);
        // The if statement only performs a splice if a valid index is found.
        if (projectIndex !== -1) this.projects.splice(projectIndex, 1); 
    }
}