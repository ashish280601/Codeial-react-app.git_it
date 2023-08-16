import {createContext} from 'react';
import { useProvideAuth } from '../hooks';
const initialState={
    user:null,
    login:()=>{},
    logout:()=>{},
    loading:true,
    signup:()=>{},
    updateUser:()=>{},
    updateUserFriends:()=>{}

}
export const AuthContext=createContext(initialState);

export const AuthProvider= ({children})=>{
    // this state below is an object managed by another custom hook called useProvideAuth
     const auth=useProvideAuth();
      
    //  and here below this auth state is available to all children
   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}