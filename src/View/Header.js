const renderActiveTaskList = (header, todo) => {
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

const renderAppName = (header) => {
    const container = document.createElement('div');
    container.classList.add('app-name-container');

    const appName = document.createElement('p');
    appName.classList.add('app-name');
    appName.textContent = '_Todo_';
    
    container.appendChild(appName);
    header.appendChild(container);
};

const renderHeader = (todo) => {
    const header = document.querySelector('.header');
    renderActiveTaskList(header, todo);
    renderAppName(header);
};

export default renderHeader;