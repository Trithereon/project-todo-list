export default class Task {
    constructor(title, desc, priority, dueDate, isComplete = false){
        this.title = title;
        this.id = crypto.randomUUID();
        this.desc = desc;
        this.priority = priority;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
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