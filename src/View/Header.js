import './Header.css';

const Header = (() => {
    const header = document.querySelector('.header');

    const renderActiveTaskList = (todo) => {
        const container = document.createElement('div');
        container.classList.add('active-task-list-container');

        const activeTaskList = document.createElement('p');
        activeTaskList.id = 'active-task-list-title';
        if (todo.activeItem) {
            activeTaskList.textContent = todo.activeItem.title;
        }

        container.appendChild(activeTaskList);
        header.appendChild(container);
    };

    const updateActiveTaskList = (todo) => {
        const activeTaskList = document.querySelector('#active-task-list-title');
        activeTaskList.textContent = todo.activeItem.title;
    };

    const renderAppName = () => {
        const container = document.createElement('div');
        container.classList.add('app-name-container');

        const appName = document.createElement('p');
        appName.id = 'app-name';
        appName.textContent = '<Todo_App>';

        container.appendChild(appName);
        header.appendChild(container);
    };

    const render = (todo) => {
        renderActiveTaskList(todo);
        renderAppName();
    };

    return { render, updateActiveTaskList };
})();

export default Header;