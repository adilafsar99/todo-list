const createTaskListAndTaskFields = (title, priority, deadline, isComplete) => ({
    id: crypto.randomUUID(),
    title, priority, deadline, isComplete,
});

const createTaskListAndTaskMethods = (fields) => ({
    get id () {
        return fields.id;
    },
    
    get title () {
        return fields.title;
    },

    set title (newTitle) {
        fields.title = newTitle;
    },

    get priority () {
        return fields.priority;
    },

    set priority (newPriority) {
        fields.priority = newPriority;
    },

    get deadline () {
        return fields.deadline;
    },

    set deadline (newDeadline) {
        fields.priority = newDeadline;
    },

    get isComplete () {
        return fields.isComplete;
    },

    toggleIsComplete() {
        fields.isComplete = !fields.isComplete;
    }
});

export {createTaskListAndTaskFields, createTaskListAndTaskMethods};