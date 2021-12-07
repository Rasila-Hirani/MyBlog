import bookmarkActionTypes from './bookmarkAction.type';

const bookmarkDefaultState = [];

export default (state = bookmarkDefaultState, action)=>{
    switch(action.type){
        case bookmarkActionTypes.ADD_BOOKMARK:
            return [
                ...state,
                action.bookmark
            ]
        case bookmarkActionTypes.REMOVE_BOOKMARK:
            return state.filter(({id}) => id !== action.id)
        case bookmarkActionTypes.LIST_BOOKMARK:
            return action.bookmarks 
        case bookmarkActionTypes.CLEAR_BOOKMARKS:
            return []
        default:
            return state
    } 
}