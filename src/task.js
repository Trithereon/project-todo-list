export default class Task {
    constructor(title, details, priority, dueDate, projectId){
        this.title = title;
        this.id = crypto.randomUUID();
        this.details = details;
        this.priority = priority;
        this.dueDate = dueDate;
        this.isComplete = false;
        this.projectId = projectId;
    }
    
    toggleComplete() {
        this.isComplete = !this.isComplete;
    }

    updateDetails(newDetails) {
        // Template: Object.assign(target, source)
        // where source is an object with properties I want to apply.
        // I think that only specified properties are modified.
        Object.assign(this, newDetails);
    }
}