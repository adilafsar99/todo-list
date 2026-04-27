import todo from '../../../../State/State.js';
import Subject from '../../../../Subject/Subject.js';

const SortTabs = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('sort-tabs-root');

        const sortOptions = ['priority', 'deadline'];

        sortOptions.forEach(sortOption => {
            const tab = document.createElement('div');
            tab.classList.add('tab', 'sort-tab');
            tab.dataset.sortParam = sortOption;
            tab.onclick = (event) => {
                const tabs = Array.from(root.children);
                const selectedTab = event.target.closest('.tab');
                if (selectedTab.classList.contains('selected')) {
                    selectedTab.classList.remove('selected');
                    todo.activeItem.sortOptions.sortParam = '';
                } else {
                    tabs.forEach(tab => tab.classList.remove('selected'));
                    selectedTab.classList.add('selected');
                    todo.activeItem.sortOptions.sortParam = selectedTab.dataset.sortParam;
                }
                Subject.notify();
            }


            const tabText = document.createElement('p');
            tabText.classList.add('tab-text', 'sort-tab-text');
            tabText.textContent = sortOption.slice(0, 1).toUpperCase() + sortOption.slice(1);

            tab.appendChild(tabText);

            root.appendChild(tab);
        });

        return root;
    };

    return { create };

})();

export default SortTabs;