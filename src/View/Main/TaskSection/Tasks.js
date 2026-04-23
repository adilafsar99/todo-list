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
        taskCard.classList.add('task-card');
        taskCard.dataset.taskListId = taskList.id;
        taskCard.dataset.taskId = task.id;
        taskCard.onclick = (event) => openTaskCard(event);
        
        const checkboxCol = document.createElement('div');
        checkboxCol.classList.add('checkbox-col');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task-check-mark';
        checkbox.onchange = (event) => markComplete(event, taskList);

        const contentCol = document.createElement('div');
        contentCol.classList.add('content-col');
        
        const closedCardContent = document.createElement('div');
        closedCardContent.classList.add('closed-card-content');

        const openCardContent = document.createElement('div');
        openCardContent.classList.add('open-card-content', 'hidden');

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

        closedCardContent.append(taskListRow, taskRow);
        openCardContent.appendChild(taskDescription);

        contentCol.append(closedCardContent, openCardContent);
        
        taskCard.append(checkboxCol, contentCol);

        return taskCard;
    };

    const openTaskCard = (event) => {
        const target = event.target.closest('.task-card');
        const taskCards = document.querySelectorAll('.task-card');
        const targetOpenCardCol = target.children[1].lastChild;
        if (!targetOpenCardCol.classList.contains('hidden')) {
            targetOpenCardCol.classList.add('hidden');
            console.log('hi')
        } else {
            taskCards.forEach(taskCard => {
                taskCard.children[1].lastChild.classList.add('hidden');
            });
            targetOpenCardCol.classList.remove('hidden');
        }
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