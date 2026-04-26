import Subject from '../../../Subject/Subject.js';
import todo from './../../../State/Todo.js'

const TaskForm = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-form-root');
        root.onclick = (event) =>{
            if (!event.target.classList.contains('task-form-root')) {
                return;
            }
            clearFields();
            toggleVisibility();
        };

        const form = document.createElement('form');
        form.classList.add('task-form');

        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row', 'title-row');

        const titleLabel = document.createElement('label');
        titleLabel.for = 'title-input';
        titleLabel.textContent = 'Title';

        const titleInput = document.createElement('input');
        titleInput.classList.add('task-input');
        titleInput.id = 'title-input';
        titleInput.maxLength = 12;
        titleInput.required = true;

        const multiInputRow = document.createElement('div');
        multiInputRow.classList.add('multi-input-row');

        const priorityRow = document.createElement('div');
        priorityRow.classList.add('form-row');

        const priorityLabel = document.createElement('label');
        priorityLabel.for = 'priority-input';
        priorityLabel.textContent = 'Priority';

        const priorityInput = document.createElement('select');
        priorityInput.classList.add('task-input');
        priorityInput.id = 'priority-input';
        priorityInput.required = true;

        const priorityLow = document.createElement('option');
        priorityLow.textContent = 'Low';
        priorityLow.value = 'low';

        const priorityMedium = document.createElement('option');
        priorityMedium.textContent = 'Medium';
        priorityMedium.value = 'medium';

        const priorityHigh = document.createElement('option');
        priorityHigh.textContent = 'High';
        priorityHigh.value = 'high';

        priorityInput.append(priorityLow, priorityMedium, priorityHigh);

        const deadlineRow = document.createElement('div');
        deadlineRow.classList.add('form-row');

        const deadlineLabel = document.createElement('label');
        deadlineLabel.for = 'deadline-input';
        deadlineLabel.textContent = 'Deadline';

        const deadlineInput = document.createElement('input');
        deadlineInput.type = 'date';
        deadlineInput.classList.add('task-input');
        deadlineInput.id = 'deadline-input';
        deadlineInput.required = true;

        const descriptionRow = document.createElement('div');
        descriptionRow.classList.add('form-row');

        const descriptionLabel = document.createElement('label');
        descriptionLabel.for = 'description-input';
        descriptionLabel.textContent = 'Description';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.classList.add('task-input');
        descriptionInput.id = 'description-input';
        descriptionInput.rows = 5;
        descriptionInput.maxLength = 50;
        descriptionInput.required = true;

        const taskListRow = document.createElement('div');
        taskListRow.classList.add('form-row');

        const taskListLabel = document.createElement('label');
        taskListLabel.for = 'task-list-input';
        taskListLabel.textContent = 'Task List';

        const taskListInput = document.createElement('select');
        taskListInput.classList.add('task-input');
        taskListInput.id = 'task-list-input';

        todo.list.forEach(taskList => {
            const taskListOption = document.createElement('option');
            taskListOption.textContent = taskList.title;
            taskListOption.value = taskList.id;
            taskListInput.appendChild(taskListOption);
        });

        const button = document.createElement('button');
        button.id = 'create-task-button';
        button.textContent = 'Create';
        button.onclick = (event) => createTask(event, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput);

        titleRow.append(titleLabel, titleInput);
        priorityRow.append(priorityLabel, priorityInput);
        deadlineRow.append(deadlineLabel, deadlineInput);
        descriptionRow.append(descriptionLabel, descriptionInput);
        taskListRow.append(taskListLabel, taskListInput);

        multiInputRow.append(priorityRow, deadlineRow);

        form.append(titleRow, multiInputRow, descriptionRow, taskListRow, button);

        root.append(form)

        return root;
    };

    const toggleVisibility = () => {
        const taskFormRoot = document.querySelector('.task-form-root');
        if (taskFormRoot.style.display === 'flex') {
            taskFormRoot.style.display = 'none';
        } else {
            taskFormRoot.style.display = 'flex';
        }
    };

    const clearFields = () => {
        const taskForm = document.querySelector('.task-form');
        taskForm.reset()
    };

    const createTask = (event, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput) => {
        event.preventDefault();
        toggleVisibility();

        const title = titleInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        const description = descriptionInput.value;
        const taskList = todo.getItem(taskListInput.value);

        taskList.createItem({ title, priority, deadline, description, taskList });

        clearFields();
        Subject.notify(todo);
    };

    const updateTask = (event, taskId, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput, button) => {
        console.log('Update')
        event.preventDefault();
        toggleVisibility();
        taskListInput.classList.remove('hidden');
        button.textContent = 'Create';
        button.onclick = (event) => createTask(event, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput);

        const title = titleInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        const description = descriptionInput.value;
        const taskListId = taskListInput.value;

        const taskList = todo.getItem(taskListInput.value);

        taskList.updateItem(taskId, { title, priority, deadline, description, taskListId });

        clearFields();
        Subject.notify(todo);
    };

    const fillFields = (taskId, task) => {
        const taskForm = document.querySelector('.task-form');
        const [titleInput,
            priorityInput,
            deadlineInput,
            descriptionInput,
            taskListInput,
            button] = Array.from(taskForm.elements);
        titleInput.value = task.title;
        priorityInput.value = task.priority;
        deadlineInput.value = task.deadline;
        descriptionInput.value = task.description

        taskListInput.classList.add('hidden');

        button.textContent = 'Update';
        button.onclick = (event) => updateTask(event, taskId, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput, button);
    };

    const update = () => {
        const taskListInput = document.querySelector('#task-list-input');
        taskListInput.innerHTML = '';
        todo.list.forEach(taskList => {
            const taskListOption = document.createElement('option');
            taskListOption.textContent = taskList.title;
            taskListOption.value = taskList.id;
            taskListInput.appendChild(taskListOption);
        });
    };

    return { create, update, fillFields, toggleVisibility };
})();

Subject.subscribe(TaskForm.update);

export default TaskForm;