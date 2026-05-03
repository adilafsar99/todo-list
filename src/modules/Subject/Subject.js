const Subject = (() => {   
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn);
    }

    //const unsubscribe = (fn) => listeners = listeners.filter(listener => listener !== fn);

    const notify = (todo) => {
        console.log(todo.activeItem.title)
        listeners.forEach(listener => {
            listener(todo);
        });
    };

    return { subscribe, notify };

})();

export default Subject;