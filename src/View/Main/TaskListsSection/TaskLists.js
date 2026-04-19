const TaskLists = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-lists-root');

        todo.list.forEach(taskList => {
            let taskListForm = CreateTaskListForm(taskList);
            root.appendChild(taskListForm);
        });

        return root;
    };

    const createTaskListForm = (taskList) => {
        const form = document.createElement('div');
        form.classList.add('task-list');

        const inputRow = document.createElement('div');
        inputRow.classList.add('task-list-input-row');

        const input = document.createElement('input');
        input.classList.add('task-list-input');
        input.value = taskList.title;
        input.maxLength = 20;
        input.disabled;

        const button = document.createElement('button');
        button.classList.add('task-list-button');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-pen-to-square');

        button.appendChild(icon);
        inputRow.append(input, button);
        form.append(inputRow);

        return form;
    };


    const update = (todo) => {
        const root = document.querySelector('.task-lists-root');
        root.innerHTML = '';

        todo.list.forEach(taskList => {
            let taskListForm = createTaskListForm(taskList);
            root.appendChild(taskListForm);
        });
    };

    return { create, update };
})();

export default TaskLists;