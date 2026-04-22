const TaskForm = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-form-root');

        const form = document.createElement('form');
        form.classList.add('task-form', 'hidden');
        
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row', 'title-row');

        const titleLabel = document.createElement('label');
        titleLabel.for = 'title-input';
        titleLabel.textContent = 'Title';

        const titleInput = document.createElement('input');
        titleInput.id = 'title-input';
        titleInput.maxLength = 12;
        titleInput.required = true;

        const priorityRow = document.createElement('div');
        priorityRow.classList.add('form-row');
        
        const priorityLabel = document.createElement('label');
        priorityLabel.for = 'priority-input';
        priorityLabel.textContent = 'Priority';

        const priorityInput = document.createElement('select');
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
        console.log(priorityInput)

        const deadlineRow = document.createElement('div');
        deadlineRow.classList.add('form-row');

        const deadlineLabel = document.createElement('label');
        deadlineLabel.for = 'deadline-input';
        deadlineLabel.textContent = 'Deadline';

        const deadlineInput = document.createElement('input');
        deadlineInput.type = 'date';
        deadlineInput.id = 'deadline-input';
        deadlineInput.required = true;
        
        const descriptionRow = document.createElement('div');
        descriptionRow.classList.add('form-row');

        const descriptionLabel = document.createElement('label');
        descriptionLabel.for = 'description-input';
        descriptionLabel.textContent = 'Description';

        const descriptionInput = document.createElement('textarea');
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
        button.onclick = (event) => {
            event.preventDefault();
            toggleVisibility();
            createTask(todo, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput);
            console.log(todo.activeItem);
            clearFields();
        };

        titleRow.append(titleLabel, titleInput);
        priorityRow.append(priorityLabel, priorityInput);
        deadlineRow.append(deadlineLabel, deadlineInput);
        descriptionRow.append(descriptionLabel, descriptionInput);
        taskListRow.append(taskListLabel, taskListInput);

        form.append(titleRow, priorityRow, deadlineRow, descriptionRow, taskListRow, button);

        return form;
    };

    const toggleVisibility = () => {
        const taskForm = document.querySelector('.task-form');
        taskForm.classList.toggle('hidden');
    };

    const clearFields = () => {
        const taskForm = document.querySelector('.task-form');
        taskForm.reset()
    };

    const createTask = (todo, titleInput, priorityInput, deadlineInput, descriptionInput, taskListInput) => {
        const title = titleInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        const description = descriptionInput.value;
        const taskList = todo.getItem(taskListInput.value);

        const task = taskList.createItem({title, priority, deadline, description, taskList});
        console.log(task)
    };

    return { create };
})();

export default TaskForm;