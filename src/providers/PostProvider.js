import {createContext} from 'react';
import {useProvidePosts } from '../hooks';
const initialState={
  posts:[],
  loading:true,
  addPostToState:()=>{},
  addCommnet:()=>{},
  ToggleLike:()=>{}
}
export const PostContext=createContext(initialState);

export const PostProvider= ({children})=>{
    // this state below is an object managed by another custom hook called useProvideAuth
     const posts=useProvidePosts();
      
    //  and here below this auth state is available to all children
   return <PostContext.Provider value={posts}>{children}</PostContext.Provider>
}