import React from 'react';
import { connect } from 'react-redux';

import parse from 'html-react-parser';
import moment from 'moment';
import './singlePost.style.scss'

import CommentForm from '../../comments/comment-form/comment-form';
import CommentList from '../../comments/comment-list/comment-list';
import {startRemoveBookmark, startAddBookmark} from '../../../redux/bookmark/bookmark.action';

const SinglePost =(props)=>{
    const {title,author,createdAt,body,postImg,id} =props.post;

   const bookmarkClick=()=>{
    if(!props.currentUser){
        props.history.push('/signin')
    }else{
        if(props.bookmark === undefined){
            props.dispatch(startAddBookmark(id))
        }else{
            props.dispatch(startRemoveBookmark(props.bookmark.id))
        }
    }
   }
    
   
        return(
            <div className="content-container">
            <div className="page-header">
                <div className="read__title"><h2>{title}</h2> </div>
                <div className="post_subData">
                    <div className="read_subtitle">
                        <span>{` ${moment(createdAt).format('MMMM DD, YYYY')} | ${author}`}</span> 
                    </div>
                    <div onClick={bookmarkClick}>
                    {
                       (props.bookmark === undefined)?
                       ( <i className="bookmark" aria-hidden="true"></i>)
                       :
                       <i className="bookmarked" aria-hidden="true"></i>
                   }
                    </div>
                  
                </div>
            </div> 
            <div className="post-full-img"> <img  src={postImg} /></div>
           
            <div className="list-item__data">
                {parse(body,{ trim: true })}
            </div>
           <CommentList postId={id}/>
           <CommentForm postId={id} />
            </div>
        );
    
}
const mapStateToProps =(state,props)=>({
    post:state.posts.find((post)=> post.id === props.match.params.id),
    bookmark:state.bookmarks.find((bm) => bm.postId === props.match.params.id),
    currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(SinglePost);