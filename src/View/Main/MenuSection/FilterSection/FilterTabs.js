import todo from '../../../../State/State.js';
import Subject from '../../../../Subject/Subject.js';

const FilterTabs = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('filter-tabs-root');

        const filterOptions = {
            'status': ['complete', 'due', 'overdue'],
            'priority': ['low', 'medium', 'high'],
            'deadline': ['today', 'this month']
        };

        for (let key in filterOptions) {
            let subHeading = document.createElement('p');
            subHeading.classList.add('sub-heading');
            subHeading.textContent =  `By ${key.slice(0,1).toUpperCase() + key.slice(1)}:`;

            root.appendChild(subHeading);

            filterOptions[key].forEach(filterOption => {
                const tab = document.createElement('div');
                tab.classList.add('tab', 'filter-tab');
                tab.dataset.filterParam = filterOption;
                tab.onclick = (event) => changeFilterParam(event);

                const tabText = document.createElement('p');
                tabText.classList.add('tab-text', 'filter-tab-text');
                tabText.textContent = filterOption.slice(0, 1).toUpperCase() + filterOption.slice(1);

                tab.appendChild(tabText);

                root.appendChild(tab);
            })
        }

        return root;
    };

    const changeFilterParam = (event) => {
        const tabs = Array.from(document.querySelectorAll('.filter-tab'));
        const selectedTab = event.target.closest('.filter-tab');
        if (selectedTab.classList.contains('selected')) {
            selectedTab.classList.remove('selected');
            todo.activeItem.filterOptions.filterParam = '';
        } else {
            tabs.forEach(tab => tab.classList.remove('selected'));
            selectedTab.classList.add('selected');
            todo.activeItem.filterOptions.filterParam = selectedTab.dataset.filterParam;
        }
        Subject.notify();
    };

    return { create };

})();

export default FilterTabs;