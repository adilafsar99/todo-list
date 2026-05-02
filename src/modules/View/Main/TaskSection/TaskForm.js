import todo from './../../../State/State.js';
import Subject from '../../../Subject/Subject.js';
import LocalStorage from '../../../State/LocalStorage.js';

const TaskForm = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-form-root');
        root.onclick = (event) => {
            if (!event.target.classList.contains('task-form-root')) {
                return;
            }
            resetForm();
            toggleVisibility();
        };

        const form = document.createElement('form');
        form.classList.add('task-form');
        form.onsubmit = (event) => {
            if (form.checkValidity()) {
                event.preventDefault();
            }
            if (event.submitter.textContent === 'Create') {
                createTask(titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput);
            } else {
                const taskId = form.dataset.taskId;
                updateTask(taskId, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput);
            }
        };

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
        descriptionInput.rows = 6;
        descriptionInput.maxLength = 50;

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

        titleLabel.appendChild(titleInput);
        priorityLabel.appendChild(priorityInput);
        deadlineLabel.appendChild(deadlineInput);
        descriptionLabel.appendChild(descriptionInput);
        taskListLabel.appendChild(taskListInput);

        titleRow.appendChild(titleLabel);
        priorityRow.appendChild(priorityLabel);
        deadlineRow.appendChild(deadlineLabel);
        descriptionRow.appendChild(descriptionLabel);
        taskListRow.appendChild(taskListLabel);

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

    const setTaskId = (taskId) => {
        const taskForm = document.querySelector('.task-form');
        taskForm.dataset.taskId = taskId;
    };

    const resetForm = () => {
        const taskForm = document.querySelector('.task-form');
        const [,,,,
            taskListInput,
            button] = getFields(taskForm);
        const taskListLabel = document.querySelector('#task-list-input').parentElement;
        
        setTaskId('');
        taskListLabel.classList.remove('hidden');
        taskListInput.classList.remove('hidden');
        button.textContent = 'Create';
        button.onclick = '';

        taskForm.reset();
    };

    const createTask = (titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput) => {
        toggleVisibility();

        const title = titleInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        const description = descriptionInput.value;
        const taskList = todo.getItem(taskListInput.value);

        taskList.createItem({ title, priority, deadline, description, taskList });
        todo.setActiveItem(taskListInput.value);
        LocalStorage.saveToStorage('todo', todo);

        resetForm();
        Subject.notify(todo);
    };

    const updateTask = (taskId, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput) => {
        toggleVisibility();

        const title = titleInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        const description = descriptionInput.value;
        const taskListId = taskListInput.value;

        const taskList = todo.getItem(taskListInput.value);

        taskList.updateItem(taskId, { title, priority, deadline, description, taskListId });
        LocalStorage.saveToStorage('todo', todo);

        resetForm();
        Subject.notify(todo);
    };

    const getFields = (taskForm) => {
        return Array.from(taskForm.elements);
    }

    const fillFields = (task) => {
        const taskForm = document.querySelector('.task-form');
        const [titleInput,
            priorityInput,
            deadlineInput,
            descriptionInput,
            taskListInput,
            button] = getFields(taskForm);

        titleInput.value = task.title;
        priorityInput.value = task.priority;
        deadlineInput.value = task.deadline;
        descriptionInput.value = task.description;
        const taskListLabel = document.querySelector('#task-list-input').previousElementSibling;
        taskListLabel.classList.add('hidden');
        taskListInput.classList.add('hidden');

        button.textContent = 'Update';
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

    return { create, update, fillFields, toggleVisibility, setTaskId };
})();

Subject.subscribe(TaskForm.update);

export default TaskForm;