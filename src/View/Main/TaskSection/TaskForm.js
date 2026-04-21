const TaskForm = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-form-root');

        const form = document.createElement('form');
        form.classList.add('task-form', 'hidden');

        const button = document.createElement('button');
        button.id = 'create-task-button';
        button.textContent = 'Create';
        button.onclick = (event) => {
            event.preventDefault();
            hideTaskForm(form);
            todo.activeItem.createItem({title: 'task'});
            console.log(todo.activeItem.list);
        };

        form.append(button);

        return form;
    };

    const hideTaskForm = (taskForm) => {
        taskForm.classList.toggle('hidden');
    };

    return { create };
})();

export default TaskForm;