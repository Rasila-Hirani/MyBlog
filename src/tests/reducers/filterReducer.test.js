
import filterReducer from '../../reducers/filterReducer';

test('should setup default filter values',()=>{
    const state = filterReducer(undefined,{type:'@@INIT'})
    expect(state).toEqual({
        title:'',
        searchBy:'title'
    });
});

test('should set serach by title',()=>{
    const state = filterReducer(undefined,{type:'SEARCH_BY_TITLE'});
    expect(state.searchBy).toEqual('title')
});

test('should set serach by author',()=>{
    const state = filterReducer(undefined,{type:'SEARCH_BY_AUTHOR'});
    expect(state.searchBy).toEqual('author')
})