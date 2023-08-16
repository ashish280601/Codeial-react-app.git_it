import { API_URLS, getFormBody, localStorage_Token_Key } from '../utils';
//  here we making the api functions
//  fetch is common in every function so we are making it common, here in config object we taking body also for login case to take the id pass and for rest we are using spread operator

const customFetch = async (url, { body, ...customConfig }) => {
  //  here we getting the token
  const token = window.localStorage.getItem(localStorage_Token_Key);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  // putting token in headers if exist in local storage
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // console.log("token",token);
  // putting everything we getting from config object into this config object
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // now checking if body exist
  if (body) {
    config.body = getFormBody(body);
  }
  // we make this try catch code common in order to reduce the lines of codes
  try {
    // here we providing the url and related config like what method are we passing
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    // console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};


export const getPosts = (page = 1, limit = 12) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};


export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword }
  }); 
};


export const fetchUserProfile= (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};  


export const fetchUserFreinds= () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};  

export const addFriend= (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend= (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost= (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body:{
      content,
    }
  });
};

export const createComment= async(content,postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body:{
      post_id:postId,
      content,
    }
  });
};  


export const toggleLike= (itemId,itemType) => {
  return customFetch(API_URLS.toggleLike(itemType,itemId), {
    method: 'POST',
  });
};

export const searchUsers= (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
  });
};