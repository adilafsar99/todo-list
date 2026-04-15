import createTodo from "./Todo.js";
import recreateTodo from "./RecreateTodo.js";
import { saveToStorage, getFromStorage } from "./LocalStorage.js";

const todo = createTodo({});
todo.createItem({title: 'Plain'})
todo.setActiveItem()

const renderActiveTaskList = (header) => {
    const container = document.createElement('div');
    container.classList.add('active-task-list-container');
    const activeTaskList = document.createElement('p');
    activeTaskList.classList.add('active-task-list-text');
    if (todo.activeItem) {
        activeTaskList.textContent = todo.activeItem.title;
    }
    container.appendChild(activeTaskList);
    header.appendChild(container);
};

const renderHeader = () => {
   const header = document.querySelector('.header');
   renderActiveTaskList(header);
};










const renderApp = () => {
    renderHeader();
    console.log('The app is rendering')
};

export default renderApp;