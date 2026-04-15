import { format } from 'date-fns';
import { createTaskListAndTaskFields as createTaskListFields } from './TaskListAndTask.js';
import createTask from './Task.js';

const createTodoAndTaskListFields = ({ list = [], activeItem = null }) => ({
    list,
    activeItem,
});

const createTodoAndTaskListMethods = () => {
    const getItem = function (id) {
        return this.list.find(item => item.id === id);
    };
    
    const updateItem = function (id, state) {
        const task = this.getItem(id);
        for (let key in state) {
            if (state[key]) {
                task[key] = state[key];
            }
        }
    };
    
    const removeItem = function (id) {
        this.list = this.list.filter(item => item.id !== id);
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

    const sortList = function (sortParam, isDescending) {
        this.list.sort((a, b) => {
            if (isDescending) {
                [a, b] = [b, a];
            }
            switch (sortParam) {
                case 'priority':
                    return getPriorityValue(a.priority) - getPriorityValue(b.priority);
                case 'deadline':
                    return a.deadline - b.deadline;
            }
        })
    };

    const filterList = function (paramType, paramValue) {
        this.list.filter(task => {
            switch (paramType) {
                case 'day':
                    return format(task.deadline, 'EEEE').toLowerCase() === paramValue;
                case 'date':
                    return format(task.deadline, 'dd-mm-yyyy') === format(new Date(), 'dd-mm-yyyy');
                case 'month':
                    return format(task.deadline, 'mm') === format(new Date(), 'mm');
                case 'priority':
                    return task.priority === paramValue;

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
    const taskListFields = createTaskListFields(state);
    return Object.assign({}, commonFields, taskListFields);
};

const attachTaskListMethods = (taskListObj) => {
    const commonMethods = createTodoAndTaskListMethods();
    const taskListMethods = createTaskListMethods();
    Object.assign(taskListObj, commonMethods, taskListMethods);
};

const createTodoObject = (state) => {
    const todoFields = createTodoAndTaskListFields(state);
    return Object.assign({}, todoFields);
};

const attachTodoMethods = (todoObj) => {
    const commonMethods = createTodoAndTaskListMethods();
    const todoMethods = createTodoMethods();
    Object.assign(taskListObj, commonMethods, todoMethods);
};

export { createTodoObject, createTaskListObject, attachTodoMethods, attachTaskListMethods };