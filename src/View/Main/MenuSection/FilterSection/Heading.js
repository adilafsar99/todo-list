const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('filter-section-heading-root');

        const heading = document.createElement('p');
        heading.classList.add('section-heading');
        heading.id = 'filter-secton-heading';
        heading.textContent = 'Filter';

        root.appendChild(heading);

        return root;
    };

    return {create};
})();

export default Heading;