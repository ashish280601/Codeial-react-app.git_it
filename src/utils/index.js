export * from './constants';
// this will automatically export the functions like an object {}

// Helper Functions for setting items in local storage  
export const setItemInLocalStorage = (key,value) => {
  if (!key || !value) {
    console.error('Cannot store in local storage');
    return;
  }
  else{
    const valueToStore=typeof value !== "string" ? JSON.stringify(value):value;
    localStorage.setItem(key,valueToStore);
  }
};

// Helper Functions for Getting items in local storage
export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get the value from local storage');
    return;
  }
  else{
   return localStorage.getItem(key);
  }
};
// Helper Functions for removing items in local storage
export const removeItemFromLocalStorage = ( key) => {
  if (!key) {
    console.error('Cannot get the value from local storage');
    return;
  }
  else{
   localStorage.removeItem(key);
  }
};

// this function convert body object into form urlencoded format
// export const getFormBody = (params) => {
//   // this params is object
//   let formBody = [];
//   for (let property in params) {
//     let encodedKey = encodeURIComponent(property); //user name => user%20name
//     let encodedValue = encodeURIComponent(params[property]); //yash 123=> yash%2020123
//     formBody.push(encodedKey + '=' + encodedValue);
//   }
//   //{usrename:yash,passowrd:123123} this will be converted into thw below format
//   return formBody.join('&'); //username=yash&password=123213
// };

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};