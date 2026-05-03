import LocalStorage from '../../../../State/LocalStorage.js';
import todo from '../../../../State/State.js';
import Subject from '../../../../Subject/Subject.js';

const SortTabs = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('sort-tabs-root');

        const sortOptions = ['priority', 'deadline'];

        sortOptions.forEach(sortOption => {
            const tab = document.createElement('button');
            tab.classList.add('tab', 'sort-tab');
            if (todo.sortConfig.sortParam === sortOption) {
                tab.classList.add('selected');
            }
            tab.dataset.sortParam = sortOption;
            tab.onclick = (event) => changeSortParam(event);

            const tabText = document.createElement('p');
            tabText.classList.add('tab-text', 'sort-tab-text');
            tabText.textContent = sortOption.slice(0, 1).toUpperCase() + sortOption.slice(1);

            const sortOrderButton = document.createElement('button');
            sortOrderButton.id = 'sort-order-button';
            sortOrderButton.onclick = (event) => changeSortOrder(event, upIcon, downIcon);

            const upIcon = document.createElement('i');
            upIcon.classList.add('fa-solid', 'fa-arrow-up');

            const downIcon = document.createElement('i');
            downIcon.classList.add('fa-solid', 'fa-arrow-down');

            sortOrderButton.appendChild(upIcon);

            tab.append(tabText, sortOrderButton);

            root.appendChild(tab);
        });

        return root;
    };

    const changeSortOrder = (event, upIcon, downIcon) => {
        const sortOrderButton = event.target.closest('#sort-order-button');
        const selectedTab = sortOrderButton.closest('.sort-tab');

        if (selectedTab.classList.contains('selected')) {
            if (sortOrderButton.firstElementChild.classList.contains('fa-arrow-up')) {
                sortOrderButton.innerHTML = downIcon.outerHTML;
                todo.sortConfig.sortOrder = 'descending';

            } else {
                sortOrderButton.innerHTML = upIcon.outerHTML;
                todo.sortConfig.sortOrder = 'ascending';
            }

            LocalStorage.saveToStorage('todo', todo);
            Subject.notify();
        }
    };

    const changeSortParam = (event) => {
        if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
            return;
        }

        const tabs = Array.from(document.querySelectorAll('.sort-tab'));
        const selectedTab = event.target.closest('.sort-tab');

        if (selectedTab.classList.contains('selected')) {
            selectedTab.classList.remove('selected');
            todo.sortConfig.sortParam = '';
            LocalStorage.saveToStorage('todo', todo);
        } else {
            tabs.forEach(tab => tab.classList.remove('selected'));
            selectedTab.classList.add('selected');
            todo.sortConfig.sortParam = selectedTab.dataset.sortParam;
            LocalStorage.saveToStorage('todo', todo);
        }

        Subject.notify();
    };

    return { create };

})();

export default SortTabs;