const ActiveTaskList = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('active-task-list-root');

        const activeTaskList = document.createElement('p');
        activeTaskList.id = 'active-task-list';

        if (todo.activeItem) {
            activeTaskList.textContent = todo.activeItem.title;
        }

        root.appendChild(activeTaskList);
        
        return root;
    };

    const update = (todo) => {
        const activeTaskList = document.querySelector('active-task-list');
        activeTaskList.textContent = todo.activeItem.title;
    };

    return {create, update};
})();

export default ActiveTaskList;