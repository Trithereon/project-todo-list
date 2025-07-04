import UI from './ui.js';
import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager.js';


// Class tests
const testTask = new Task(
    'Get your **** together', 
    'Go get all your **** from everywhere you left it and bring it all together',
    'High',
    '23 April 2026'
);

const defaultProject = new Project('Unassigned tasks');
const projectManager = new ProjectManager();
defaultProject.addTask(testTask);
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
  .appendChild(UI.renderTask(testTask));

// Card action handling
document.getElementById('main-content').addEventListener('click', (e) => {
    // closest() will find the parent with class name specified.
    if (e.target.classList.contains('card-actions-details')) {
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
    else if (e.target.classList.contains('card-actions-edit')) {
        console.log('you clicked on the EDIT button!');
        // Maybe the task creation modal opens with default values equal to the current values.
    }
    else if (e.target.classList.contains('card-actions-delete')) {
        // Consider adding a confirmation modal to make user confirm deletion.
        const parent = e.target.closest('.card-actions-container');
        const taskContainer = parent.closest('.card-task-item');
        const taskListContainer = taskContainer.closest('.card-task-list');
        const projectContainer = taskListContainer.closest('.card-container');
        const currentProject = projectManager.getProjectById(projectContainer.id);

        currentProject.deleteTask(taskContainer.id); // Delete from array.
        taskContainer.remove(); // Delete from DOM.
    }
});
