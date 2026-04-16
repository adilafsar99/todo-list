import {createTaskObject, attachTaskMethods} from './TaskListAndTask.js';
import attachTaskAccessors from './Accessors.js';

const createTask = (state) => {
    let task = createTaskObject(state);
    attachTaskAccessors(task);
    attachTaskMethods(task);
    return task;
};

export default createTask;