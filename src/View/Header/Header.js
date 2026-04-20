import './Header.css';
import ActiveList from './ActiveList.js';
import AppName from './AppName.js';

const Header = (() => {
    const create = (todo) => {
        const root = document.createElement('header');
        root.classList.add('header');

        const activeList = ActiveList.create(todo);
        const appName = AppName.create();

        root.append(activeList, appName);

        return root;
    };

    return { create, ActiveList };
})();

export default Header;