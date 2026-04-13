import TaskList from "./TaskList.js";
import { createToDoAndTaskListFields as createBaseFields , createToDoAndTaskListMethods as createBaseMethods } from './ToDoAndTaskList.js';
import './ToDo.css';

const ToDo = (() => {
    const baseFields = createBaseFields();
    
    const baseMethods = createBaseMethods(baseFields);
    baseMethods.createTaskList = (title, priority, deadline, isComplete) => {
        baseMethods.addItem(TaskList(title, priority, deadline, isComplete));
    };

    return {...baseMethods};
})();

const renderActiveTaskListName = (header) => {
    const activeTaskList = document.createElement('div');
    activeTaskList.classList.add('active-task-list');

    const activeTaskListName = document.createElement('p');
    activeTaskListName.id = 'task-list-name';
    const activeTaskListNameContent = ToDo.getList().length === 0 ? '' : ToDo.getActiveItem().title;
    activeTaskListName.textContent = activeTaskListNameContent;

    activeTaskList.appendChild(activeTaskListName);

    header.appendChild(activeTaskList);
}

const renderHeader = () => {
    const header = document.querySelector('.header');

    const title = document.createElement('div');
    title.classList.add('title');

    const titleText = document.createElement('p');
    titleText.id = 'title-text';
    titleText.textContent = '<ToDo>';

    title.appendChild(titleText);
    renderActiveTaskListName(header);
    header.appendChild(title);
}

const renderTaskLists = (taskListsContainer) => {
    taskListsContainer.innerHTML = '';

    ToDo.getList().forEach(item => {
        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        taskList.dataset.id = item.id;

        const title = document.createElement('div');
        title.classList.add('task-list-title');

        const titleText = document.createElement('p');
        titleText.classList.add('task-list-title-text');
        titleText.textContent = item.title;

        title.appendChild(titleText);
        taskList.appendChild(title);
        taskListsContainer.appendChild(taskList);
    })
}

const renderTaskListsSection = (main) => {
    const section = document.createElement('div');
    section.classList.add('task-list-section');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('create-button');

    const taskListsContainer = document.createElement('div');
    taskListsContainer.classList.add('task-lists-container');

    const button = document.createElement('button');
    button.id = 'create-task-list-button';
    button.textContent = 'Create New Task List';
    button.addEventListener('click', (event) => {
        ToDo.createTaskList('PLay', 'low', '2026-12-12', false);
        renderTaskLists(taskListsContainer);
    })

    buttonContainer.appendChild(button);
    section.appendChild(buttonContainer);

    renderTaskLists(taskListsContainer);

    main.append(buttonContainer, taskListsContainer);
}

const renderTasks = (main) => {
    
}

const renderMain = () => {
    const main = document.querySelector('.main');
    renderTaskListsSection(main);
    //renderTasksSection(main);
}

export {renderHeader, renderMain};