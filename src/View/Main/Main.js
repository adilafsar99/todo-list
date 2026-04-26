import './Main.css';

import TaskListSection from './TaskListSection/TaskListSection.js';
import TaskSection from './TaskSection/TaskSection.js';
import MenuSection from './MenuSection/MenuSection.js';

const Main = (() => {
    const create = () => {
        const root = document.createElement('main');
        root.classList.add('main');

        const taskListSection = TaskListSection.create();
        const taskSection = TaskSection.create();
        const menuSection = MenuSection.create();

        root.append(taskListSection, taskSection, menuSection);

        return root;
    };

    return { create };
})();

export default Main;