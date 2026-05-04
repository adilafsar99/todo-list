import { isAfter, isBefore, isSameDay, isThisMonth, isToday } from 'date-fns';
import { createTaskListAndTaskFields } from './TaskListAndTask.js';
import createTask from './Task.js';
import createTaskList from './TaskList.js';

const createTodoAndTaskListFields = ({ list = [] }) => ({
    list
});

const createTodoFields = ({ activeId = null, sortConfig = {}, filterConfig = {} }) => ({
    activeId,
    sortConfig,
    filterConfig
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

    return { getItem, updateItem, removeItem };
};

const createTaskListMethods = () => {
    const createItem = function (state) {
        const task = createTask(state);
        this.list.push(task);
        return task;
    };

    const markItem = function (id) {
        const task = this.getItem(id);
        task.toggleIsComplete();
        return task;
    };

    return { createItem, markItem };
};

const createTodoMethods = () => {
    const createItem = function (state) {
        const taskList = createTaskList(state);
        this.list.push(taskList);
        return taskList;
    };

    const setActiveId = function (id = '') {
        if (!id) {
            this.activeId = this.list[0].id;
        }
        else {
            this.activeId = id;
        }
    };

    const getActiveItem = function () {
        const activeItem = this.getItem(this.activeId);
        return activeItem;
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
                        return !task.isComplete && isBefore(new Date().setHours(0,0,0,0), new Date(task.deadline));
                    } else if (filterValue === 'overdue') {
                        return !task.isComplete && isAfter(new Date().setHours(0,0,0,0), new Date(task.deadline));
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

    return { createItem, setActiveId, getActiveItem, sortList, filterList };
};

const createTaskListObject = (state) => {
    const todoAndTaskListFields = createTodoAndTaskListFields(state);
    const taskListAndTaskFields = createTaskListAndTaskFields(state);
    return Object.assign({}, todoAndTaskListFields, taskListAndTaskFields);
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