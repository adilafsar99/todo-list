import TaskListsSection from './TaskListsSection/TaskListsSection.js';

const Main = (() => {
    const create = (todo) => {
        const root = document.createElement('main');
        root.classList.add('main');
        
        const taskListsSection = TaskListsSection.create(todo);
        
        root.append(taskListsSection);

        return root;
    };

    return {create};
})();

const renderTaskListsSection = (main, Header, todo) => {
    const section = document.createElement('div');
    section.classList.add('task-lists-section');
    
    renderSectionHeading(section);
    renderCreateTaskListSection(section, Header, todo);
    

    main.appendChild(section);
};

const renderSectionHeading = (section) => {
    const sectionHeading = document.createElement('p');
    sectionHeading.id = 'section-heading';
    sectionHeading.textContent = 'Task Lists';

    section.appendChild(sectionHeading);
};

const renderCreateTaskListSection = (section, Header, todo) => {
    const createButton = document.createElement('button');
    createButton.id = 'create-button';
    createButton.textContent = 'Create Task List';
    
    section.appendChild(createButton);

    createButton.onclick = () => renderTaskListForm(section, Header, todo);
};

const renderTaskListForm = (section, Header, todo) => {
    const form = document.createElement('div');
    form.classList.add('task-list-form');
    
    const inputRow = document.createElement('div');
    inputRow.classList.add('input-row');

    const input = document.createElement('input');
    input.id = 'task-list-input';
    input.placeholder = 'Title';

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel-button';
    cancelButton.textContent = 'X';
    cancelButton.onclick = () => {
        form.innerHTML = '';
    };

    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirm-button';
    confirmButton.textContent = 'Confirm';
    confirmButton.onclick = () => {
        const inputObj = {title: input.value};
        todo.createItem(inputObj);
        form.innerHTML = '';
        console.log(todo.list)
        Header.updateActiveTaskList(todo);
    };

    inputRow.append(input, cancelButton);
    form.append(inputRow, confirmButton);
    section.append(form);
};

export default Main;