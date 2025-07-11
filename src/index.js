import UI from './ui.js';
import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';
import detailsRightImg from './img/card/details-right.svg';
import detailsDownImg from './img/card/details-down.svg';
import ProjectManager from './project-manager.js';
import { differenceInCalendarMonths } from 'date-fns';
import { differenceInCalendarDaysWithOptions } from 'date-fns/fp';
import EventHandler from './events.js';


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
defaultProject.addTask(
    'Buy a house', 
    'Get a job that you feel passionate about and work hard, to make enough money to buy a house in the 400k range, or more, if you have a girlfriend that makes money.',
    'medium',
    '2019-09-18T19:00:52Z',
    defaultProject.id
);
ProjectManager.addProject(defaultProject);
ProjectManager.addProject(project1);
ProjectManager.addProject(project2);
ProjectManager.addProject(project3);
ProjectManager.addProject(project4);

ProjectManager.getProjectList().forEach(project => {
    UI.renderProject(project);
    UI.renderSidebarProject(project);

    project.getTaskList().forEach(task => {
        UI.renderTask(task, project.id);
    });

});

EventHandler.init();

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


// renderedProject
//   .querySelector('.card-task-list')
//   .appendChild(UI.renderTask(defaultProject.getTaskList()[0]));

// Button handling (consider changing the structure of this code)
// document.getElementById('main-content').addEventListener('click', (e) => {
    // closest() will find the parent with class name specified.
    
    // if (e.target.matches('.card-actions-details')) {
    //     // Find parent, details will be next to it, toggle open state.
    //     const parent = e.target.closest('.card-actions-container');
    //     const details = parent.previousElementSibling;
    //     details.open = !details.open;
    //     if (e.target.src === detailsRightImg) {
    //         e.target.src = detailsDownImg;
    //     } 
    //     else e.target.src = detailsRightImg;
    //     // Consider moving this DOM manipulation to the UI module.
    // }
    // if (e.target.matches('.card-actions-edit')) {
    //     const projectContainer = e.target.closest('.card-container');
    //     const taskContainer = e.target.closest('.card-task-item');
    //     const dialog = document.getElementById('dialog-card-edit-task');
    //     dialog.dataset.projectId = projectContainer.id;
    //     dialog.dataset.taskId = taskContainer.id;
        
    //     const project = ProjectManager.getProjectById(projectContainer.id);
    //     const task = project.getTaskById(taskContainer.id);
        
    //     const form = dialog.querySelector('form');
    //     form.elements['title'].value = task.title;
    //     form.elements['details'].value = task.details;
    //     form.elements['priority'].value = task.priority;
    //     form.elements['dueDate'].value = task.dueDate.slice(0, 16); // Bug fix: slice away the seconds and timezone, otherwise this doesn't work.
    //     form.elements['project'].value = task.projectId;

    //     const projectDropdown = dialog.querySelector('select[name="project"]');
        
    //     // Reset any old options before populating them again. 
    //     projectDropdown.textContent = ''; 

    //     ProjectManager.getProjectList().forEach(project => {
    //         // Store projectId as option.value, but display project title as textContent
    //         const option = document.createElement('option');
    //         option.value = project.id;
    //         option.textContent = project.title;

    //         projectDropdown.appendChild(option);
    //     });

    //     // After generating the dropdown options, display the currently selected task project.
    //     // projectDropdown.value = task.projectId;
    //     // projectDropdown.textContent = project.title;

    //     dialog.showModal();
    // }
    // if (e.target.matches('.card-actions-delete')) {
    //     // Consider adding a confirmation modal to make user confirm deletion.
    //     const taskContainer = e.target.closest('.card-task-item');
    //     const projectContainer = taskContainer.closest('.card-container');
    //     const currentProject = ProjectManager.getProjectById(projectContainer.id);

    //     currentProject.deleteTask(taskContainer.id); // Delete from array.
    //     taskContainer.remove(); // Delete from DOM.
    // }
    // if (e.target.name === 'taskComplete') {
    //     const taskContainer = e.target.closest('.card-task-item');
    //     const projectContainer = taskContainer.closest('.card-container');
    //     const currentProject = ProjectManager.getProjectById(projectContainer.id);
    //     currentProject.getTaskById(taskContainer.id).toggleComplete();
    // }
    // else if (e.target.matches('.card-task-item.add-new-task')) {
    //     const projectContainer = e.target.closest('.card-container');
    //     const dialog = document.getElementById('dialog-card-add-new-task');
    //     dialog.dataset.projectId = projectContainer.id;
    //     dialog.showModal();
    // }

    //  if (e.target.id === 'cancel-button-card-task' 
    //             || e.target.id === 'cancel-button-nav-task' 
    //             || e.target.id === 'cancel-button-card-edit-task') {
    //     e.target.closest('form').reset();
    //     e.target.closest('dialog').close();
    // }
    //  if (e.target.id === 'submit-button-card-task') {
    //     e.preventDefault();
    //     const form = e.target.closest('form');
    //     const title = form.elements['title'].value;
    //     const details = form.elements['details'].value;
    //     const priority = form.elements['priority'].value;
    //     const dueDate = form.elements['dueDate'].value;
    //     const dialog = form.closest('dialog');
        
    //     const currentProject = ProjectManager.getProjectById(dialog.dataset.projectId);
    //     const currentProjectCard = document.querySelector(`.card-container[id="${dialog.dataset.projectId}"]`);

    //     if (!form.checkValidity()){
    //         form.reportValidity();
    //         return;
    //     } 
        
    //     // Once the form is validated, proceed.
    //     currentProject.addTask(title, details, priority, dueDate, currentProject.id);
    //     const currentIndex = currentProject.getTaskList().length - 1;
    //     currentProjectCard
    //         .querySelector('.card-task-list')
    //         .appendChild(
    //             UI.renderTask(
    //             currentProject.getTaskList()[currentIndex],
    //             dialog.dataset.projectId
    //         ));
    //     form.reset();
    //     dialog.close();
    // }
    // This one is for clicking outside the modal, to close it.
    // Currently deactivated since it was causing issues when attempting to drag the details textarea field wider.
    // else if (e.target.tagName === 'DIALOG') {
    //     // The following line causes the form to reset, but that can
    //     // be frustrating for a user, in the case of a misclick.
    //     // They would lose all inputted data.
    //     // e.target.querySelector('form').reset();
    //     e.target.close();
    // }
    // The create new task button from the nav sidebar
