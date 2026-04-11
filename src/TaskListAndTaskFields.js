const createTaskListAndTaskFields = (title, priority, deadline, isComplete) => ({
    title: title,
    priority: priority,
    deadline: deadline,
    isComplete: isComplete,
});

export default createTaskListAndTaskFields;

console.log(createTaskListAndTaskFields('Play', 'high', '23-12-2026', false))