import Task from "./Task.js";
import { createTaskListAndTaskFields as createBaseFields, createTaskListAndTaskMethods as createBaseMethods } from "./TaskListAndTask.js";
import { createToDoAndTaskListFields as createListFields, createToDoAndTaskListMethods as createListMethods } from "./ToDoAndTaskList.js";

const createTaskList = (title, priority, deadline, isComplete) => {
    const baseFields = createBaseFields(title, priority, deadline, isComplete);
    const listFields = createListFields();

    const baseMethods = createBaseMethods(baseFields);
    const listMethods = createListMethods(listFields.list);
    listMethods.createTask = (title, description, priority, deadline, isComplete) => {
        listMethods.addItem(Task(title, description, priority, deadline, isComplete));
    };
    
    return {...baseMethods, ...listMethods};
}

export default createTaskList;