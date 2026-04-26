const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-list-section-heading-root');

        const heading = document.createElement('p');
        heading.classList.add('section-heading');
        heading.id = 'task-list-section-heading';
        heading.textContent = 'Task Lists';

        root.appendChild(heading);

        return root;
    };

    return {create};
})();

export default Heading;