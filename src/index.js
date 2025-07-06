import UI from './ui.js';
import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager.js';
import { differenceInCalendarMonths } from 'date-fns';


// Class tests
// const testTask = new Task(
//     'Get your **** together', 
//     'Go get all your **** from everywhere you left it and bring it all together',
//     'High',
//     '23 April 2026'
// );

const defaultProject = new Project('Unassigned tasks');
const project1 = new Project('Project 1');
const project2 = new Project('Project 2');
const project3 = new Project('Project 3 with long project title');
const project4 = new Project('project 4');
const projectManager = new ProjectManager();
defaultProject.addTask(
    'Buy a house', 
    'Get a job that you feel passionate about and work hard, to make enough money to buy a house in the 400k range, or more, if you have a girlfriend that makes money.',
    'medium',
    '2019-09-18T19:00:52Z'
);
projectManager.addProject(defaultProject);
projectManager.addProject(project1);
projectManager.addProject(project2);
projectManager.addProject(project3);
projectManager.addProject(project4);

const renderedProject = UI.renderProject(defaultProject);
UI.renderProject(project1);
UI.renderProject(project2);
UI.renderProject(project3);
UI.renderProject(project4);

console.log(projectManager);

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
        const dialog = document.getElementById('dialog-card-add-new-task');
        dialog.dataset.projectID = projectContainer.id;
        dialog.showModal();
    }
    else if (e.target.id === 'cancel-button-card-task' 
                || e.target.id === 'cancel-button-nav-task') {
        e.target.closest('form').reset();
        e.target.closest('dialog').close();
    }
    else if (e.target.id === 'submit-button-card-task') {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.querySelector('input[name="title"]').value;
        const details = form.querySelector('textarea[name="details"]').value;
        const priority = form.querySelector('select[name="priority"]').value;
        const dueDate = form.querySelector('input[name="dueDate"]').value;
        const dialog = form.closest('dialog');
        
        const currentProject = projectManager.getProjectById(dialog.dataset.projectID);
        const currentProjectCard = document.querySelector(`.card-container[id="${dialog.dataset.projectID}"]`);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        
        // Once the form is validated, proceed.
        currentProject.addTask(title, details, priority, dueDate);
        const currentIndex = currentProject.getTaskList().length - 1;
        currentProjectCard
            .querySelector('.card-task-list')
            .appendChild(UI.renderTask(currentProject.getTaskList()[currentIndex]));
        form.reset();
        dialog.close();
    }
    // This one is for clicking outside the modal, to close it.
    else if (e.target.tagName === 'DIALOG') {
        // The following line causes the form to reset, but that can
        // be frustrating for a user, in the case of a misclick.
        // They would lose all inputted data.
        // e.target.querySelector('form').reset();
        e.target.close();
    }
    // The create new task button from the nav sidebar
    else if (e.target.id === 'submit-button-nav-task') {
        e.preventDefault();
        const form = e.target.closest('form');
        const title = form.querySelector('input[name="title"]').value;
        const details = form.querySelector('textarea[name="details"]').value;
        const priority = form.querySelector('select[name="priority"]').value;
        const dueDate = form.querySelector('input[name="dueDate"]').value;
        const selectedProject = form.querySelector('select[name="project"]').value;
        const dialog = form.closest('dialog');
        const projectObject = projectManager.getProjectById(selectedProject);

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        } 
        
        // Once the form is validated, proceed.
        projectObject.addTask(title, details, priority, dueDate);
        const currentIndex = projectObject.getTaskList().length - 1;
        renderedProject
            .querySelector('.card-task-list')
            .appendChild(UI.renderTask(projectObject.getTaskList()[currentIndex]));
        form.reset();
        dialog.close();
        console.log(projectObject);
    }
    
});

document.getElementById('sidebar-wrapper').addEventListener('click', (e) => {
    if (e.target.dataset.action === 'new-task') {
        const dialog = document.getElementById('dialog-nav-create-new-task');
        const projectDropdown = dialog.querySelector('select[name="project"]');
        
        // Reset any old options before populating them again. 
        projectDropdown.textContent = ''; 

        projectManager.getProjectList().forEach(project => {
            // Store projectID as option.value, but display project title as textContent
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.title;

            projectDropdown.appendChild(option);
        });
        dialog.showModal();
    }
    else if (e.target.dataset.action === 'search') {
    // Create and dispatch a keyboard event.
    console.log('Search button pressed');
    const event = new KeyboardEvent('keydown', {
        key: 'f',
        ctrlKey: true
    });
    
    document.dispatchEvent(event);
    };
});
