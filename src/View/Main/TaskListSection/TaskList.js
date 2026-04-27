import todo from './../../../State/State.js';
import Subject from '../../../Subject/Subject.js';

const TaskLists = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-lists-root');

        todo.list.forEach(taskList => {
            let taskListForm = createTaskListForm(taskList);
            root.appendChild(taskListForm);
        });

        return root;
    };

    const createTaskListForm = (taskList) => {
        const form = document.createElement('div');
        form.classList.add('task-list');
        form.dataset.id = taskList.id;

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');

        const input = document.createElement('input');
        input.classList.add('task-list-input');
        input.name = 'title-input';
        input.value = taskList.title;
        input.maxLength = 20;
        input.readOnly = true;

        // Change active task list
        input.onclick = (event) => {
            if (input.readOnly) {
                const id = event.target.closest('.task-list').dataset.id;
                if (todo.activeItem.id === id) {
                    return;
                }
                todo.setActiveItem(id);
                Subject.notify(todo);
            }
        };

        // Change the editButton icon based on the value of the title input
        input.oninput = () => {
            if (!input.value) {
                editButton.innerHTML = xIcon.outerHTML;
                editButton.onclick = '';
            }
            else {
                editButton.innerHTML = checkIcon.outerHTML;
                editButton.onclick = (event) => updateTaskList(event, input, editButton, editIcon, checkIcon);
            }
        };

        const editButton = document.createElement('button');
        editButton.classList.add('task-list-button');
        editButton.id = 'edit-button';
        editButton.onclick = () => enableInput(input, editButton, editIcon, checkIcon);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-list-button');
        deleteButton.id = 'delete-button';
        deleteButton.onclick = (event) => {
            const id = event.target.closest('.task-list').dataset.id;
            deleteTaskList(id);
        };

        const xIcon = document.createElement('i');
        xIcon.classList.add('fa-solid', 'fa-x');

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pen-to-square');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash');

        editButton.appendChild(editIcon);
        deleteButton.appendChild(deleteIcon);

        if (taskList.title === 'General') {
            inputRow.appendChild(input);
        } else {
            inputRow.append(input, editButton, deleteButton);
        }

        form.append(inputRow);

        return form;
    };

    const enableInput = (input, editButton, editIcon, checkIcon) => {
        input.readOnly = false;
        editButton.innerHTML = checkIcon.outerHTML;
        editButton.onclick = (event) => updateTaskList(event, input, editButton, editIcon, checkIcon);
    };

    const updateTaskList = (event, input, editButton, editIcon, checkIcon) => {
        const taskListId = event.target.closest('.task-list').dataset.id;
        const state = { title: input.value };
        input.readOnly = true;
        editButton.innerHTML = editIcon.outerHTML;
        editButton.onclick = () => enableInput(input, editButton, checkIcon);
        const taskList = todo.updateItem(taskListId, state);
        if (todo.activeItem.id === taskList.id) {
            Subject.notify(todo);
        }
    };

    const update = () => {
        const root = document.querySelector('.task-lists-root');
        root.innerHTML = '';

        todo.list.forEach(taskList => {
            let taskListForm = createTaskListForm(taskList);
            root.appendChild(taskListForm);
        });
    };

    const deleteTaskList = (id) => {
        const activeItem = todo.activeItem;
        const taskList = todo.removeItem(id);
        if (activeItem === taskList) {
            todo.setActiveItem();
        }
        Subject.notify(todo);
    };

    return { create, update };
})();

Subject.subscribe(TaskLists.update);

export default TaskLists;