const AppName = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('app-name-root');

        const appName = document.createElement('p');
        appName.id = 'app-name';
        appName.textContent = 'Todo_';

        root.appendChild(appName);

        return root;
    };

    return {create};
})();

export default AppName;