//     if (e.target.id === 'submit-button-nav-task') {
//         e.preventDefault();
//         const form = e.target.closest('form');
//         const title = form.elements['title'].value;
//         const details = form.elements['details'].value;
//         const priority = form.elements['priority'].value;
//         const dueDate = form.elements['dueDate'].value;
//         const selectedProject = form.elements['project'].value;
//         const dialog = form.closest('dialog');
//         const projectObject = ProjectManager.getProjectById(selectedProject);

//         if (!form.checkValidity()){
//             form.reportValidity();
//             return;
//         } 
        
//         const currentProjectCard = document.querySelector(`.card-container[id="${selectedProject}"]`);
        
//         // Once the form is validated, proceed.
//         projectObject.addTask(title, details, priority, dueDate, selectedProject);
//         const currentIndex = projectObject.getTaskList().length - 1;
//         currentProjectCard
//             .querySelector('.card-task-list')
//             .appendChild(
//                 UI.renderTask(
//                     projectObject.getTaskList()[currentIndex],
//                     selectedProject
//                 ));
//         form.reset();
//         dialog.close();
//     }
//     // Edit task.
//     else if (e.target.id === 'submit-button-card-edit-task') {
//         e.preventDefault();
//         const form = e.target.closest('form');
//         const title = form.elements['title'].value;
//         const details = form.elements['details'].value;
//         const priority = form.elements['priority'].value;
//         const dueDate = form.elements['dueDate'].value;
//         const selectedProject = form.elements['project'].value;
//         const dialog = form.closest('dialog');
//         const projectObject = ProjectManager.getProjectById(selectedProject);

//         if (!form.checkValidity()){
//             form.reportValidity();
//             return;
//         } 
        
//         const currentProjectCard = document.querySelector(`.card-container[id="${selectedProject}"]`);
//         const currentTaskId = dialog.dataset.taskId;

//         // Once the form is validated, proceed.
//         projectObject.updateTask(currentTaskId, {title: title, details: details, priority: priority, dueDate: dueDate, projectId: selectedProject});
//         console.log(projectObject.getTaskById(currentTaskId));
//         const currentIndex = projectObject.getTaskList().length - 1;
//         currentProjectCard
//             .querySelector('.card-task-list')
//             .appendChild(
//                 UI.renderTask(
//                     projectObject.getTaskList()[currentIndex],
//                     selectedProject
//                 ));
//         form.reset();
//         dialog.close();
//     }
    
// });

// document.getElementById('sidebar-wrapper').addEventListener('click', (e) => {
    // if (e.target.dataset.action === 'new-task') {
    //     const dialog = document.getElementById('dialog-nav-create-new-task');
    //     const projectDropdown = dialog.querySelector('select[name="project"]');
        
    //     // Reset any old options before populating them again. 
    //     projectDropdown.textContent = ''; 

    //     ProjectManager.getProjectList().forEach(project => {
    //         // Store projectId as option.value, but display project title as textContent
    //         const option = document.createElement('option');
    //         option.value = project.id;
    //         option.textContent = project.title;

    //         projectDropdown.appendChild(option);
    //     });
    //     dialog.showModal();
    // }
//     if (e.target.dataset.action === 'new-project') {
//         // THIS IS TEMPORARILY PLACED HERE TO TEST THE RENDER FUNCTION.
//         ProjectManager.getProjectList().forEach(project => {
//             UI.renderSidebarProject(project);
//         });
//     };

// });
