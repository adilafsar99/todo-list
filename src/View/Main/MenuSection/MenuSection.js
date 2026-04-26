import './MenuSection.css';

const MenuSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('menu-section-root', 'sidebar');


        return root;

    };

    return { create };
})();

export default MenuSection;