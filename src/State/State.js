import createTodo from './Todo.js';

const State = (() => {
    const state = createTodo({});
    state.createItem({title: 'General'});
    state.setActiveItem();

    return state;
})();

export default State;