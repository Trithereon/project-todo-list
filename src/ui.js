// DOM manipulation module. Written as an IIFE instead of a class, for practice.

import detailsRightImg from './img/card/details-right.svg';
import editImg from './img/card/edit.svg';
import deleteImg from './img/card/delete.svg';
import ProjectManager from './project-manager';
import Project from './project';
import {format} from 'date-fns'

const UI = (() => {
    // Private function, so underscore prefix.
    const _createElement = (tag, classes, text) => {
        const element = document.createElement(tag);
        if (classes) element.classList.add(...classes.split(' '));
        if (text) element.textContent = text;
        return element;
    }
    const _formatDate = (date) => {
        if (date){
        const trimmedDate = date.slice(0, 16); // Remove seconds and timezone.
        const formattedDate = format(new Date(trimmedDate), 'PPp');
        return formattedDate;
        }
        else return '';
    }

    const mainContent = document.getElementById('main-content');
    
    // Public functions to be exported.
    const renderProject = (project) => {
        const container = _createElement('div', 'card-container');
        const titleContainer = _createElement('div', 'card-project-title-container');
        const title = _createElement('h3', 'card-project-title', project.title);
        const taskList = _createElement('ul', 'card-task-list');
        const addNewTask = _createElement('li', 'card-task-item add-new-task', '+Add new task');
        const cardActionsContainer = _createElement('div', 'card-actions-container');
        const imgEdit = _createElement('img', 'card-actions-edit');
        const imgDelete = _createElement('img', 'card-actions-delete');

        // Assign attributes.
        container.id = project.id;
        addNewTask.dataset.action = 'cardNewTask';        
        imgEdit.width = '18';
        imgEdit.height = '18';
        imgEdit.src = editImg;
        imgEdit.alt = 'Edit icon';
        imgEdit.dataset.action = 'editProject';
        imgDelete.width = '18';
        imgDelete.height = '18';
        imgDelete.src = deleteImg;
        imgDelete.alt = 'Delete icon';
        imgDelete.dataset.action = 'deleteProject';

        mainContent.appendChild(container);
        container.append(titleContainer, taskList);
        titleContainer.appendChild(title);
        // Prevent deletion or modification of Default Project.
        if (project.title !== 'Unassigned tasks'){
            titleContainer.appendChild(cardActionsContainer);
        }
        cardActionsContainer.append(imgEdit, imgDelete);
        taskList.appendChild(addNewTask);

        return container;
    }

    const renderSidebarProject = (project) => {
        const listContainer = document.querySelector('ul.nav-sub-list');
        const listItem = _createElement('li', 'nav-sub-item');
        const button = _createElement('button', 'sidebar-action', `${project.title}`);
        
        button.dataset.projectId = project.id;
        button.dataset.action = 'focusProject';

        listContainer.appendChild(listItem);
        listItem.appendChild(button);

        return listItem;        
    }

    // Might need to modify this function to receive full task list
    // and render all tasks recursively with an array.forEach method.
    const renderTask = (task, projectId) => {
        const container = _createElement('li', 'card-task-item');
        const input = _createElement('input');
        const details = _createElement('details');
        const summary = _createElement('summary', '', task.title);
        const expandedDetailsContainer = _createElement('div', 'expanded-details-container');
        const taskDescription = _createElement('p', '', `Details: ${task.details}`);
        const dueDateFormatted = _formatDate(task.dueDate);
        const dueDate = _createElement('time', '', `Due Date: ${dueDateFormatted}`);
        const priority = _createElement('p', 'priority', `Priority: ${task.priority}`);
        const cardActionsContainer = _createElement('div', 'card-actions-container');
        const imgDetailsRight = _createElement('img', 'card-actions-details');
        const imgEdit = _createElement('img', 'card-actions-edit');
        const imgDelete = _createElement('img', 'card-actions-delete');

        // Assign attributes
        container.id = task.id;
        input.type = 'checkbox';
        input.name = 'taskComplete';
        input.dataset.action = 'taskComplete';
        dueDate.datetime = task.dueDate; // Need to convert the dueDate value format before assigning here.
        priority.dataset.priority = task.priority;
        imgDetailsRight.width = '18';
        imgDetailsRight.height = '18';
        imgDetailsRight.src = detailsRightImg;
        imgDetailsRight.alt = 'Details icon';
        imgDetailsRight.dataset.action = 'details';
        imgEdit.width = '18';
        imgEdit.height = '18';
        imgEdit.src = editImg;
        imgEdit.alt = 'Edit icon';
        imgEdit.dataset.action = 'edit';
        imgDelete.width = '18';
        imgDelete.height = '18';
        imgDelete.src = deleteImg;
        imgDelete.alt = 'Delete icon';
        imgDelete.dataset.action = 'delete';

        // Assemble elements
        container.append(input, details, cardActionsContainer);
        details.append(summary, expandedDetailsContainer);
        expandedDetailsContainer.append(taskDescription, dueDate, priority);
        cardActionsContainer.append(imgDetailsRight, imgEdit, imgDelete); 

        const projectCardContainer = document.getElementById(projectId);
        const taskList = projectCardContainer.querySelector('ul.card-task-list');
        
        taskList.appendChild(container);

        return container;

    }

    const updateProject = (id, title) => {
        const projectCard = document.getElementById(id);
        const currentTitle = projectCard.querySelector('h3.card-project-title');
        currentTitle.textContent = title;

        return;
    }

    const focusProject = (id) => {
        // Remove all project cards.
        document.querySelectorAll('.card-container').forEach(element => {
            element.remove();
        });

        // Render selected project and its tasks.
        const project = ProjectManager.getProjectById(id);
        renderProject(project);
        project.getTaskList().forEach(task => {
            renderTask(task, project.id);
        });

    }

    const renderHome = () => {
        // Remove all project cards.
        document.querySelectorAll('.card-container').forEach(element => {
            element.remove();
        });
        // Remove all sidebar items.
        document.querySelectorAll('.nav-sub-item').forEach(element => {
            if (element.id !== 'sidebar-create-new-project') element.remove();
        });
        // Render all project cards and sidebar items.
        ProjectManager.getProjectList().forEach(project => {
            renderProject(project);
            renderSidebarProject(project);
            // Render all tasks for each project card.
            project.getTaskList().forEach(task => {
                renderTask(task, project.id);
            });
        });
    }

    const refreshTaskList = (projectId) => {
        const projectCard = document.getElementById(projectId);
        const taskList = projectCard.querySelector('.card-task-list');
        // Remove all children of taskList, i.e. all task items.
        // Replaces all children with just the firstChild, which is "add new Task".
        taskList.replaceChildren(taskList.firstChild);
        // Render all tasks in the list.
        ProjectManager.getProjectById(projectId).getTaskList().forEach(task => {
            renderTask(task, projectId);
        })
    }

    return {renderProject, renderTask, renderSidebarProject, updateProject, focusProject, renderHome, refreshTaskList};

})();

export default UI;