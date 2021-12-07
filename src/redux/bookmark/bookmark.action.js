import bookmarkActionTypes from './bookmarkAction.type';
import { firestore,addUserBookmark } from '../../firebase/firebase';


export const addBookmark = (bookmark) =>({
    type:bookmarkActionTypes.ADD_BOOKMARK,
    bookmark
})
export const startAddBookmark =(postId)=>{
    return (dispatch,getState)=>{
        const uid =getState().user.currentUser.id;
        const ref = addUserBookmark(postId,uid); 
     
       dispatch(addBookmark({
            id:ref,
            postId
        }))
    }
}
 const removeBookmark =(id) =>({
    type:'REMOVE_BOOKMARK',
    id
});

export const startRemoveBookmark =(id) =>{
    return (dispatch,getState) =>{
        const uid =getState().user.currentUser.id;
        const book_markRef =  firestore.collection('users').doc(`${uid}`).collection('bookmarks').doc(`${id}`);
      
        book_markRef.delete().then(() => {
            dispatch(removeBookmark(id))
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}
const listBookmarks =(bookmarks)=>({
    type:bookmarkActionTypes.LIST_BOOKMARK,
    bookmarks
})
export const fetchBookmarkByUserID =()=>{
    
    return(dispatch,getState) =>{
        const currentUser= getState().user.currentUser;
       if(!currentUser) return;
       const userId=currentUser.id;
        const bookmarks = firestore.collection('users').doc(`${userId}`).collection('bookmarks');
       
        bookmarks.get().then(snapShot =>{
            const user_bookmark =snapShot.docs.map((doc)=>{
                return {
                  id:doc.id,
                  ...doc.data()
                }
        })
     
        dispatch(listBookmarks(user_bookmark));
    })
    }
}
export const clearBookmarks =()=>({
    type:bookmarkActionTypes.CLEAR_BOOKMARKS
})