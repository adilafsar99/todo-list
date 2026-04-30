import { format, isAfter, isBefore, isSameDay, isThisMonth, isToday } from 'date-fns';
import { createTaskListAndTaskFields } from './TaskListAndTask.js';
import createTask from './Task.js';
import createTaskList from './TaskList.js';

const createTodoAndTaskListFields = ({ list = [] }) => ({
    list
});

const createTaskListFields = ({ sortOptions = {}, filterOptions = {} }) => ({
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

    const sortList = function (list, { sortParam, sortOrder }) {      
        const listToSort = [...list];
        return listToSort.sort((a, b) => {
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

    const filterList = function (list, { filterParam, filterValue }) {
        return list.filter(task => {
            switch (filterParam) {
                case 'status':
                    if (filterValue === 'complete') {
                        return task.isComplete;
                    } else if (filterValue === 'due') {
                        return isBefore(new Date().setHours(0,0,0,0), new Date(task.deadline));
                    } else if (filterValue === 'overdue') {
                        return isAfter(new Date().setHours(0,0,0,0), new Date(task.deadline));
                    }
                case 'priority':
                    return task.priority === filterValue;
                case 'deadline':
                    if (filterValue === 'today') {
                        return isToday(new Date(task.deadline));
                    } else if (filterValue === 'this month') {
                        return isThisMonth(new Date(task.deadline));
                    } else {
                        return isSameDay(new Date(filterValue), new Date(task.deadline));
                    }
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