import createBaseFields from './TaskListAndTaskFields.js';
import createBaseMethods from './TaskListAndTaskMethods.js';

const createTask = (title, description, priority, deadline, isComplete) => {
    const baseFields = createBaseFields(title, priority, deadline, isComplete);
    baseFields.description = description;

    const baseMethods = createBaseMethods(baseFields);

    return {...baseMethods};
};

export default createTask;