import './Header.css';
import ActiveList from './ActiveList.js';
import AppName from './AppName.js';

const Header = (() => {
    const create = () => {
        const root = document.createElement('header');
        root.classList.add('header');

        const activeList = ActiveList.create();
        const appName = AppName.create();

        root.append(activeList, appName);

        return root;
    };

    return { create };
})();

export default Header;