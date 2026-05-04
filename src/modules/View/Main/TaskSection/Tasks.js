import { format, isAfter } from 'date-fns';

import todo from '../../../State/State.js';
import LocalStorage from '../../../State/LocalStorage.js';
import Subject from '../../../Subject/Subject.js';

import TaskForm from './TaskForm.js';

const Tasks = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('tasks-root');

        appendTaskCards(root);

        return root;
    };

    const createTaskCard = (task) => {
        const taskCard = document.createElement('button');
        taskCard.classList.add('task-card');
        taskCard.dataset.taskListId = todo.getActiveItem() ? todo.activeId : task.taskListId;;
        taskCard.dataset.taskId = task.id;
        taskCard.dataset.priority = task.priority;
        taskCard.onclick = (event) => openTaskCard(event);

        const checkboxCol = document.createElement('div');
        checkboxCol.classList.add('checkbox-col');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'task-checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.isComplete;
        checkbox.onchange = (event) => toggleComplete(event);

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
        taskListTitle.textContent = todo.getActiveItem() ? todo.getActiveItem().title : task.taskListTitle;

        const taskTitle = document.createElement('p');
        taskTitle.id = 'task-title';
        taskTitle.textContent = task.title;
        if (task.isComplete) {
            taskTitle.classList.add('complete');
        }

        const taskDeadline = document.createElement('p');
        taskDeadline.id = 'task-deadline';
        taskDeadline.textContent = format(task.deadline, 'dd-MMM-yyyy');
        const currentDate = new Date();
        const deadline = new Date(task.deadline);
        if (isAfter(currentDate, deadline)) {
            taskDeadline.classList.add('overdue');
        }

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

        const targetCard = event.target.closest('.task-card');
        const taskCards = document.querySelectorAll('.task-card');
        const targetOpenCardCol = targetCard.children[1].lastChild;
        if (!targetOpenCardCol.classList.contains('hidden')) {
            targetOpenCardCol.classList.add('hidden');
        } else {
            taskCards.forEach(taskCard => {
                taskCard.children[1].lastChild.classList.add('hidden');
            });
            targetOpenCardCol.classList.remove('hidden');
        }
    };

    const appendTaskCards = (container) => {
        let tasks;
        if (todo.activeId === 'all') {
            tasks = [];
            todo.list.forEach(taskList => taskList.list.forEach(task => {
                task['taskListId'] = taskList.id;
                task['taskListTitle'] = taskList.title;
                tasks.push(task);
            }));
        } else {
            tasks = todo.getActiveItem().list;
        }

        tasks = handleFilter(tasks);
        tasks = handleSort(tasks);

        tasks.forEach(task => {
            let taskCard = createTaskCard(task);
            container.appendChild(taskCard);
        })
    };

    const editTask = (event) => {
        const taskListId = event.target.closest('.task-card').dataset.taskListId;
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const taskList = todo.getItem(taskListId);
        const task = taskList.getItem(taskId);
        TaskForm.fillFields(task);
        TaskForm.setIds(taskListId, taskId);
        TaskForm.toggleVisibility();
    };

    const deleteTask = (event) => {
        const taskListId = event.target.closest('.task-card').dataset.taskListId;
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const taskList = todo.getItem(taskListId);
        taskList.removeItem(taskId);
        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();
    };

    const toggleComplete = (event) => {
        const taskListId = event.target.closest('.task-card').dataset.taskListId;
        const taskId = event.target.closest('.task-card').dataset.taskId;
        const taskList = todo.getItem(taskListId);

        taskList.markItem(taskId);
        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();
    };

    const handleFilter = (list) => {
        const filterConfig = todo.filterConfig;

        for (let filter in filterConfig) {
            if (filterConfig[filter]) {
                let appliedFilterConfig = { filterParam: filter, filterValue: filterConfig[filter] };
                list = todo.filterList(list, appliedFilterConfig);
            }
        }

        return list;
    };

    const handleSort = (list) => {
        const sortConfig = todo.sortConfig;

        if (sortConfig.sortParam) {
            list = todo.sortList(list, sortConfig);
        }

        return list;
    };

    const update = () => {
        const root = document.querySelector('.tasks-root');
        root.innerHTML = '';

        appendTaskCards(root);
    };

    return { create, update };
})();

Subject.subscribe(Tasks.update);

export default Tasks;