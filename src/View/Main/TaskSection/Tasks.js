const Tasks = (() => {
    const create = (taskList) => {
        const root = document.createElement('div');
        root.classList.add('tasks-root');
      
        taskList.list.forEach(task => {
            const taskCard = createTaskCard(task, taskList);
            root.append(taskCard);
        });

        return root;
    };

    const createTaskCard = (task, taskList) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.dataset.id = task.id;

        const checkMark = document.createElement('input');
        checkMark.type = 'checkbox';
        checkMark.id = 'task-check-mark';
        checkMark.onchange = (event) => markComplete(event, taskList);

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = task.deadline;
        
        taskCard.append(checkMark, taskTitle, taskDeadline);

        return taskCard;
    };

    const update = (taskList) => {
        const root = document.querySelector('.tasks-root');
        root.innerHTML = '';
        console.log(taskList)

        taskList.list.forEach(task => {
            let taskCard = createTaskCard(task, taskList);
            root.appendChild(taskCard);
        });
    };

    const markComplete = (event, taskList) => {
        const id = event.target.closest('.task-card').dataset.id;
        const task = taskList.getItem(id);
        console.log(task)
        task.toggleIsComplete();
    };

    return { create, update };
})();

export default Tasks;