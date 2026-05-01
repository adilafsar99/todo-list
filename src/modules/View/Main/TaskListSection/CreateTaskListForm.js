import TaskListForm from "./TaskListForm.js";

const CreateTaskListForm = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('create-task-list-form-root');

        const button = document.createElement('button');
        button.id = 'create-task-list-form-button';
        button.textContent = 'New Task List';
        button.onclick = () => {
            button.classList.toggle('hidden');
            taskListForm.classList.toggle('hidden');
        };

        const taskListForm = TaskListForm.create(button);
        
        root.append(button, taskListForm);

        return root;
    };

    return {create};
})();

export default CreateTaskListForm;