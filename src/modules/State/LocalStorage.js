const saveToStorage = (key, obj) => {
    const objString = JSON.stringify(obj);
    console.log('store', obj)
    localStorage.setItem(key, objString);
};

const getFromStorage = (key) => {
    const objString = localStorage.getItem(key);
    const object = JSON.parse(objString);
    console.log('get', object)
    return object;
};

export default { saveToStorage, getFromStorage };