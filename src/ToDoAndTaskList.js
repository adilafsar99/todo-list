const createToDoAndTaskListFields = () => {
    let list = [];
    let activeItem = null;
    return {list, activeItem};
};

const createToDoAndTaskListMethods = ({list, activeItem}) => {
    const getList = () => list;

    const addItem = (item) => list.push(item);

    const removeItem = (id) => list = list.filter(item => item.id !== id);

    const getItem = (id) => list.find(item => item.id === id);

    const getActiveItem = () => {
        return activeItem;
    };

    const setActiveItem = (event) => {
        if (!activeItem) {
            activeItem = list[0];
        }
        else {
            const targetId = event.target.dataset.id;
            activeItem = getItem(targetId);
        }
    };

    const updateItem = (id, fields) => {
        const item = getItem(id, list);
        item.setTitle(fields.title);
        item.setPriority(fields.priority);
        item.setDeadline(fields.deadline);
    };

    const formatDate = (date) => `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

    const filterList = (paramType, paramValue) => list.filter(item => {
        switch (paramType) {
            case 'day':
                return new Date(item.deadline).toLocaleDateString('en-us', {weekday: 'short'}).toLowerCase() === paramValue; 
            case 'date':
                return formatDate(new Date(item.deadline)) == formatDate(new Date());
            case 'month':
                return new Date(item.deadline).getMonth() === new Date().getMonth();
            case 'year':
                return new Date(item.deadline).getFullYear() === new Date().getFullYear();
        }
    });

    const getPriorityValue = (priority) => {
        switch (priority) {
            case 'high':
                return 3;
            case 'medium':
                return 2;
            case 'low':
                return 1;
        }
    };

    const sortList = (sortParam, order) => list.sort((a, b) => {
        if (order === 'descending') {
            [a, b] = [b, a];
        }
        switch (sortParam) {
            case 'priority':
                return getPriorityValue(a[sortParam]) - getPriorityValue(b[sortParam]);
            case 'deadline':
                return (new Date(a[sortParam]) - new Date(b[sortParam]));
        }
    });
    
    return {getList, addItem, removeItem, getItem, getActiveItem, setActiveItem, updateItem, filterList, sortList};
};

export {createToDoAndTaskListFields, createToDoAndTaskListMethods};