import './TaskListSection.css';

import Heading from './Heading.js';
import CreateTaskListForm from './CreateTaskListForm.js';
import TaskList from './TaskList.js';

const TaskListSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-list-section-root');

        const heading = Heading.create();
        const createTaskListForm = CreateTaskListForm.create();
        const taskLists = TaskList.create();

        root.append(heading, createTaskListForm, taskLists);

        return root;
    };

    return {create};
})();

export default TaskListSection;