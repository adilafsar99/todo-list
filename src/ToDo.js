import createTaskList from "./TaskList.js";
import { createToDoAndTaskListFields as createBaseFields , createToDoAndTaskListMethods as createBaseMethods } from './ToDoAndTaskList.js';

const createToDo = (() => {
    const baseFields = createBaseFields();
    
    const baseMethods = createBaseMethods(baseFields.list);
    
    return {...baseMethods};
})();

export {createToDo};