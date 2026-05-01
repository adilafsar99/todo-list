import LocalStorage from '../../../../State/LocalStorage.js';
import todo from '../../../../State/State.js';
import Subject from '../../../../Subject/Subject.js';

const FilterTabs = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('filter-tabs-root');

        const filterOptions = {
            'status': ['complete', 'due', 'overdue'],
            'priority': ['low', 'medium', 'high'],
            'deadline': ['today', 'this month', 'date']
        };

        for (let key in filterOptions) {
            let subHeading = document.createElement('p');
            subHeading.classList.add('sub-heading');
            subHeading.textContent = `By ${key.slice(0, 1).toUpperCase() + key.slice(1)}:`;

            root.appendChild(subHeading);

            filterOptions[key].forEach(filterOption => {
                if (filterOption === 'date') {
                    const label = document.createElement('label');
                    label.for = 'date-filter';

                    const dateInput = document.createElement('input');
                    dateInput.type = 'date';
                    dateInput.classList.add('tab', 'filter-tab', `${key}-tab`, 'date-input');
                    dateInput.id = 'date-filter';
                    dateInput.value = LocalStorage.getFromStorage('date') || '';
                    if (todo.filterConfig[key] === dateInput.value && dateInput.value) {
                        dateInput.classList.add('selected');
                    }
                    dateInput.required = 'true';
                    dateInput.dataset.filterParam = key;
                    dateInput.oninput = (event) => {
                        LocalStorage.saveToStorage('date', dateInput.value);
                        if (!dateInput.classList.contains('selected') && !dateInput.value) {
                            return;
                        }
                        changeFilterParam(event);
                    };

                    root.appendChild(dateInput);
                } else {
                    const tab = document.createElement('div');
                    tab.classList.add('tab', 'filter-tab', `${key}-tab`);
                    if (todo.filterConfig[key] === filterOption) {
                        tab.classList.add('selected');
                    }
                    tab.dataset.filterParam = key;
                    tab.dataset.filterValue = filterOption;
                    tab.onclick = (event) => changeFilterParam(event);

                    const tabText = document.createElement('p');
                    tabText.classList.add('tab-text', 'filter-tab-text');
                    tabText.textContent = filterOption.slice(0, 1).toUpperCase() + filterOption.slice(1);

                    tab.appendChild(tabText);

                    root.appendChild(tab);
                }

            })
        }

        return root;
    };

    const changeFilterParam = (event) => {
        const tabSectionClass = event.target.closest('.filter-tab').className.split(' ').filter(item => item.includes('tab')).at(-1);
        const tabs = Array.from(document.querySelectorAll(`.${tabSectionClass}`));
        const selectedTab = event.target.closest(`.${tabSectionClass}`);
        const filterParam = selectedTab.dataset.filterParam;
        const filterValue = selectedTab.dataset.filterValue;

        const clearDateFilter = selectedTab.classList.contains('selected') &&
            selectedTab.type === 'date' && selectedTab.value === '';
        const clearFilter = selectedTab.classList.contains('selected') &&
            selectedTab.type !== 'date';

        if (clearDateFilter || clearFilter) {
            selectedTab.classList.remove('selected');
            todo.filterConfig[filterParam] = '';
            LocalStorage.saveToStorage('todo', todo);
        } else {
            tabs.forEach(tab => tab.classList.remove('selected'));
            selectedTab.classList.add('selected');
            if (selectedTab.type === 'date') {
                todo.filterConfig[filterParam] = selectedTab.value;

            } else {
                todo.filterConfig[filterParam] = filterValue;
            }
            LocalStorage.saveToStorage('todo', todo);
        }

        Subject.notify();
    };

    return { create };

})();

export default FilterTabs;