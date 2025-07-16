export default class Task {
    constructor(title, details, priority, dueDate, id, isComplete){
        this.title = title;
        this.id = id || crypto.randomUUID();
        this.details = details;
        this.priority = priority;
        this.dueDate = dueDate;
        this.isComplete = isComplete || false;
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