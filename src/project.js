import Task from "./task";

export default class Project {
    constructor(title, id) {
        this.title = title;
        this.id = id || crypto.randomUUID();
        this.tasks = [];
    }

    addTask(title, details, priority, dueDate, id, isComplete) {
        const task = new Task(title, details, priority, dueDate, id, isComplete);
        this.tasks.push(task);
    }

    getTaskList() {
        return this.tasks;
    }

    getTaskById(id) {
        const task = this.tasks.find(task => task.id === id);
        return task;
    }

    updateTask(id, newDetails) {
        const taskToBeUpdated = this.getTaskById(id);
        // Note: newDetails should be received in a format similar to {title: 'Modified title'}.
        taskToBeUpdated.updateDetails(newDetails);
    }

    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        // The if statement only performs a splice if a valid index is found.
        if (taskIndex !== -1) this.tasks.splice(taskIndex, 1); 
    }
}