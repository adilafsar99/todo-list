const createTaskListAndTaskFields = ({title, id = null}) => ({
    title,
    id: !id ? crypto.randomUUID() : id,
});

const createTaskFields = ({description, priority, deadline, isComplete}) => ({
    description,
    priority,
    deadline,
    isComplete,
});

const createTaskMethods = () => {
    const toggleIsComplete = function () { 
        this.isComplete = !this.isComplete;
    };
    return {toggleIsComplete};
};

const createTaskObject = (state) => {
    const commonFields = createTaskListAndTaskFields(state);
    const taskFields = createTaskFields(state);
    return Object.assign({}, commonFields, taskFields);
};

const attachTaskMethods = (todoItem) => {
    const taskMethods = createTaskMethods();
    Object.assign(todoItem, taskMethods);
};

export {createTaskListAndTaskFields, createTaskObject, attachTaskMethods};