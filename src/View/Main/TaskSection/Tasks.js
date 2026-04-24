import {format} from 'date-fns';

import TaskForm from './TaskForm.js';

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
        checkbox.id = 'task-check-box';
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

        const buttonRow = document.createElement('div');
        buttonRow.classList.add('button-row');

        const taskListTitle = document.createElement('p');
        taskListTitle.id = 'task-list-title';
        taskListTitle.textContent = taskList.title;

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = format(task.deadline, 'dd-MMM-yyyy');

        const taskDescription = document.createElement('p');
        taskDescription.id = 'task-description';
        taskDescription.textContent = task.description;

        const button = document.createElement('button');
        button.id = 'edit-task-button';
        button.onclick = (event) => editTask(event, taskList);

        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-pen-to-square');

        button.appendChild(icon);
        
        checkboxCol.appendChild(checkbox);

        taskListRow.appendChild(taskListTitle);
        taskRow.append(taskTitle, taskDeadline);
        buttonRow.appendChild(button);

        closedCardContent.append(taskListRow, taskRow);
        openCardContent.append(taskDescription, buttonRow);

        contentCol.append(closedCardContent, openCardContent);
        
        taskCard.append(checkboxCol, contentCol);

        return taskCard;
    };

    const openTaskCard = (event) => {
        if (event.target.type === 'checkbox') {
            return;
        };
        const target = event.target.closest('.task-card');
        const taskCards = document.querySelectorAll('.task-card');
        const targetOpenCardCol = target.children[1].lastChild;
        if (!targetOpenCardCol.classList.contains('hidden')) {
            targetOpenCardCol.classList.add('hidden');
        } else {
            taskCards.forEach(taskCard => {
                taskCard.children[1].lastChild.classList.add('hidden');
            });
            targetOpenCardCol.classList.remove('hidden');
        }
    };

    const editTask = (event, taskList) => {
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const task = taskList.getItem(taskId);
        TaskForm.fillFields(task);
        TaskForm.toggleVisibility();
    };

    const markComplete = (event, taskList) => {
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const task = taskList.getItem(taskId);
        task.toggleIsComplete();
    };

    const update = (taskList) => {
        const root = document.querySelector('.tasks-root');
        root.innerHTML = '';

        taskList.list.forEach(task => {
            let taskCard = createTaskCard(task, taskList);
            root.appendChild(taskCard);
        });
    };

    return { create, update };
})();

export default Tasks;