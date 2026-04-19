import './TaskListsSection.css';

import Heading from './Heading.js';
import CreateTaskListForm from './CreateTaskListForm.js';

const TaskListsSection = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-lists-section-root');

        const heading = Heading.create();
        const createTaskListForm = CreateTaskListForm.create(todo);

        root.append(heading, createTaskListForm);

        return root;
    };

    return {create};
})();

export default TaskListsSection;