const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-section-heading-root');

        const heading = document.createElement('p');
        heading.classList.add('section-heading');
        heading.id = 'task-section-heading';
        heading.textContent = 'Tasks';

        root.appendChild(heading);

        return root;
    };

    return { create };
})();

export default Heading;