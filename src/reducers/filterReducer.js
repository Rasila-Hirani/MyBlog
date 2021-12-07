

const filterReducerDefaultState ={
    text:'',
    searchBy:'title'
}
export default (state = filterReducerDefaultState,filter)=>{
   
    switch(filter.type){ 
        case 'SET_TEXT_FILTER':
            return{
                ...state,
                text:filter.text
            }    
        case 'SEARCH_BY_TITLE':
            return{
                ...state,               
                searchBy:'title'
            }
        case 'SEARCH_BY_AUTHOR':
            return{
                ...state,               
                searchBy:'author'
            }
        default:
            return state;
    }
}