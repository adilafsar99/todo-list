import './MenuSection.css';

import SortSection from './SortSection/SortSection.js';

const MenuSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('section-root', 'menu-section-root', 'sidebar');
        
        const sortSection = SortSection.create();

        root.append(sortSection);

        return root;

    };

    return { create };
})();

export default MenuSection;