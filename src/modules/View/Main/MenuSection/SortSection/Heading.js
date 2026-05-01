const Heading = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('sort-section-heading-root');

        const heading = document.createElement('p');
        heading.classList.add('section-heading');
        heading.id = 'sort-secton-heading';
        heading.textContent = 'Sort';

        root.appendChild(heading);

        return root;
    };

    return {create};
})();

export default Heading;