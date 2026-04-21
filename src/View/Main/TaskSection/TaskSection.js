import './TaskSection.css';

import Heading from './Heading.js';
import CreateTaskForm from './CreateTaskForm.js';

const TaskSection = (() => {
    const create = (todo) => {
        const root = document.createElement('div');
        root.classList.add('task-section-root');

        const heading = Heading.create();
        const createTaskForm = CreateTaskForm.create(todo);

        root.append(heading, createTaskForm);

        return root;
    };

    return { create };
})();

export default TaskSection;