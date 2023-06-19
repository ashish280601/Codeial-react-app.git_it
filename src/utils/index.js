export * from './constants';
export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Can not store in Local Storage');
    }

    const valueToStore = typeof value ===! 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not get the value from Local Storage');
    }

    localStorage.getItemItem(key);
};

export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not get the value from Local Storage');
    }

    localStorage.removeItemItem(key);
};

export const getFormBody = (params) => {
    let formBody =[];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]);  // ashish 123 => ashish%2020123

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');  // 'username=ashish&password=123213'
};