import Heading from './Heading.js';

const SortSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('sort-section-root');

        const heading = Heading.create();
         
        root.append(heading);

        return root;
    };

    return { create };

})();

export default SortSection;