import PostActionTypes from './post.types';
import { firestore,addUserPost,convertPostsSnapshotToMap } from '../../firebase/firebase';

export const addPost = post =>({
    type:PostActionTypes.ADD_POST,
    payload: post
});
export const startAddPost =(post)=>{
    return (dispatch,getState)=>{
        const uid =getState().user.currentUser.id;
        const author=getState().user.currentUser.displayName;
        const ref = addUserPost(post,uid,author); 
     
       dispatch(addPost({
            id:ref,
            ...post,
            author,
            uid,
        }))
       
    }
}
export const editPost =(id,updates)=>({    
    type:PostActionTypes.UPDATE_POST,
    id,
    updates
});
export const startUpdatePost = (id,updates)=>{
    return(dispatch,getState) =>{ 
        const userId =getState().user.currentUser.id;
        const author=getState().user.currentUser.displayName;
        const postRef =  firestore.collection('posts').doc(`${id}`);
        postRef.set({...updates,userId,author})
        dispatch(editPost(id,updates));
      
    }
}
export const removePost = ({id}={}) =>({
    type: PostActionTypes.REMOVE_POST,
    id
});

export const startRemovePost =({id}={})=>{
    return(dispatch) =>{
        const postRef =  firestore.collection('posts').doc(`${id}`);
        postRef.delete().then(() => {
            
            dispatch(removePost({id}))
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

       
    }
}

  

export const fetchPostsSucess = posts => ({
    type: PostActionTypes.FETCH_POSTS_SUCCESS,
    payload: posts
  });

export const fetchPostsStartAsync = () => {
    
    return (dispatch,getState)=>{
        const postRef =firestore.collection('posts');
        postRef.get().then(snapShot =>{
           
            const postsMap =convertPostsSnapshotToMap(snapShot);
            dispatch(fetchPostsSucess(postsMap));
        })
    }
  
  };