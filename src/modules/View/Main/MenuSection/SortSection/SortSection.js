import './SortSection.css';

import Heading from './Heading.js';
import SortTabs from './SortTabs.js';

const SortSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('section-root', 'sort-section-root');

        const heading = Heading.create();
        const sortTabs = SortTabs.create();
         
        root.append(heading, sortTabs);

        return root;
    };

    return { create };

})();

export default SortSection;