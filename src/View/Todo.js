import Header from "./Header/Header.js";
import Main from "./Main/Main.js";

import './Todo.css';

const renderApp = () => {
    const header = Header.create();
    const main = Main.create();
    document.body.append(header, main);
    console.log('The app is rendering')
};

export default renderApp;