// Event handling module.


export default class EventHandler {
    static actionHandlers = {
        details: EventHandler.handleDetails,
        edit: EventHandler.handleEdit,
        delete: EventHandler.handleDelete,
        taskComplete: EventHandler.handleTaskComplete,
        cardNewTask: EventHandler.handleCardNewTask,
        navNewTask: EventHandler.handleNavNewTask,
        navNewProject: EventHandler.handleNavNewProject,
        cancel: EventHandler.handleCancel,
        submitCardTask: EventHandler.handleSubmitCardTask,
        submitNavTask: EventHandler.handleSubmitNavTask,
        submitEditTask: EventHandler.handleSubmitEditTask,
    };
    
    static init() {
        document.addEventListener("click", EventHandler.handleClick);
    }
    static handleClick(e) {
        const action = e.target.dataset.action;
        // Execute the associated function, passing the e onto the next function.
        if (action) EventHandler.actionHandlers[action](e);
        // If the clicked element has no data-action, then ignore the click.
        else return;
    }
    static handleDetails(e) {

    }
    static handleEdit(e) {

    }
    static handleDelete(e) {

    }
    static handleTaskComplete(e) {

    }
    static handleCardNewTask(e) {

    }
    static handleNavNewTask(e) {

    }
    static handleNavNewProject(e) {

    }
    static handleCancel(e) {

    }
    static handleSubmitCardTask(e) {

    }
    static handleSubmitNavTask(e) {

    }
    static handleSubmitEditTask(e) {

    }







}