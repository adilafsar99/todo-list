const saveToStorage = (key, obj) => {
    const objString = JSON.stringify(obj);
    localStorage.setItem(key, objString);
};

const getFromStorage = (key) => {
    const objString = localStorage.getItem(key);
    const object = JSON.parse(objString);
    return object;
};

export default { saveToStorage, getFromStorage };