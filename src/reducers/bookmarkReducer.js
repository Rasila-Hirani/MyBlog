const bookmarkDefaultState = [];

export default (state = bookmarkDefaultState, action)=>{
    switch(action.type){
        case 'ADD_BOOKMARK':
            return [
                ...state,
                action.bookmark
            ]
        case 'REMOVE_BOOKMARK':
            return state.filter(({id}) => id !== action.id)
        case 'LIST_BOOKMARK':
            return action.bookmarks 
        default:
            return state
    } 
}