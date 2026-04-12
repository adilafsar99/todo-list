import createTask from "./Task.js"
import createTaskList from "./TaskList.js";
import createToDoAndTaskListMethods from './ToDoAndTaskList.js'


const task = createTask('Play', 'Only creative games.', 'medium', '12/4/2026', false)
const taskTwo = createTask('Play More', 'Only games.', 'low', '12/4/2027', true)
const taskList = createTaskList('Games', 'medium', '12/4/2026', false)
const taskListTwo = createTask('More Games', 'low', '12/4/2027', true)
console.log(task.getTitle())
console.log(taskTwo.getTitle())
console.log(taskList.getTitle())
console.log(taskListTwo.getTitle())