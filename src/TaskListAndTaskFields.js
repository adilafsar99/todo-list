const createTaskListAndTaskFields = (title, priority, deadline, isComplete) => {
    let id = crypto.randomUUID();
    return {title, priority, deadline, isComplete, id};
};

export default createTaskListAndTaskFields;