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

const renderTaskLists = (main) => {
    
}

const renderTasks = (main) => {
    
}

const renderMain = () => {
    const main = document.querySelector('.main');
    renderTaskLists(main);
    renderTasks(main);
}

export {renderHeader, renderMain};