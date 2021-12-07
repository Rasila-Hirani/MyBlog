import React from 'react';
import PostFilterPage from '../../post/post-fliter/post-filter';
import PostList from '../../post/post-list/post-list';

const HomePage =({match})=>{
  
    return(
    <div className="content-container">   
    <PostFilterPage/>
    <PostList/>
    </div>
)}
export default HomePage;