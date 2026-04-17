import './Header.css';
import ActiveTaskList from './ActiveTaskList.js';
import AppName from './AppName.js';

const Header = (() => {
    const root = document.querySelector('.header');

    const render = (todo) => {
       const activeTaskListNode = ActiveTaskList.create(todo);
       const appNameNode = AppName.create();
       root.append(activeTaskListNode, appNameNode); 
    };

    return { render };
})();

export default Header;