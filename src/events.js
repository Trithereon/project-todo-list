// Event handling module.
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager';
import UI from './ui';

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
        // Find parent, details will be next to it, toggle open state.
        console.log('clicking details successfully called the handleDetails function in events.js');
        const parent = e.target.closest('.card-actions-container');
        const details = parent.previousElementSibling;
        details.open = !details.open;
        if (e.target.src === detailsRightImg) {
            e.target.src = detailsDownImg;
        } 
        else e.target.src = detailsRightImg;
        // Consider moving this DOM manipulation to the UI module.
    }
    static handleEdit(e) {
        const projectContainer = e.target.closest('.card-container');
        const taskContainer = e.target.closest('.card-task-item');
        const dialog = document.getElementById('dialog-card-edit-task');
        dialog.dataset.projectId = projectContainer.id;
        dialog.dataset.taskId = taskContainer.id;
        
        const project = ProjectManager.getProjectById(projectContainer.id);
        const task = project.getTaskById(taskContainer.id);
        
        const form = dialog.querySelector('form');
        form.elements['title'].value = task.title;
        form.elements['details'].value = task.details;
        form.elements['priority'].value = task.priority;
        form.elements['dueDate'].value = task.dueDate.slice(0, 16); // Bug fix: slice away the seconds and timezone, otherwise this doesn't work.
        form.elements['project'].value = task.projectId;

        const projectDropdown = dialog.querySelector('select[name="project"]');
        
        // Reset any old options before populating them again. 
        projectDropdown.textContent = ''; 

        ProjectManager.getProjectList().forEach(project => {
            // Store projectId as option.value, but display project title as textContent
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.title;

            projectDropdown.appendChild(option);
        });

        // After generating the dropdown options, display the currently selected task project.
        // projectDropdown.value = task.projectId;
        // projectDropdown.textContent = project.title;

        dialog.showModal();
    }
    static handleDelete(e) {
        // Consider adding a confirmation modal to make user confirm deletion.
        const taskContainer = e.target.closest('.card-task-item');
        const projectContainer = taskContainer.closest('.card-container');
        const currentProject = ProjectManager.getProjectById(projectContainer.id);
        currentProject.deleteTask(taskContainer.id); // Delete from array.
        taskContainer.remove(); // Delete from DOM.
    }
    static handleTaskComplete(e) {
        const taskContainer = e.target.closest('.card-task-item');
        const projectContainer = taskContainer.closest('.card-container');
        const currentProject = ProjectManager.getProjectById(projectContainer.id);
        const currentTask = currentProject.getTaskById(taskContainer.id);
        currentTask.toggleComplete();
    }
    static handleCardNewTask(e) {
        const projectContainer = e.target.closest('.card-container');
        const dialog = document.getElementById('dialog-card-add-new-task');
        // Store project ID as attribute here to make it accessible in submit function.
        dialog.dataset.projectId = projectContainer.id; 
        dialog.showModal();
    }
    static handleNavNewTask(e) {
        const dialog = document.getElementById('dialog-nav-create-new-task');
        const projectDropdown = dialog.querySelector('select[name="project"]');
        
        // Reset any old options before populating them again. 
        projectDropdown.textContent = ''; 

        ProjectManager.getProjectList().forEach(project => {
            // Store projectId as option.value, but display project title as textContent
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.title;

            projectDropdown.appendChild(option);
        });
        dialog.showModal();
    }
    static handleNavNewProject(e) {
        // THIS IS TEMPORARILY PLACED HERE TO TEST THE RENDER FUNCTION.
        ProjectManager.getProjectList().forEach(project => {
            UI.renderSidebarProject(project);
        });
    }
    static handleCancel(e) {
        e.target.closest('form').reset();
        e.target.closest('dialog').close();
    }
    static handleSubmitCardTask(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.elements['title'].value;
        const details = form.elements['details'].value;
        const priority = form.elements['priority'].value;
        const dueDate = form.elements['dueDate'].value;
        const dialog = form.closest('dialog');
        
        const currentProject = ProjectManager.getProjectById(dialog.dataset.projectId);
        const currentProjectCard = document.querySelector(`.card-container[id="${dialog.dataset.projectId}"]`);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        
        // Once the form is validated, proceed.
        currentProject.addTask(title, details, priority, dueDate, currentProject.id);
        const currentIndex = currentProject.getTaskList().length - 1;
        currentProjectCard
            .querySelector('.card-task-list')
            .appendChild(
                UI.renderTask(
                currentProject.getTaskList()[currentIndex],
                dialog.dataset.projectId
            ));
        form.reset();
        dialog.close();
    }
    static handleSubmitNavTask(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.elements['title'].value;
        const details = form.elements['details'].value;
        const priority = form.elements['priority'].value;
        const dueDate = form.elements['dueDate'].value;
        const selectedProject = form.elements['project'].value;
        const dialog = form.closest('dialog');
        const projectObject = ProjectManager.getProjectById(selectedProject);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        
        const currentProjectCard = document.querySelector(`.card-container[id="${selectedProject}"]`);
        
        // Once the form is validated, proceed.
        projectObject.addTask(title, details, priority, dueDate, selectedProject);
        const currentIndex = projectObject.getTaskList().length - 1;
        currentProjectCard
            .querySelector('.card-task-list')
            .appendChild(
                UI.renderTask(
                    projectObject.getTaskList()[currentIndex],
                    selectedProject
                ));
        form.reset();
        dialog.close();
    }
    static handleSubmitEditTask(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.elements['title'].value;
        const details = form.elements['details'].value;
        const priority = form.elements['priority'].value;
        const dueDate = form.elements['dueDate'].value;
        const selectedProject = form.elements['project'].value;
        const dialog = form.closest('dialog');
        const projectObject = ProjectManager.getProjectById(selectedProject);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        
        const currentProjectCard = document.querySelector(`.card-container[id="${selectedProject}"]`);
        const currentTaskId = dialog.dataset.taskId;

        // Once the form is validated, proceed.
        projectObject.updateTask(currentTaskId, {title: title, details: details, priority: priority, dueDate: dueDate, projectId: selectedProject});
        console.log(projectObject.getTaskById(currentTaskId));
        const currentIndex = projectObject.getTaskList().length - 1;
        currentProjectCard
            .querySelector('.card-task-list')
            .appendChild(
                UI.renderTask(
                    projectObject.getTaskList()[currentIndex],
                    selectedProject
                ));
        form.reset();
        dialog.close();

    }







}