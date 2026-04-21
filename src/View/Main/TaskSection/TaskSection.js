import './TaskSection.css';

import Heading from './Heading.js';

const TaskSection = (() => {
    const create = () => {
        const root = document.createElement('div');
        root.classList.add('task-section-root');

        const heading = Heading.create();

        root.append(heading);

        return root;
    };

    return { create };
})();

export default TaskSection;