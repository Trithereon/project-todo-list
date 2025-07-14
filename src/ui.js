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
        const dueDate = _createElement('time', '', `Due Date: ${task.dueDate}`);
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
        // Render all project cards.
        ProjectManager.getProjectList().forEach(project => {
            renderProject(project);
            // Render all tasks for each project.
            project.getTaskList().forEach(task => {
                renderTask(task, project.id);
            });
        });
    }

    return {renderProject, renderTask, renderSidebarProject, updateProject, focusProject, renderHome};

})();

export default UI;