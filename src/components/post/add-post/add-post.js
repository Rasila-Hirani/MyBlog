import React from 'react';
import { connect } from 'react-redux';
import {startAddPost} from '../../../redux/post/post.action';
import PostForm from '../post-form/post-form';

const AddPost =(props)=>{

   const onSubmit = (post) =>{
        props.startAddPost(post);
        props.history.push('/');
    } 
    return(
        <div className="content-container">
                <div className="page-header">      
                    <div className="page-header__title">
                    <h2>Add Post</h2> 
                  
                    </div> 
                </div>
                <PostForm onSubmit={onSubmit}/>
            </div>
    );
}
const mapDispatchToProps =(dispatch) =>({
    startAddPost :(post) => dispatch(startAddPost(post))
});

export default connect(undefined, mapDispatchToProps)(AddPost);