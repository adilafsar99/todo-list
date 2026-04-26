import Subject from '../../Subject/Subject.js';
import todo from './../../State/Todo.js';

const ActiveList = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('active-list-root');

        const activeList = document.createElement('p');
        activeList.id = 'active-list';

        const activeListTitle = todo.activeItem ? todo.activeItem.title : 'No Active Tasklist';

        activeList.textContent = activeListTitle;

        root.appendChild(activeList);

        return root;
    };

    const update = () => {
        const activeList = document.querySelector('#active-list');

        const activeListTitle = todo.activeItem ? todo.activeItem.title : 'No Active Tasklist';
        
        activeList.textContent = activeListTitle || 'No Active Tasklist';
    };

    return { create, update };
})();

Subject.subscribe(ActiveList.update);

export default ActiveList;