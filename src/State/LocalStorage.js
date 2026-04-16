const saveToStorage = (todo) => {
    const todoString = JSON.stringify(todo);
    localStorage.setItem('todo', todoString);
};

const getFromStorage = () => {
    const todoString = localStorage.getItem('todo');
    const todoObj = JSON.parse(todoString);
    return todoObj;
};

export { saveToStorage, getFromStorage };