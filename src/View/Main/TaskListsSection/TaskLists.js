import Header from '../../Header/Header.js';

const TaskLists = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-lists-root');

        todo.list.forEach(taskList => {
            let taskListForm = createTaskListForm(todo, taskList);
            root.appendChild(taskListForm);
        });

        return root;
    };

    const createTaskListForm = (todo, taskList) => {
        const form = document.createElement('div');
        form.classList.add('task-list');
        form.dataset.id = taskList.id;

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');

        const input = document.createElement('input');
        input.classList.add('task-list-input');
        input.value = taskList.title;
        input.maxLength = 20;
        input.disabled = true;
        input.oninput = () => {
            if (!input.value) {
                button.innerHTML = xIcon.outerHTML;
                button.onclick = '';
            }
            else {
                button.innerHTML = checkIcon.outerHTML;
                button.onclick = (event) => {
                    input.disabled = true;
                    const id = event.target.closest('.task-list').dataset.id;
                    const state = {title: input.value};
                    updateTitle(todo, id, state);
                };
            }
        };

        const button = document.createElement('button');
        button.classList.add('task-list-button');
        button.onclick = () => {
            input.disabled = false;
            button.innerHTML = checkIcon.outerHTML;
        };

        const xIcon = document.createElement('i');
        xIcon.classList.add('fa-solid', 'fa-x');

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pen-to-square');

        button.appendChild(editIcon);
        inputRow.append(input, button);
        form.append(inputRow);

        return form;
    };


    const update = (todo) => {
        const root = document.querySelector('.task-lists-root');
        root.innerHTML = '';

        todo.list.forEach(taskList => {
            let taskListForm = createTaskListForm(todo, taskList);
            root.appendChild(taskListForm);
        });
    };

    const updateTitle = (todo, id, state) => {
        const taskList = todo.updateItem(id, state);
        if (todo.activeItem.id === taskList.id) {
            Header.ActiveTaskList.update(todo.activeItem);
        }
    };

    return { create, update };
})();

export default TaskLists;