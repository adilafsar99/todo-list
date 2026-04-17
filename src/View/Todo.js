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
    const header = Header.create(todo);
    console.log(Header)
    document.body.append(header);
    console.log('The app is rendering')
};

export default renderApp;