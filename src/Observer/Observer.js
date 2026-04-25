const Observer = (() => {
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn);
    }

    const unsubscribe = (fn) => listeners = listeners.filter(listener => listener !== fn);

    const notify = (data) => {
        listeners.forEach(fn => fn(data));
    };

    return { subscribe, notify };

})();

export default Observer;