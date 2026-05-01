import './FilterSection.css';

import Heading from './Heading.js';
import FilterTabs from './FilterTabs.js';

const FilterSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('section-root', 'sort-section-root');

        const heading = Heading.create();
        const filterTabs = FilterTabs.create();
         
        root.append(heading, filterTabs);

        return root;
    };

    return { create };

})();

export default FilterSection;