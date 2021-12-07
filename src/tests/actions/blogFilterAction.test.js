import { TestScheduler } from 'jest';
import {setTitleFilter,searchByAuthor,searchByTitle} from '../../actions/blogFilterAction';

test('should generate set title filter action object with text value',()=>{
    const title='abc';
    const action = setTitleFilter(title);
    expect(action).toEqual({
        type:'SET_TITLE_FILTER',
        title
    })
});

test('should generate set title filter action object with default value',()=>{
    
    const action = setTitleFilter();
    expect(action).toEqual({
        type:'SET_TITLE_FILTER',
        title:''
    })
});

test('should generate action object for search by title',()=>{
    const action = searchByTitle('abc');
    expect(action).toEqual({
        type:'SEARCH_BY_TITLE'
    })
});
test('should generate action object for search by author',()=>{
    const action =searchByAuthor('test');
    expect(action).toEqual({
        type:'SEARCH_BY_AUTHOR'
    })
});