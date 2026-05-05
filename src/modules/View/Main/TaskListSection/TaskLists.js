import todo from '../../../State/State.js';
import Subject from '../../../Subject/Subject.js';
import LocalStorage from '../../../State/LocalStorage.js';

const TaskLists = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-lists-root', 'scrollable');

        const button = createShowAllTaskListsButton();

        root.appendChild(button);

        todo.list.forEach(taskList => {
            let taskListForm = createTaskList(taskList);
            root.appendChild(taskListForm);
        });

        return root;
    };

    const createShowAllTaskListsButton = () => {
        const button = document.createElement('button');
        if (!todo.getActiveItem()) {
            button.classList.add('selected');
        }
        button.id = 'select-all-task-lists-button';
        button.textContent = 'Select All';
        button.onclick = (event) => toggleShowAllTaskLists(event);

        return button;
    };

    const toggleShowAllTaskLists = (event) => {
        const button = event.target;

        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            todo.setActiveId();
        } else {
            button.classList.add('selected');
            todo.setActiveId('all');
        }
        
        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();
    }

    const createTaskList = (taskList) => {
        const form = document.createElement('button');
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
                if (todo.activeId === id) {
                    return;
                }
                todo.setActiveId(id);
                LocalStorage.saveToStorage('todo', todo);
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
            input.id = 'general-task-list';
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
        editButton.onclick = () => enableInput(input, editButton, editIcon, checkIcon);

        const taskList = todo.updateItem(taskListId, state);

        LocalStorage.saveToStorage('todo', todo);

        if (todo.activeId === taskList.id) {
            Subject.notify();
        }
    };

    const deleteTaskList = (id) => {
        const activeId = todo.activeId;
        todo.removeItem(id);

        if (activeId === id) {
            todo.setActiveId();
        }

        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();
    };

    const update = () => {
        const root = document.querySelector('.task-lists-root');
        root.innerHTML = '';

        const button = createShowAllTaskListsButton();

        root.appendChild(button);

        todo.list.forEach(taskList => {
            let taskListForm = createTaskList(taskList);
            root.appendChild(taskListForm);
        });
    };

    return { create, update };
})();

Subject.subscribe(TaskLists.update);

export default TaskLists;