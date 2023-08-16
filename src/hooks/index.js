import { useContext, useEffect, useState } from 'react';
import { AuthContext, PostContext } from '../providers';
import {
  editProfile,
  fetchUserFreinds,
  getPosts,
  register,
  login as userLogin,
} from '../api';
import {
  setItemInLocalStorage,
  localStorage_Token_Key,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // here in useEffect we get the token and decode it
  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(localStorage_Token_Key);
      // console.log("userererer", userToken);

      if (userToken) {
        const user = jwt(userToken);
        // adding feinds array and saving it in user state so we can get the freind array initially after tge refresh of the page
        const response = await fetchUserFreinds();
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        } else {
          friends = [];
        }
        setUser({ ...user, friends });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  // console.log('Auth', user);
  //Login FUnctionality
  const login = async (email, password) => {
    const res = await userLogin(email, password);
    if (res.success) {
      // setting the user after success
      setUser(res.data.user);
      // also setting user to the local storage
      setItemInLocalStorage(
        localStorage_Token_Key,
        res.data.token ? res.data.token : 'null'
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  // signup functionality
  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  // Updating functionality
  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        localStorage_Token_Key,
        response.data.token ? response.data.token : 'null'
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  //UPdating User Freinds
  const updateUserFriends = (addFriend, friend) => {
    if (addFriend === true) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }
    // console.log("freindddd",friend.to_user.id);
    const newFriends = user.friends?.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({ ...user, friends: newFriends });
  };

  // LogOut Functionality
  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(localStorage_Token_Key);
  };

  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser,
    updateUserFriends,
  };
};

// creating the postProvider
export const usePosts = () => {
  return useContext(PostContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loaidng, setLoading] = useState(true);
  const auth = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // creating the update post functionality
  const addPostToState = (post) => {
    const newpost = [post, ...posts];
    setPosts(newpost);
  };

  const addCommnet = (comment, postId) => {
    const newpost = posts.map((post) => {
      // console.log('postt object',post.likes);
      if (post._id === postId) {
        return { ...post, comments: [comment, ...post.comments] };
      }
      return post;
    });
    setPosts(newpost);
  };

  const ToggleLike = (postId) => {
    let post = posts.filter((post) => {
      return post._id === postId;
    });
    let userFound = post[0].likes.filter((user) => {
      return user === auth.user._id;
    });
    console.log("USER FOUND",userFound);
    console.log("USERrrrrr",auth.user._id);
    let newlikes;
    if (userFound.length <= 0) {
      post[0].likes.push(auth.user._id);
      console.log("ADD LIKESSS",post[0].likes);
    } 
    else{
      newlikes= post[0].likes.filter((post)=>{
        return post !== auth.user._id;
      })
      console.log("post Remove likes",post[0].likes);
      console.log("remove LIKESSS",newlikes);
    }
  };

  return {
    data: posts,
    loaidng,
    addPostToState,
    addCommnet,
    ToggleLike,
  };
};