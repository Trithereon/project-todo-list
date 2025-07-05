import UI from './ui.js';
import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager.js';


// Class tests
// const testTask = new Task(
//     'Get your **** together', 
//     'Go get all your **** from everywhere you left it and bring it all together',
//     'High',
//     '23 April 2026'
// );

const defaultProject = new Project('Unassigned tasks');
const projectManager = new ProjectManager();
defaultProject.addTask(
    'Get your **** together', 
    'Go get all your **** from everywhere you left it and bring it all together',
    'High',
    '2019-09-18T19:00:52Z'
);
projectManager.addProject(defaultProject);
console.log(projectManager);
console.log(projectManager.getProjectById(defaultProject.id));

// console.log('Adding a task to Project...');
// defaultProject.addTask(testTask);
// console.log(defaultProject);

// console.log('Modifying task title... (uses getTaskById to get task object)');
// defaultProject.updateTask(
//     testTask.id, 
//     {title: 'Modified title successfully'}
// );
// console.log(testTask);
// console.log(defaultProject);

// console.log('Now deleting the task...');
// defaultProject.deleteTask(testTask.id);
// console.log("Testing getTaskList() below...")
// console.log(defaultProject.getTaskList());

// console.log('Adding task again, to use in testing UI');
// defaultProject.addTask(testTask);

// End of class tests

// UI tests
// UI.renderProject(defaultProject);
const renderedProject = UI.renderProject(defaultProject);

renderedProject
  .querySelector('.card-task-list')
  .appendChild(UI.renderTask(defaultProject.getTaskList()[0]));

// Button handling (consider changing the structure of this code)
document.getElementById('main-content').addEventListener('click', (e) => {
    // closest() will find the parent with class name specified.
    
    if (e.target.matches('.card-actions-details')) {
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
    else if (e.target.matches('.card-actions-edit')) {
        console.log('you clicked on the EDIT button!');
        // Maybe the task creation modal opens with default values equal to the current values.
    }
    else if (e.target.matches('.card-actions-delete')) {
        // Consider adding a confirmation modal to make user confirm deletion.
        const taskContainer = e.target.closest('.card-task-item');
        const projectContainer = taskContainer.closest('.card-container');
        const currentProject = projectManager.getProjectById(projectContainer.id);

        currentProject.deleteTask(taskContainer.id); // Delete from array.
        taskContainer.remove(); // Delete from DOM.
    }
    else if (e.target.name === 'taskComplete') {
        const taskContainer = e.target.closest('.card-task-item');
        const projectContainer = taskContainer.closest('.card-container');
        const currentProject = projectManager.getProjectById(projectContainer.id);
        currentProject.getTaskById(taskContainer.id).toggleComplete();
    }
    else if (e.target.matches('.card-task-item.add-new-task')) {
        const projectContainer = e.target.closest('.card-container');
        const dialog = document.getElementById('dialog-add-new-task');
        dialog.dataset.projectID = projectContainer.id;
        dialog.showModal();
    }
    else if (e.target.id === ('cancelButton')) {
        document.getElementById('dialog-add-new-task').close();
    }
    else if (e.target.id === ('submitButton')) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const details = document.getElementById('details').value;
        const priority = document.getElementById('priority').value;
        const dueDate = document.getElementById('dueDate').value;
        const dialog = document.getElementById('dialog-add-new-task');
        const form = document.getElementById('form-add-new-task');
        const currentProject = projectManager.getProjectById(dialog.dataset.projectID);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        

        // Once the form is validated, proceed.
        currentProject.addTask(title, details, priority, dueDate);
        const currentIndex = currentProject.getTaskList().length - 1;
        renderedProject
            .querySelector('.card-task-list')
            .appendChild(UI.renderTask(currentProject.getTaskList()[currentIndex]));
        form.reset();
        dialog.close();
        console.log(currentProject);
    }
    // This one is for clicking outside the modal, to close it.
    else if (e.target.tagName === 'DIALOG') {
        // The following line causes the form to reset, but that can
        // be frustrating for a user, in the case of a misclick.
        // They would lose all inputted data.
        // e.target.querySelector('form').reset();
        e.target.close();
    }
        
});
