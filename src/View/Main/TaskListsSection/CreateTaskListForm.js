import TaskListForm from "./TaskListForm.js";

const CreateTaskListForm = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('create-task-list-form-root');

        const button = document.createElement('button');
        const taskListForm = TaskListForm.create(button, todo);

        button.id = 'create-task-list-form-button';
        button.textContent = 'New Task List';
        button.onclick = () => {
            button.classList.toggle('hidden');
            taskListForm.classList.toggle('hidden');
        };
        
        root.append(button, taskListForm);

        return root;
    };

    return {create};
})();

export default CreateTaskListForm;