import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {startRemoveComment} from '../../../redux/comments/comment.action';
import './comment-list.style.scss'
const CommentList =({comments,currentUser,startRemoveComment})=>{

    return(
        <div className="comment-section">
           <h3>Comments{(!comments)?'(0)':`(${comments.length})`}</h3>
           {
                (!comments)?'Be the first to comment.':
                (
                    comments.map((comment) =>{
                    
                    return <div key={comment.id} >
                        <i className="userImage"></i>
                        <div className="comment">
                        <span>{comment.userName}</span>
                        <span className="comment__posted">
                          
                            {moment(comment.date).fromNow()}</span>
                        {
                           !!currentUser?
                           ( currentUser.id === comment.userId ?
                            <i className="remove_comment" title="Delete Comment" onClick={()=>startRemoveComment({ id: comment.id })}></i>
                            :''):''

                        }
                        
                        <p className="comment__text">{comment.text}</p>
                        </div>
                    </div>
                    })
                
                )
                }
        </div>
    );
}
const mapStateToProps =(state,props)=>({
    comments:state.comments.filter((comment)=>comment.postId === props.postId),
    currentUser:state.user.currentUser
})
const mapDispatchToProps=(dispatch)=>({
    startRemoveComment:(id)=>dispatch(startRemoveComment(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(CommentList);
