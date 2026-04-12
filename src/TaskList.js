import { createTaskListAndTaskFields as createBaseFields } from "./TaskListAndTask.js";
import { createTaskListAndTaskMethods as createBaseMethods } from "./TaskListAndTask.js";

const createTaskList = (title, priority, deadline, isComplete) => {
    const baseFields = createBaseFields(title, priority, deadline, isComplete);

    const baseMethods = createBaseMethods(baseFields);
    
    return {...baseMethods};
}

export default createTaskList;