import createBaseFields from './TaskListAndTaskFields.js';
import createBaseMethods from './TaskListAndTaskMethods.js';

const createTaskList = (title, priority, deadline, isComplete) => {
    const baseFields = createBaseFields(title, priority, deadline, isComplete);

    const baseMethods = createBaseMethods(baseFields);
    
    return {...baseFields, ...baseMethods};
}

export default createTaskList;