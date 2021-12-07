import { TestScheduler } from 'jest';
import selectBlog from '../../selectors/blog';

const blogs =[{
    author:'rasila hirani',
    body:'test123',
    createdAt:0,
    title:'Title 1',
    uid:'abc'
},
{
    author:'user',
    body:'user123',
    createdAt:-10000,
    title:'react',
    uid:'abc123'
}]
test('should filter by title value',()=>{
    const filters ={
        text:'react',
        searchBy:'title'
    }
    const result = selectBlog(blogs,filters);
    expect(result).toEqual([blogs[1]]);
});
test('should filter by text default value',()=>{
    const filters ={
        text:'',
        searchBy:'title'
    }
    const result = selectBlog(blogs,filters);
    expect(result).toEqual([blogs[0],blogs[1]]);
});
test('should filter by author value',()=>{
    const filters ={
        text:'rasila',
        searchBy:'author'
    }
    const result = selectBlog(blogs,filters);
    expect(result).toEqual([blogs[0]]);
});