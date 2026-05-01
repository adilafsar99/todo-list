import { format } from 'date-fns';

import todo from '../../../State/State.js';
import Subject from '../../../Subject/Subject.js';

import TaskForm from './TaskForm.js';
import LocalStorage from '../../../State/LocalStorage.js';

const Tasks = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('tasks-root');

        appendTaskCards(root);

        return root;
    };

    const createTaskCard = (task) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.dataset.taskListId = todo.activeItem.id;
        taskCard.dataset.taskId = task.id;
        taskCard.dataset.priority = task.priority;
        taskCard.onclick = (event) => openTaskCard(event);

        const checkboxCol = document.createElement('div');
        checkboxCol.classList.add('checkbox-col');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task-check-box';
        checkbox.checked = task.isComplete;
        checkbox.onchange = (event) => markComplete(event);

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
        taskListTitle.textContent = todo.activeItem.title;

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;

        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = format(task.deadline, 'dd-MMM-yyyy');

        const taskDescription = document.createElement('p');
        taskDescription.id = 'task-description';
        taskDescription.textContent = task.description;

        const editButton = document.createElement('button');
        editButton.classList.add('task-button');
        editButton.id = 'edit-task-button';
        editButton.onclick = (event) => editTask(event);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-button');
        deleteButton.id = 'delete-task-button';
        deleteButton.onclick = (event) => deleteTask(event);

        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-pen-to-square');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');

        editButton.appendChild(editIcon);
        deleteButton.appendChild(deleteIcon);

        checkboxCol.appendChild(checkbox);

        taskListRow.appendChild(taskListTitle);
        taskRow.append(taskTitle, taskDeadline);
        buttonRow.append(editButton, deleteButton);

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

    const editTask = (event) => {
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const task = todo.activeItem.getItem(taskId);
        TaskForm.fillFields(task);
        TaskForm.setTaskId(taskId);
        TaskForm.toggleVisibility();
    };

    const deleteTask = (event) => {
        const taskId = event.target.closest('.task-card').dataset.taskId;
        todo.activeItem.removeItem(taskId);
        LocalStorage.saveToStorage('todo', todo)
        Subject.notify();
    };

    const markComplete = (event) => {
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const task = todo.activeItem.getItem(taskId);
        task.toggleIsComplete();
        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();
    };

    const update = () => {
        const root = document.querySelector('.tasks-root');
        root.innerHTML = '';

        appendTaskCards(root);
    };

    const appendTaskCards = (container) => {
        let tasks = todo.activeItem.list;
        tasks = handleFilter(tasks);
        tasks = handleSort(tasks);
        
        tasks.forEach(task => {
            let taskCard = createTaskCard(task);
            container.appendChild(taskCard);
        })
    };

    const handleFilter = (list) => {
        const filterConfig = todo.filterConfig;

        for (let filter in filterConfig) {
            if (filterConfig[filter]) {
                let appliedFilterConfig = { filterParam: filter, filterValue: filterConfig[filter] };
                list = todo.activeItem.filterList(list, appliedFilterConfig);
            }
        }

        return list;
    };

    const handleSort = (list) => {
        const sortConfig = todo.sortConfig;

        if (sortConfig.sortParam) {
            list = todo.activeItem.sortList(list, sortConfig);
        }

        return list;
    };

    return { create, update };
})();

Subject.subscribe(Tasks.update);

export default Tasks;