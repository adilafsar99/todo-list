const attachAccessors = (todoItem) => {
    Object.keys(todoItem).forEach(key => {
        let value = todoItem[key];
        Object.defineProperty(todoItem, key, {
            get: () => value,
            set: (newValue) => value = newValue,
            enumerable: true,
        })
    })
};

export default attachAccessors;