import TaskForm from './TaskForm.js';

const CreateTaskForm = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('create-task-form-root');

        const button = document.createElement('button');
        button.id = 'create-task-form-button';
        button.textContent = 'New Task';
        button.onclick = () => showTaskForm(taskForm);

        const taskForm = TaskForm.create(todo);

        root.append(button, taskForm);

        return root;
    };

    const showTaskForm = (taskForm) => {
        taskForm.classList.toggle('hidden');
    }

    return { create };
})();

export default CreateTaskForm;