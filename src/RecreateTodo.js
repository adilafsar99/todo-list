import createTask from "./Task.js";
import createTaskList from "./TaskList.js";
import createTodo from "./Todo.js";

const recreateTodo = (todoObj) => {
    const todo = createTodo(todoObj);
    todo.list = todo.list.map(taskList => createTaskList(taskList));
    todo.list.forEach(taskList => taskList.list = taskList.list.map(task => createTask(task)));
    return todo;
};

export default recreateTodo;