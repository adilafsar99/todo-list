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
        
        const checkboxCol = document.createElement('div');
        checkboxCol.classList.add('task-col', 'checkbox-col');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task-check-mark';
        checkbox.onchange = (event) => markComplete(event, taskList);

        const textCol = document.createElement('div');
        textCol.classList.add('task-col', 'text-col');
        
        const closedCardText = document.createElement('div');
        closedCardText.classList.add('closed-card-text');

        const openCardText = document.createElement('div');
        openCardText.classList.add('open-card-text');

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = task.deadline;

        const taskDescription = document.createElement('p');
        taskDescription.id = 'task-description';
        taskDescription.textContent = task.description;

        const taskListTitle = document.createElement('p');
        taskListTitle.id = 'task-list';
        taskListTitle.textContent = taskList.title;
        
        checkboxCol.appendChild(checkbox);

        closedCardText.append(taskTitle, taskDeadline, taskListTitle);
        openCardText.appendChild(taskDescription);

        textCol.append(closedCardText, openCardText)
        
        taskCard.append(checkboxCol, textCol);

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
        task.toggleIsComplete();
    };

    return { create, update };
})();

export default Tasks;