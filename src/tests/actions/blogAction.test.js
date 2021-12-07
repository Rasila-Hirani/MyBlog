
import {addBlog,removeBlog,editBlog} from '../../actions/blogAction';

test('should setup remove blog action object',()=>{
    const action=removeBlog({id:'123abc'});
    expect(action).toEqual({
        type:'REMOVE_BLOG',
        id:'123abc'
    });
});

test('should setup edit blog action object',()=>{
    const action =  editBlog('123abc',{title:'new title'});
    expect(action).toEqual({
        type:'EDIT_BLOG',
        id:'123abc',
        updates:{
            title:'new title'
        }
    })
});

test('should setup add blog action object with provided values',()=>{
    const blogData ={
        title:'New title',
        body:'body Text',
        createdAt:1000,
        author:'user',
        id:'123abc'
    }
    const action = addBlog(blogData)
    expect(action).toEqual({
        type:'ADD_BLOG',
        blog:{
            ...blogData
        }
    })
})

