export * from './constants';

export const getFormBody = (params) => {
    let formBody =[];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]);  // ashish 123 => ashish%2020123

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');  // 'username=ashish&password=123213'
};