import database from '../firebase/firebase';

export const addBookmark = (bookmark) =>({
    type:'ADD_BOOKMARK',
    bookmark
})
export const startAddBookmark =(blogID='')=>{
    return (dispatch,getState)=>{
        const uid =getState().auth.uid;
        return database.ref(`users/${uid}/bookmarks`).push(blogID).then((ref)=>{      
             dispatch(addBookmark({
                id:ref.key,
                blogID
            }));
        });
    }
}
export const removeBookmark =({id}={}) =>({
    type:'REMOVE_BOOKMARK',
    id
});

export const startRemoveBookmark =(id) =>{
    return(dispatch,getState) =>{
        const uid =getState().auth.uid;
        return database.ref(`users/${uid}/bookmarks/${id}`).remove().then(()=>{
            dispatch(removeBookmark({id}));
        });
    }
}