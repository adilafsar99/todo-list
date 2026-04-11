const createBaseFields = (title, priority, deadline, isComplete) => ({
    title: title,
    priority: priority,
    deadline: deadline,
    isComplete: isComplete,
});

export default createBaseFields;

console.log(createBaseFields('Play', 'high', '23-12-2026', false))