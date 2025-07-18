// Event handling module.
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager';
import UI from './ui';
import Project from './project';
import Storage from './storage';

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
        submitNewProject: EventHandler.handleSubmitNewProject,
        editProject: EventHandler.handleEditProject,
        deleteProject: EventHandler.handleDeleteProject,
        submitEditProject: EventHandler.handleSubmitEditProject,
        focusProject: EventHandler.handleFocusProject,
        home: EventHandler.handleHome,
        confirmDelete: EventHandler.handleConfirmDelete
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
        form.elements['project'].value = project.id;

        const projectDropdown = form.elements['project'];
        
        // Reset any old options before populating them again. 
        projectDropdown.textContent = ''; 

        ProjectManager.getProjectList().forEach(project => {
            // Store project.id as option.value, but display project title as textContent
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.title;

            projectDropdown.appendChild(option);
        });

        // After generating the dropdown options, display the currently selected task project.
        projectDropdown.value = project.id;

        dialog.showModal();
    }
    static handleDelete(e) {
        const dialog = document.getElementById('dialog-confirm-delete');
        dialog.dataset.delete = 'task';
        dialog.dataset.taskId = e.target.closest('.card-task-item').id;
        dialog.showModal();
    }
    static handleTaskComplete(e) {
        const taskContainer = e.target.closest('.card-task-item');
        const projectContainer = taskContainer.closest('.card-container');
        const currentProject = ProjectManager.getProjectById(projectContainer.id);
        const currentTask = currentProject.getTaskById(taskContainer.id);
        currentTask.toggleComplete();
        Storage.storeData();
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
        // Need renderProject (returns container card)
        // Need renderSidebarProject (returns listItem for sidebar)  
        const dialog = document.getElementById('dialog-create-new-project');
        dialog.showModal();     
    }
    static handleCancel(e) {
        if (e.target.closest('form')){
            e.target.closest('form').reset();
        }

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
        Storage.storeData();
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
        Storage.storeData();
    }
    static handleSubmitEditTask(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.elements['title'].value;
        const details = form.elements['details'].value;
        const priority = form.elements['priority'].value;
        const dueDate = form.elements['dueDate'].value;
        const newlySelectedProjectId = form.elements['project'].value;
        const dialog = form.closest('dialog');
        const newlySelectedProject = ProjectManager.getProjectById(newlySelectedProjectId);
        const currentTaskId = dialog.dataset.taskId;
        const currentProjectId = dialog.dataset.projectId;
        const currentProject = ProjectManager.getProjectById(currentProjectId);
        const currentTask = currentProject.getTaskById(currentTaskId);
        const newlySelectedProjectCard = document.querySelector(`.card-container[id="${newlySelectedProjectId}"]`);
        const currentTaskContainer = document.querySelector(`.card-task-item[id="${currentTaskId}"]`);
        const currentProjectCard = currentTaskContainer.closest('.card-container');
       
        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 

        // Once the form is validated, proceed.
        // Pseudocode:
        // if project is modified, delete task and create new task in selected project.
        // else updateTask with new information.
        // In both cases, the UI needs to be updated, i.e. the old removed and the new appended.
        if (newlySelectedProjectId !== currentProjectId) {
            // Add task to new project.
            newlySelectedProject.addTask(title, details, priority, dueDate);
            // Delete task from old project.
            currentProject.deleteTask(currentTaskId);
        }
        else {
            newlySelectedProject.updateTask(currentTaskId, {title: title, details: details, priority: priority, dueDate: dueDate});
        }

        // Append task with new information to DOM.
        // Making this an if statement to avoid an error, in the case where a different project is in focus.
        // In that case, "newlySelectedProjectCard" will be undefined, since it's not in the DOM.
        // So the task is only removed from the focused project's DOM.
        if (newlySelectedProjectCard) {
            // Remove tasks and render a new task list.
            UI.refreshTaskList(newlySelectedProjectId);
        }
        else currentTaskContainer.remove();

        form.reset();
        dialog.close();
        Storage.storeData();
    }

    static handleSubmitNewProject(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        const dialog = form.closest('dialog');
        const title = form.elements['title'].value;
        const project = new Project(title);

        ProjectManager.addProject(project);
        UI.renderProject(project);
        UI.renderSidebarProject(project)

        form.reset();
        dialog.close();
        Storage.storeData();
    }

    static handleEditProject(e) {
        const projectCard = e.target.closest('.card-container');        
        const id = projectCard.id;
        const dialog = document.getElementById('dialog-edit-project');
        dialog.dataset.projectId = id;
        dialog.showModal();        
    }
    static handleSubmitEditProject(e) {
        e.preventDefault();
        const dialog = document.getElementById('dialog-edit-project');
        const form = dialog.querySelector('form');
        const id = dialog.dataset.projectId;
        const project = ProjectManager.getProjectById(id);
        project.title = form.elements['title'].value;
        
        // Update project title in DOM.
        UI.updateProject(id, project.title);

        form.reset();
        dialog.close();
        Storage.storeData();
    }
    static handleDeleteProject(e) {
        // Set up before opening confirmation modal.
        const dialog = document.getElementById('dialog-confirm-delete');
        dialog.dataset.delete = 'project';
        dialog.dataset.projectId = e.target.closest('.card-container').id;
        dialog.showModal();
    }
    static handleFocusProject(e) {
        const id = e.target.dataset.projectId;
        UI.focusProject(id);
    }
    static handleHome() {
        UI.renderHome();
    }
    static handleConfirmDelete(e) {
        const dialog = document.getElementById('dialog-confirm-delete');

        if (dialog.dataset.delete === 'project') {
            // Delete project.
            const projectId = dialog.dataset.projectId;
            const projectCard = document.getElementById(projectId);
            const projectSidebar = document.querySelector(`[data-project-id="${projectId}"]`);        
            ProjectManager.deleteProject(projectId); // Delete from array.
            projectCard.remove(); // Delete from DOM.
            projectSidebar.remove(); // Delete from DOM.
            Storage.storeData();
            dialog.dataset.delete = '';
            dialog.dataset.projectId = '';
            dialog.close();        
        } else if (dialog.dataset.delete === 'task') {
            // Delete task.
            const taskId = dialog.dataset.taskId;
            const taskContainer = document.getElementById(taskId);
            const projectContainer = taskContainer.closest('.card-container');
            const currentProject = ProjectManager.getProjectById(projectContainer.id);
            currentProject.deleteTask(taskId); // Delete from array.
            taskContainer.remove(); // Delete from DOM.
            Storage.storeData();
            dialog.dataset.delete = '';
            dialog.dataset.taskId = '';
            dialog.close();
        }
        else return console.log('You attempted to delete something that is neither a task, nor a project. How?');
    }

}