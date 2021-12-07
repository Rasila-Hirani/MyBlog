
import blogReducer from '../../reducers/blogReducer';

const blogs =[{
    author:'user1',
    body:'test123',
    createdAt:0,
    title:'Title 1',
    uid:'abc1'
},
{
    author:'user2',
    body:'user123',
    createdAt:-10000,
    title:'react',
    uid:'abc2'
},
{
    author:'user3',
    body:'blog3',
    createdAt:-100,
    title:'node',
    uid:'abc3'
}
]
test('should set default state',()=>{
    const state = blogReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});

test('should add a blog',() =>{
    const blog ={
        author:'user4',
        body:'blog4',
        createdAt:0,
        title:'express',
        uid:'abc4'
    }
    const action ={
        type:'ADD_BLOG',
        blog
    }
    const state = blogReducer(blogs,action)
    expect(state).toEqual([...blogs,blog])
});
