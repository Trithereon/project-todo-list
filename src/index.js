import UI from './ui.js';
import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';


// Class tests
const testTask = new Task(
    'Get your **** together', 
    'Go get all your **** from everywhere you left it and bring it all together',
    'High',
    '23 April 2026'
);

const testProject = new Project('Unassigned tasks');

console.log('Adding a task to Project...');
testProject.addTask(testTask);
console.log(testProject);

console.log('Modifying task title... (uses getTaskById to get task object)');
testProject.updateTask(
    testTask.id, 
    {title: 'Modified title successfully'}
);
console.log(testTask);
console.log(testProject);

console.log('Now deleting the task...');
testProject.deleteTask(testTask.id);
console.log("Testing getTaskList() below...")
console.log(testProject.getTaskList());

console.log('Adding task again, to use in testing UI');
testProject.addTask(testTask);

// End of class tests

// UI tests
// UI.renderProject(testProject);
const renderedProject = UI.renderProject(testProject);

renderedProject
  .querySelector('.card-task-list')
  .appendChild(UI.renderTask(testTask));

document.getElementById('main-content').addEventListener('click', (e) => {
    // closest() will find the parent with class name specified.
    if (e.target.classList.contains('card-actions-details')) {
        // Find parent, details will be next to it, toggle open state.
        const parent = e.target.closest('.card-actions-container');
        const details = parent.previousElementSibling;
        details.open = !details.open;
    }
    else if (e.target.classList.contains('card-actions-edit')) {
        console.log('you clicked on the EDIT button!');
    }
    else if (e.target.classList.contains('card-actions-delete')) {
        alert('Are you sure you want to delete this task?');
    }
});
renderedProject
  .querySelector('details')
  .open = true;

console.log(testTask)
