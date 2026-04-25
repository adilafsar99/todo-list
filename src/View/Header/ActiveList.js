import Observer from './../../Observer/Observer.js';

const ActiveList = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('active-list-root');

        const activeList = document.createElement('p');
        activeList.id = 'active-list';

        activeList.textContent = todo.activeItem ? todo.activeItem.title : 'No Active Tasklist';

        root.appendChild(activeList);

        return root;
    };

    const update = (todo) => {
        const activeList = document.querySelector('#active-list');
        
        activeList.textContent = todo.activeItem ? todo.activeItem.title : 'No Active Tasklist';
    };

    return { create, update };
})();

Observer.subscribe(ActiveList.update);

export default ActiveList;