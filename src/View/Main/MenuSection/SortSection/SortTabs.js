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
            tab.dataset.sortOrder = 'ascending';
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

        if (todo.activeItem.sortOptions.sortOrder === 'ascending') {
            sortOrderButton.innerHTML = downIcon.outerHTML;
            todo.activeItem.sortOptions.sortOrder = 'descending';
        } else {
            sortOrderButton.innerHTML = upIcon.outerHTML;
            todo.activeItem.sortOptions.sortOrder = 'ascending';
        }
        if (selectedTab.classList.contains('selected')) {
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
            todo.activeItem.sortOptions.sortParam = '';
        } else {
            tabs.forEach(tab => tab.classList.remove('selected'));
            selectedTab.classList.add('selected');
            todo.activeItem.sortOptions.sortParam = selectedTab.dataset.sortParam;
        }
        Subject.notify();
    };

    return { create };

})();

export default SortTabs;