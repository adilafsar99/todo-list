import './TaskListSection.css';

import Heading from './Heading.js';
import CreateTaskListForm from './CreateTaskListForm.js';
import TaskList from './TaskList.js';

const TaskListSection = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-list-section-root');

        const heading = Heading.create();
        const createTaskListForm = CreateTaskListForm.create(todo);
        const taskLists = TaskList.create(todo);

        root.append(heading, createTaskListForm, taskLists);

        return root;
    };

    return {create};
})();

export default TaskListSection;