import createBaseFields from './TaskListAndTaskFields.js';
import createBaseMethods from './TaskListAndTaskMethods.js';

const createTask = (title, description, priority, deadline, isComplete) => {
    const fields = createBaseFields(title, priority, deadline, isComplete);
    fields.description = description;
    const baseMethods = createBaseMethods(fields);

    return {...fields, ...baseMethods};
};

export default createTask;