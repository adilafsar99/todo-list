import TaskListsSection from './TaskListsSection/TaskListsSection.js';

const Main = (() => {
    const create = (todo) => {
        const root = document.createElement('main');
        root.classList.add('main');
        
        const taskListsSection = TaskListsSection.create(todo);
        
        root.append(taskListsSection);

        return root;
    };

    return {create};
})();

export default Main;