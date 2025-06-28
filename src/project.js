export default class Project {
    constructor(title) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    getTaskList() {
        return this.tasks;
    }

    getTaskById(id) {
        const task = this.tasks.find(task => task.id === id);
        // console.log(task);
        // console.log("the above output is the value task from getTaskById method in Project");
        return task;
    }

    updateTask(id, newDetails) {
        const taskToBeUpdated = this.getTaskById(id);
        // console.log(taskToBeUpdated);
        // console.log('the above output is "taskToBeUpdated" inside updateTask in Project class');
        taskToBeUpdated.updateDetails(newDetails);
    }

    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        // The if statement only performs a splice if a valid index is found.
        if (taskIndex !== -1) this.tasks.splice(taskIndex, 1); 
    }
}