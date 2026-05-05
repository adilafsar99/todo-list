import './TaskListSection.css';

import Heading from './Heading.js';
import CreateTaskListForm from './CreateTaskListForm.js';
import TaskLists from './TaskLists.js';

const TaskListSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('section-root', 'task-list-section-root', 'sidebar');

        const heading = Heading.create();
        const createTaskListForm = CreateTaskListForm.create();
        const taskLists = TaskLists.create();

        root.append(heading, createTaskListForm, taskLists);

        return root;
    };

    return {create};
})();

export default TaskListSection;