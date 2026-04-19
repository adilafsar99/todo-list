import Header from '../../Header/Header.js'; 

const TaskListForm = (() => {
    const create = (createTaskListFormButton, todo) => {
        const root = document.createElement('div');
        root.classList.add('task-list-form-root', 'hidden');

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');

        const input = document.createElement('input');
        input.id = 'task-list-input';
        input.placeholder = 'Title';
        input.maxLength = 20;
        input.required;

        const button = document.createElement('button');
        button.id = 'task-list-button';
        button.textContent = 'x';
        button.onclick = () => cancel(root, createTaskListFormButton, input);

        input.oninput = () => {
            if (!input.value) {
                button.textContent = 'x';
                button.onclick = () => cancel(root, createTaskListFormButton, input);
            }
            else {
                button.textContent = '✓';
                button.onclick = () => createTaskList(root, createTaskListFormButton, input, todo, button);
            };
        };

        inputRow.append(input, button);

        root.append(inputRow);

        return root;
    };

    const createTaskList = (root, createTaskListFormButton, input, todo, button) => {
        root.classList.toggle('hidden');
        createTaskListFormButton.classList.toggle('hidden');
        const inputObj = { title: input.value };
        const taskList = todo.createItem(inputObj);
        console.log(taskList)
        todo.setActiveItem(taskList.id);
        Header.ActiveTaskList.update(todo.activeItem);
        input.value = '';
        button.textContent = 'x';
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