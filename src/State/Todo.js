import {createTodoObject, attachTodoMethods} from './TodoAndTaskList.js';
import attachAccessors from './Accessors.js';

const createTodo = (state) => {
    const todo = createTodoObject(state);
    attachAccessors(todo);
    attachTodoMethods(todo);
    return todo;
};

export default createTodo;