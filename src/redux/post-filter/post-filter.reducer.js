import postFilterTypes from './post-filter.type';
    
const filterReducerDefaultState ={
    text:'',
    searchBy:'title'
}
export default (state = filterReducerDefaultState,filter)=>{
   
    switch(filter.type){ 
        case postFilterTypes.SET_TEXT_FILTER:
            return{
                ...state,
                text:filter.text
            }    
        case postFilterTypes.SEARCH_BY_TITLE:
            return{
                ...state,               
                searchBy:'title'
            }
        case postFilterTypes.SEARCH_BY_AUTHOR:
            return{
                ...state,               
                searchBy:'author'
            }
        default:
            return state;
    }
}