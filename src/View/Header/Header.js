import './Header.css';
import ActiveTaskList from './ActiveTaskList.js';
import AppName from './AppName.js';

const Header = (() => {
    const root = document.createElement('div');
    root.classList.add('header');

    const create = (todo) => {
       const activeTaskListNode = ActiveTaskList.create(todo);
       const appNameNode = AppName.create();
       root.append(activeTaskListNode, appNameNode);
       return root;
    };

    return { create, ActiveTaskList };
})();

export default Header;