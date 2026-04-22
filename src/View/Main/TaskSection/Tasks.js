const Tasks = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('tasks-root');
      
        todo.activeItem.list.forEach(task => {
            const taskCard = createTaskCard(task);
            root.append(taskCard);
        });

        return root;
    };

    const createTaskCard = (task) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = task.deadline;
        
        taskCard.append(taskTitle, taskDeadline);

        return taskCard;
    };

    const update = (list) => {
        const root = document.querySelector('.tasks-root');
        root.innerHTML = '';

        list.forEach(task => {
            let taskCard = createTaskCard(task);
            root.appendChild(taskCard);
        });
    };

    return { create, update };
})();

export default Tasks;