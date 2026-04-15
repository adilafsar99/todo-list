import TaskList from "./TaskList.js";
import './Todo.css';

const Todo = class {
    constructor(tasklistArray = [], activeItem) {
        this.tasklistArray = tasklistArray;
        this.activeItem = activeItem;
    }

    get tasklistArray() {
        return this._tasklistArray;
    }

    set tasklistArray(newArray) {
        this._tasklistArray = newArray;
    }

    getActiveItem = () => this.activeItem;

    setActiveItem = (event) => {
        if (!this.activeItem) {
            this.activeItem = this._tasklistArray[0];
        }
        else {
            const targetId = event.target.dataset.id;
            this.activeItem = this.getTask(targetId);
        }
    }

    createTasklist = (fields) => {
        this.tasklist = new Tasklist(...fields);
        this._tasklistArray.push(this.tasklist);
        return this.tasklist;
    }

    deleteTasklist = (id) => this._tasklistArray = this._tasklistArray.filter(item => item._id !== id);

    getTasklist = (id) => this._tasklistArray.find(item => item._id === id);

    updateTasklist = (id, fields) => {
        this.tasklist = this.getItem(id);
        this.tasklist._title = fields.title;
    }
};

const todo = new Todo();
//console.log(todo.createTasklist())

const renderActiveTaskListName = (header) => {
    const activeTaskList = document.createElement('div');
    activeTaskList.classList.add('active-task-list');

    const activeTaskListName = document.createElement('p');
    activeTaskListName.id = 'task-list-name';
    const activeTaskListNameContent = Todo.getList().length === 0 ? '' : Todo.getActiveItem().title;
    activeTaskListName.textContent = activeTaskListNameContent;

    activeTaskList.appendChild(activeTaskListName);

    header.appendChild(activeTaskList);
}

const renderHeader = () => {
    const header = document.querySelector('.header');

    const title = document.createElement('div');
    title.classList.add('title');

    const titleText = document.createElement('p');
    titleText.id = 'title-text';
    titleText.textContent = '<ToDo>';

    title.appendChild(titleText);
    renderActiveTaskListName(header);
    header.appendChild(title);
}



const renderTaskLists = (taskListsContainer) => {
    taskListsContainer.innerHTML = '';

    Todo.getList().forEach(item => {
        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        taskList.dataset.id = item.id;

        const title = document.createElement('div');
        title.classList.add('task-list-title');

        const titleText = document.createElement('p');
        titleText.classList.add('task-list-title-text');
        titleText.textContent = item.title;

        title.appendChild(titleText);
        taskList.appendChild(title);
        taskListsContainer.appendChild(taskList);
    })
}

const renderTaskListsSection = (main) => {
    const section = document.createElement('div');
    section.classList.add('task-list-section');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('create-button');

    const taskListsContainer = document.createElement('div');
    taskListsContainer.classList.add('task-lists-container');

    const button = document.createElement('button');
    button.id = 'create-task-list-button';
    button.textContent = 'Create New Task List';
    button.addEventListener('click', (event) => {
        Todo.createTaskList('PLay', 'low', '2026-12-12', false);
        renderTaskLists(taskListsContainer);
    })

    buttonContainer.appendChild(button);
    section.appendChild(buttonContainer);

    renderTaskLists(taskListsContainer);

    main.append(buttonContainer, taskListsContainer);
}

const renderTasks = (main) => {
    
}

const renderMain = () => {
    const main = document.querySelector('.main');
    renderTaskListsSection(main);
    //renderTasksSection(main);
}

export {Todo, renderHeader, renderMain};