const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-list-heading-root');

        const heading = document.createElement('p');
        heading.id = 'task-list-heading';
        heading.textContent = 'Task Lists';

        root.appendChild(heading);

        return root;
    };

    return {create};
})();

export default Heading;