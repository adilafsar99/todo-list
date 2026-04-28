import './MenuSection.css';

import SortSection from './SortSection/SortSection.js';
import FilterSection from './FilterSection/FilterSection.js';

const MenuSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('section-root', 'menu-section-root', 'sidebar');
        
        const sortSection = SortSection.create();
        const filterSection = FilterSection.create();

        root.append(sortSection, filterSection);

        return root;

    };

    return { create };
})();

export default MenuSection;