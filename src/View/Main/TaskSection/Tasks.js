import {format} from 'date-fns';

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
        taskCard.classList.add('task-card', 'closed-card');
        taskCard.dataset.id = task.id;
        taskCard.onclick = (event) => openTaskCard(event);
        
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

        const taskListRow = document.createElement('div');
        taskListRow.classList.add('task-list-row');

        const taskRow = document.createElement('div');
        taskRow.classList.add('task-row');

        const taskListTitle = document.createElement('p');
        taskListTitle.id = 'task-list-title';
        taskListTitle.textContent = taskList.title;

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = format(task.deadline, 'dd-mm-yyyy');

        const taskDescription = document.createElement('p');
        taskDescription.id = 'task-description';
        taskDescription.textContent = task.description;
        
        checkboxCol.appendChild(checkbox);

        taskListRow.appendChild(taskListTitle);
        taskRow.append(taskTitle, taskDeadline);

        closedCardText.append(taskListRow, taskRow);
        openCardText.appendChild(taskDescription);

        textCol.append(closedCardText, openCardText)
        
        taskCard.append(checkboxCol, textCol);

        return taskCard;
    };

    const openTaskCard = (event) => {
        const target = event.target.closest('.task-card');
        const taskCards = document.querySelectorAll('.task-card');
        taskCards.forEach(taskCard => {
            taskCard.classList.add('closed-card');
        });
        target.classList.remove('closed-card');
    }

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