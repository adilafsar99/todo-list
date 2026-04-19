import Header from '../../Header/Header.js';
import TaskLists from './TaskLists.js';

const TaskListForm = (() => {
    const create = (createTaskListFormButton, todo) => {
        const root = document.createElement('div');
        root.classList.add('task-list-root', 'hidden');

        const form = document.createElement('div');
        form.classList.add('task-list');

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');

        const input = document.createElement('input');
        input.classList.add('task-list-input');
        input.placeholder = 'Title';
        input.maxLength = 20;
        input.required;
        input.oninput = () => {
            if (!input.value) {
                button.onclick = () => cancel(root, createTaskListFormButton, input);
                button.innerHTML = xIcon.outerHTML;
            }
            else {
                button.onclick = () => createTaskList(root, createTaskListFormButton, input, todo, button, xIcon);
                button.innerHTML = checkIcon.outerHTML;
            };
        };

        const button = document.createElement('button');
        button.classList.add('task-list-button');
        button.onclick = () => cancel(root, createTaskListFormButton, input);

        const xIcon =  document.createElement('i');
        xIcon.classList.add('fa-solid', 'fa-x');

        const checkIcon =  document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');
        
        button.append(xIcon);
        inputRow.append(input, button);
        form.append(inputRow);
        root.append(form);

        return root;
    };

    const createTaskList = (root, createTaskListFormButton, input, todo, button, xIcon) => {
        root.classList.toggle('hidden');
        createTaskListFormButton.classList.toggle('hidden');
        const inputObj = { title: input.value };
        const taskList = todo.createItem(inputObj);
        console.log(taskList)
        todo.setActiveItem(taskList.id);
        Header.ActiveTaskList.update(todo.activeItem);
        TaskLists.update(todo);
        input.value = '';
        button.innerHTML = xIcon.outerHTML;
        button.onclick = () => cancel(root, createTaskListFormButton, input);
    };

    const cancel = (root, createTaskListFormButton, input) => {
        root.classList.toggle('hidden');
        createTaskListFormButton.classList.toggle('hidden');
        input.value = '';
    };

    return { create };
})();

export default TaskListForm;