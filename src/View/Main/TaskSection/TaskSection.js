import './TaskSection.css';

import Heading from './Heading.js';
import CreateTaskForm from './CreateTaskForm.js';
import Tasks from './Tasks.js';

const TaskSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-section-root');

        const heading = Heading.create();
        const createTaskForm = CreateTaskForm.create();
        const tasks = Tasks.create();

        root.append(heading, createTaskForm, tasks);

        return root;
    };

    return { create };
})();

export default TaskSection;