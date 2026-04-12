import TaskList from "./TaskList.js";
import { createToDoAndTaskListFields as createBaseFields , createToDoAndTaskListMethods as createBaseMethods } from './ToDoAndTaskList.js';

const createToDo = (() => {
    const baseFields = createBaseFields();
    
    const baseMethods = createBaseMethods(baseFields.list);
    baseMethods.createTaskList = (title, priority, deadline, isComplete) => {
        baseMethods.addItem(TaskList(title, priority, deadline, isComplete));
    };

    return {...baseMethods};
})();

export default createToDo;