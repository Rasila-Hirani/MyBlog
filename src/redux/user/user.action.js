import  UserActionTypes  from "./user.types";
import {auth, googleAuthProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase';
import setError from '../../selectors/error';
import { clearBookmarks,fetchBookmarkByUserID } from "../bookmark/bookmark.action";

 const getSnapshotFromUserAuth =(userAuth, additionalData)=>{
    return async(dispatch) =>{
        try{
            const userRef =await createUserProfileDocument(userAuth, additionalData);
            const userSnapshot =await userRef.get();
            dispatch(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}))
            dispatch(fetchBookmarkByUserID())
        }catch(error){
            dispatch(signInFailure(setError(error)))
        }
    }
}

export const isUserAuthenticated=()=> {
    return async(dispatch)=>{
     
        try{
            const userAuth = await getCurrentUser();
            if (!userAuth) return;
            dispatch(getSnapshotFromUserAuth(userAuth))
        }catch(error){
            dispatch(signInFailure(setError(error)))
        }
    }
    
}


export const startGoogleLogin=()=>{
   return async(dispatch) =>{
        try{
            const {user} =await auth.signInWithPopup(googleAuthProvider);
             dispatch( getSnapshotFromUserAuth(user))
        }catch(error){
            dispatch(signInFailure(setError(error)))
        }
    }
}

 const signInSuccess =(user)=>({
    type:UserActionTypes.SIGN_IN_SUCCESS,
    payload:user
});

 const signInFailure = (error) =>({
    type:UserActionTypes.SIGN_IN_FAILURE,
    payload:error
});

export const signInWithEmail=({email,password})=>{
  
    return async(dispatch)=>{
        try{
            const {user} = await auth.signInWithEmailAndPassword(email,password);
           
            dispatch(getSnapshotFromUserAuth(user))
            
        }catch(error){
           
            dispatch(signOutFailure(setError(error)))
        }
    }
}


 const signOutSuccess = () =>({
    type:UserActionTypes.SIGN_OUT_SUCCESS
});
 const signOutFailure = (error) =>({
    type:UserActionTypes.SIGN_OUT_FAILURE,
    payload:error
});
export const signOutStart=()=>{
    return async dispatch =>{
        try{
            await auth.signOut();
            dispatch(signOutSuccess());
            dispatch(clearBookmarks());
        }catch(error){
            dispatch(signOutFailure(setError(error)))
        }
    }
}
const signInAfterSignUp=({user,additionalData})=>{
    return dispatch =>{
        dispatch(getSnapshotFromUserAuth(user,additionalData))
    }
    
}
export const signUpStart =( { email, password, displayName })=>{
    return async(dispatch)=>{
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            dispatch(signUpSucess({user,additionalData:{displayName}}))
            dispatch(signInAfterSignUp({user,additionalData:{displayName}}))
        }catch(error){
            dispatch(signUpFailure(setError(error)))
        }
    }
};
export const signUpSucess =({user,additionalData})=>({
    type:UserActionTypes.SIGN_UP_SUCCESS,
    payload:{user,additionalData}
});
export const signUpFailure=(error)=>({
    type:UserActionTypes.SIGN_UP_FAILURE,
    payload:error
})



