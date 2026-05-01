import createTodo from './Todo.js';
import recreateTodo from './RecreateTodo.js'
import LocalStorage from './LocalStorage.js';

const State = (() => {
    const todoObj = LocalStorage.getFromStorage('todo');
    const state = todoObj ? recreateTodo(todoObj) : createTodo({});
    if (!state.list.length) {
        state.createItem({ title: 'General' });
        state.setActiveItem();
        LocalStorage.saveToStorage(state);
    }

    return state;
})();

export default State;