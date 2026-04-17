import createTodo from "../State/Todo.js";
import recreateTodo from "../State/RecreateTodo.js";
import { saveToStorage, getFromStorage } from "../State/LocalStorage.js";
import Header from "./Header/Header.js";
import Main from "./Main/Main.js";

import './Todo.css';

const todo = createTodo({});
todo.createItem({title: 'Plain'})
todo.setActiveItem()

const renderApp = () => {
    Header.render(todo);
    Main(Header, todo);
    console.log('The app is rendering')
};

export default renderApp;