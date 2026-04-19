import './Header.css';
import ActiveTaskList from './ActiveTaskList.js';
import AppName from './AppName.js';

const Header = (() => {
    const create = (todo) => {
        const root = document.createElement('header');
        root.classList.add('header');

        const activeTaskList = ActiveTaskList.create(todo);
        const appName = AppName.create();

        root.append(activeTaskList, appName);

        return root;
    };

    return { create, ActiveTaskList };
})();

export default Header;