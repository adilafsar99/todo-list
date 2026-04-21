const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-heading-root');

        const heading = document.createElement('p');
        heading.id = 'task-heading';
        heading.textContent = 'Tasks';

        root.appendChild(heading);

        return root;
    };

    return { create };
})();

export default Heading;