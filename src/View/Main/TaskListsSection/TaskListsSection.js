import './TaskListsSection.css';

import Heading from './Heading.js';
import CreateTaskListForm from './CreateTaskListForm.js';
import TaskLists from './TaskLists.js';

const TaskListsSection = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-lists-section-root');

        const heading = Heading.create();
        const createTaskListForm = CreateTaskListForm.create(todo);
        const taskLists = TaskLists.create(todo);

        root.append(heading, createTaskListForm, taskLists);

        return root;
    };

    return {create};
})();

export default TaskListsSection;