const ActiveList = (() => {
    const create = (list) => {
        const root = document.createElement('div');
        root.classList.add('active-list-root');

        const activeList = document.createElement('p');
        activeList.id = 'active-list';

        if (typeof list === 'object') {
            activeList.textContent = list.activeItem.title;
        } else {
            switch (list) {
                case 'all':
                    activeList.textContent = 'All Tasks';
            }
        }

        root.appendChild(activeList);

        return root;
    };

    const update = (list) => {
        const activeList = document.querySelector('#active-list');
        
        if (typeof list === 'object') {
            activeList.textContent = list.activeItem ? list.activeItem.title : 'All Tasks';
        }
    };

    return { create, update };
})();

export default ActiveList;