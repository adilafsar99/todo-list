import todo from '../../../State/State.js';
import Subject from '../../../Subject/Subject.js';
import LocalStorage from '../../../State/LocalStorage.js';

const TaskListForm = (() => {
    const create = (createTaskListFormButton) => {
        const root = document.createElement('div');
        root.classList.add('task-list-form-root', 'hidden');

        const form = document.createElement('div');
        form.classList.add('create-task-list-form');

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');
        inputRow.id = 'create-task-list-input-row';

        const input = document.createElement('input');
        input.classList.add('task-list-input');
        input.id = 'create-task-list-input';
        input.name = 'title-input';
        input.placeholder = 'Title';
        input.maxLength = 20;
        input.required = true;
        input.oninput = () => {
            if (!input.value) {
                button.innerHTML = xIcon.outerHTML;
                button.onclick = () => cancel(root, createTaskListFormButton, input);             
            }
            else {
                button.innerHTML = checkIcon.outerHTML;
                button.onclick = () => createTaskList(root, createTaskListFormButton, input, button, xIcon);
            };
        };

        const button = document.createElement('button');
        button.classList.add('task-list-button');
        button.id = 'create-task-list-button';
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

    const createTaskList = (root, createTaskListFormButton, input, button, xIcon) => {
        root.classList.toggle('hidden');
        createTaskListFormButton.classList.toggle('hidden');

        const state = { title: input.value };
        const taskList = todo.createItem(state);

        todo.setActiveId(taskList.id);

        LocalStorage.saveToStorage('todo', todo);
        Subject.notify();

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