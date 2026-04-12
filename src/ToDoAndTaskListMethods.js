const createToDoAndTaskListMethods = (list) => {
    const addItem = (item) => list.push(item);

    const removeItem = (id, list) => list = list.filter(item => item.id !== id);

    const getItem = (id, list) => list.find(item => item.id === id);

    const updateItem = (id, list, fields) => {
        const item = get(id, list);
        item.setTitle(fields.title);
        item.setPriority(fields.priority);
        item.setDeadline(fields.deadline);
    }

    const filterList = (paramType, paramValue, list) => list.filter(item => item[paramType] === paramValue);

    const getPriorityValue = (priority) => {
        switch (priority) {
            case 'high':
                return 3;
            case 'medium':
                return 2;
            case 'low':
                return 1;
        }
    }

    const sortList = (sortParam, order, list) => list.sort((a, b) => {
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
    
    return {addItem, removeItem, getItem, updateItem, filterList, sortList};
}
