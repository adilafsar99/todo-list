import createTask from "./Task.js"


const task = createTask('Play', 'Only creative games.', 'medium', '12/4/2026', false);
const taskTwo = createTask('Play More', 'Only games.', 'low', '12/4/2027', true);
console.log(task.getTitle())
console.log(taskTwo.getTitle())