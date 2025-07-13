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

