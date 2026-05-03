const Subject = (() => {   
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn);
    }

    //const unsubscribe = (fn) => listeners = listeners.filter(listener => listener !== fn);

    const notify = () => {
        listeners.forEach(listener => {
            listener();
        });
    };

    return { subscribe, notify };

})();

export default Subject;