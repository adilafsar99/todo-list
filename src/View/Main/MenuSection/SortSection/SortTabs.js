const SortTabs = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('sort-tabs-root');

        const sortOptions = ['priority', 'deadline'];

        sortOptions.forEach(sortOption => {
            const tab = document.createElement('div');
            tab.classList.add('tab', 'sort-tab');

            const tabText = document.createElement('p');
            tabText.classList.add('tab-text', 'sort-tab-text');
            tabText.textContent = sortOption.slice(0,1).toUpperCase() + sortOption.slice(1);

            tab.appendChild(tabText);

            root.appendChild(tab);
        });

        return root;
    };

    return { create };

})();

export default SortTabs;