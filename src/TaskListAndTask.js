const createTaskListAndTaskFields = (title, priority, deadline, isComplete) => {
    let id = crypto.randomUUID();
    return {title, priority, deadline, isComplete, id};
};

const createTaskListAndTaskMethods = (fields) => {
    const getTitle = () => fields.title;

    const setTitle = (newTitle) => fields.title = newTitle;

    const getPriority = () => fields.priority;

    const setPriority = (newPriority) => fields.priority = newPriority;

    const getDeadline = () => fields.deadline;

    const setDeadline = (newDeadline) => fields.priority = newDeadline;

    const getIsComplete = () => fields.isComplete;

    const toggleIsComplete = () => fields.isComplete = !fields.isComplete;

    const getId = () => fields.id;

    return {getTitle, setTitle, getPriority, setPriority, getDeadline, setDeadline, getIsComplete, toggleIsComplete, getId};
};

export {createTaskListAndTaskFields, createTaskListAndTaskMethods};