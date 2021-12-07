import CommentActionTypes from './comment.types';
const INITIAL_STATE=[];

const commentReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case CommentActionTypes.ADD_COMMENT:
            return [...state,action.payload]
        case CommentActionTypes.REMOVE_COMMENT:
            return state.filter(({id}) =>id !== action.id)
        case CommentActionTypes.FETCH_COMMENT:
            return action.payload
        case CommentActionTypes.SET_COMMENT:
            return action.payload
        default:
            return state;

    }

}
export default commentReducer;