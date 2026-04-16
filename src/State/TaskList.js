import {createTaskListObject, attachTaskListMethods} from './TodoAndTaskList.js';
import attachTaskListAccessors from './Accessors.js';

const createTaskList = (state) => {
    const taskList = createTaskListObject(state);
    attachTaskListAccessors(taskList);
    attachTaskListMethods(taskList);
    return taskList;
};

export default createTaskList;