import Task from "./Task.js";
import { createTaskListAndTaskFields as createBaseFields, createTaskListAndTaskMethods as createBaseMethods } from "./TaskListAndTask.js";

const createTaskList = (title, priority, deadline, isComplete) => {
    const baseFields = createBaseFields(title, priority, deadline, isComplete);

    const baseMethods = createBaseMethods(baseFields);
    baseMethods.createTask = (title, description, priority, deadline, isComplete) => {
        baseMethods.addItem(Task(title, description, priority, deadline, isComplete));
    };
    
    return {...baseMethods};
}

export default createTaskList;