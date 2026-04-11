const createTaskListAndTaskFields = (title, priority, deadline, isComplete) => ({
    title: title,
    priority: priority,
    deadline: deadline,
    isComplete: isComplete,
});

export default createTaskListAndTaskFields;