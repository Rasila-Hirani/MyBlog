import CommentActionTypes from './comment.types';
import { firestore,addUserComment } from '../../firebase/firebase';

const addComment =(comment)=>({
    type:CommentActionTypes.ADD_COMMENT,
    payload:comment
});

export const startAddComment =(comment)=>{
    return (dispatch,getState)=>{
      
        const ref =addUserComment(comment);
        dispatch(addComment({
            id:ref,
            ...comment
        }))
    }
}
const fetchCommentSucess =(comments)=>({
    type:CommentActionTypes.FETCH_COMMENT,
    payload:comments
})
const setComment =(comments)=>({
    type:CommentActionTypes.SET_COMMENT,
    payload:comments
})
export const setComments =(comments)=>{
    return (dispatch)=>{
        dispatch(setComment(comments))
    }
}
export const startFetchComment =()=>{
   
    return (dispatch)=>{
        const commentRef = firestore.collection('comments');
        commentRef.get().then((snapShot)=>{
            const commentMap =snapShot.docs.map((doc)=>{
                return {
                  id:doc.id,
                  ...doc.data()
                }
              })
            dispatch(fetchCommentSucess(commentMap))
        })
    }
}
const removeComment =(id)=>({
    type:CommentActionTypes.REMOVE_COMMENT,
    id
})
export const startRemoveComment =({id}={})=>{

    return(dispatch)=>{
        const commentRef= firestore.collection('comments').doc(`${id}`);
        commentRef.delete().then(()=>{
            
            dispatch(removeComment(id))
        }).catch((error) => {
            console.error("Error removing comment: ", error);
        });
    }
}
