import React, { useState } from 'react';
import {connect} from 'react-redux';
import PostForm from '../post-form/post-form';

import DeletePostModal from '../../DeletePostModal';

import {startUpdatePost,startRemovePost} from '../../../redux/post/post.action';

const EditPost =({history,startUpdatePost,startRemovePost,post})=>{
  console.log(history)
  const [showModal,setShowModal]=useState(undefined);

  const handleOpenModal = () => {
    setShowModal(true);
  }
  const handleCloseModal =() =>{
    setShowModal(undefined);
  }
  const onSubmit = (data) => {
 
    startUpdatePost(post.id, data);
    history.push('/')
     
  };
  const onRemove = () => {
     startRemovePost({ id: post.id });
   history.push('/');
  };
  return(
    <div className="content-container">
    <div className="page-header">
       <div className="page-header__title">
            <h2>Edit Post</h2> 
          
            </div>                    
    </div>
    <div>
      <PostForm onSubmit={onSubmit} {...post} />
      <button className="button" onClick={handleOpenModal}>Delete Post</button>
    <DeletePostModal 
      isOpen={showModal} 
      isClose={handleCloseModal}              
      onRemove={onRemove}/>

    </div>
  </div>
  );
}

const mapStateToProps = (state, props) => ({
    post: state.posts.find((post) => post.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startUpdatePost: (id, data) => dispatch(startUpdatePost(id, data)),
  startRemovePost: (data) => dispatch(startRemovePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
