import todo from './../../State/State.js';
import Subject from '../../Subject/Subject.js';

const ActiveList = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('active-list-root');

        const activeList = document.createElement('p');
        activeList.id = 'active-list';
        
        const activeItem = todo.getActiveItem();
        const activeListTitle = activeItem.title;

        activeList.textContent = activeListTitle;

        root.appendChild(activeList);

        return root;
    };

    const update = () => {
        const activeList = document.querySelector('#active-list');

        const activeItem = todo.getActiveItem();
        const activeListTitle = activeItem.title;
        
        activeList.textContent = activeListTitle;
    };

    return { create, update };
})();

Subject.subscribe(ActiveList.update);

export default ActiveList;