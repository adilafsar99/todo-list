import { format } from 'date-fns';
import { createTaskListAndTaskFields } from './TaskListAndTask.js';
import createTask from './Task.js';
import createTaskList from './TaskList.js';

const createTodoAndTaskListFields = ({ list = [] }) => ({
    list
});

const createTaskListFields = ({sortOptions = {sortParam: '', sortOrder: 'ascending'}, filterOptions = {filterParam: '', filterValue: ''}}) => ({
    sortOptions,
    filterOptions
});

const createTodoFields = ({ activeItem = null }) => ({
    activeItem,
});

const createTodoAndTaskListMethods = () => {
    const getItem = function (id) {
        return this.list.find(item => item.id === id);
    };
    
    const updateItem = function (id, state) {
        const item = this.getItem(id);
        for (let key in state) {
            if (state[key] !== undefined) {
                item[key] = state[key];
            }
        }
        return item;
    };
    
    const removeItem = function (id) {
        let deletedItem;
        this.list = this.list.filter(item => {
            if (item.id === id) {
                deletedItem = item;
            }
            return item.id !== id;
        });
        return deletedItem;
    };

    const setActiveItem = function (id = '') {
        if (!id) {
            this.activeItem = this.list[0];
        }
        else {
            const item = this.getItem(id);
            this.activeItem = item;
            return item;
        }
    };

    return { getItem, updateItem, removeItem, setActiveItem };
};

const createTaskListMethods = () => {
    const createItem = function (state) {
        const task = createTask(state);
        this.list.push(task);
        return task;
    };

    const markItem = function (id) {
        const task = this.getItem(id);
        task.isComplete = true;
    };

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

    const sortList = function ({sortParam, sortOrder}) {
        const sortedList = [...this.list];
        return sortedList.sort((a, b) => {
            if (sortOrder === 'descending') {
                [a, b] = [b, a];
            }
            switch (sortParam) {
                case 'priority':
                    return getPriorityValue(a.priority) - getPriorityValue(b.priority);
                case 'deadline':
                    return new Date(a.deadline) - new Date(b.deadline);
            }
        })
    };

    const filterList = function ({filterParam, filterValue}) {
        return this.list.filter(task => {
            switch (filterParam) {
                case 'day':
                    return format(task.deadline, 'EEEE').toLowerCase() === paramValue;
                case 'date':
                    return format(task.deadline, 'dd-mm-yyyy') === format(new Date(), 'dd-mm-yyyy');
                case 'month':
                    return format(task.deadline, 'mm') === format(new Date(), 'mm');
                case 'priority':
                    return task.priority === filterValue;

            }
        })
    };
    return { createItem, markItem, sortList, filterList };
};

const createTodoMethods = () => {
    const createItem = function (state) {
        const taskList = createTaskList(state);
        this.list.push(taskList);
        return taskList;
    };

    return { createItem };
};

const createTaskListObject = (state) => {
    const commonFields = createTodoAndTaskListFields(state);
    const taskListAndTaskFields = createTaskListAndTaskFields(state);
    const taskListFields = createTaskListFields(state);
    return Object.assign({}, commonFields, taskListAndTaskFields, taskListFields);
};

const attachTaskListMethods = (taskListObj) => {
    const commonMethods = createTodoAndTaskListMethods();
    const taskListMethods = createTaskListMethods();
    Object.assign(taskListObj, commonMethods, taskListMethods);
};

const createTodoObject = (state) => {
    const commonFields = createTodoAndTaskListFields(state);
    const todoFields = createTodoFields(state);
    return Object.assign({}, commonFields, todoFields);
};

const attachTodoMethods = (todoObj) => {
    const commonMethods = createTodoAndTaskListMethods();
    const todoMethods = createTodoMethods();
    Object.assign(todoObj, commonMethods, todoMethods);
};

export { createTodoObject, createTaskListObject, attachTodoMethods, attachTaskListMethods };