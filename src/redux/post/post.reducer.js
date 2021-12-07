
import PostActionTypes from './post.types';

const INITIAL_STATE =[]

const postReducer =(state = INITIAL_STATE,action) =>{
    switch(action.type){
        case PostActionTypes.ADD_POST:
            return[...state,action.payload]
        case PostActionTypes.UPDATE_POST: 
             
            return state.map((post) =>{
                if(post.id === action.id){
                   
                    return {
                        ...post,
                        ...action.updates
                    }
                }else{
                    return post
                }
            })
         case PostActionTypes.REMOVE_POST:
            return state.filter(({id}) =>id !== action.id)
       
        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return action.payload
          
        default:
            return state;
    }
}
export default postReducer;