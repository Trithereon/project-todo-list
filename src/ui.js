// DOM manipulation

import detailsRightImg from './img/card/details-right.svg';
import editImg from './img/card/edit.svg';
import deleteImg from './img/card/delete.svg';
import ProjectManager from './project-manager';

const UI = (() => {
    // Private function, so underscore prefix.
    const _createElement = (tag, classes, text) => {
        const element = document.createElement(tag);
        if (classes) element.classList.add(...classes.split(' '));
        if (text) element.textContent = text;
        return element;
    }

    const mainContent = document.getElementById('main-content');
    
    // Public functions to be exported.
    const renderProject = (project) => {
        const container = _createElement('div', 'card-container');
        const title = _createElement('h3', 'card-project-title', project.title);
        const taskList = _createElement('ul', 'card-task-list');
        const addNewTask = _createElement('li', 'card-task-item add-new-task', '+Add new task');

        container.id = project.id;

        mainContent.appendChild(container);
        container.append(title, taskList);
        taskList.appendChild(addNewTask);

        return container;
    }

    const renderSidebarProject = (project) => {
        const listContainer = document.querySelector('ul.nav-sub-list');
        const listItem = _createElement('li', 'nav-sub-item');
        const button = _createElement('button', 'sidebar-action', `${project.title}`);
        
        button.dataset.projectID = project.id;

        listContainer.appendChild(listItem);
        listItem.appendChild(button);

        return listItem;
        
    }

    // Might need to modify this function to receive full task list
    // and render all tasks recursively with an array.forEach method.
    const renderTask = (task, projectID) => {
        const container = _createElement('li', 'card-task-item');
        const input = _createElement('input');
        const details = _createElement('details');
        const summary = _createElement('summary', '', task.title);
        const expandedDetailsContainer = _createElement('div', 'expanded-details-container');
        const taskDescription = _createElement('p', '', `Details: ${task.details}`);
        const dueDate = _createElement('time', '', `Due Date: ${task.dueDate}`);
        const priority = _createElement('p', 'priority', `Priority: ${task.priority}`);
        const cardActionsContainer = _createElement('div', 'card-actions-container');
        const imgDetailsRight = _createElement('img', 'card-actions-details');
        const imgEdit = _createElement('img', 'card-actions-edit');
        const imgDelete = _createElement('img', 'card-actions-delete');

        // Assign attributes
        container.id = task.id;
        input.type = 'checkbox';
        input.name = 'taskComplete'
        dueDate.datetime = task.dueDate; // Need to convert the dueDate value format before assigning here.
        imgDetailsRight.width = '18';
        imgDetailsRight.height = '18';
        imgDetailsRight.src = detailsRightImg;
        imgDetailsRight.alt = 'Details icon';
        imgEdit.width = '18';
        imgEdit.height = '18';
        imgEdit.src = editImg;
        imgEdit.alt = 'Edit icon';
        imgDelete.width = '18';
        imgDelete.height = '18';
        imgDelete.src = deleteImg;
        imgDelete.alt = 'Delete icon';

        // Assemble elements
        container.append(input, details, cardActionsContainer);
        details.append(summary, expandedDetailsContainer);
        expandedDetailsContainer.append(taskDescription, dueDate, priority);
        cardActionsContainer.append(imgDetailsRight, imgEdit, imgDelete); 

        const projectCardContainer = document.getElementById(projectID);
        const taskList = projectCardContainer.querySelector('ul.card-task-list');
        
        taskList.appendChild(container);

        return container;

    }

    return {renderProject, renderTask, renderSidebarProject};

})();

export default UI;