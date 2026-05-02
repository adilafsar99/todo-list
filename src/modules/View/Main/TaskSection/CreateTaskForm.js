import TaskForm from './TaskForm.js';

const CreateTaskForm = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('create-task-form-root');

        const button = document.createElement('button');
        button.classList.add('create-button');
        button.id = 'create-task-form-button';
        button.textContent = 'New Task';
        button.onclick = () => TaskForm.toggleVisibility();

        const taskForm = TaskForm.create();

        root.append(button, taskForm);

        return root;
    };

    return { create };
})();

export default CreateTaskForm;