import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import trimPost from '../../../selectors/trimPost';
import './post.scss';
import { Span } from 'slate';
const Post =({post,comments,currentUser})=>{


    const {id,title,body,createdAt,author,postImg,userId} =post;
    
    return(
        <div id="page-container">
         <div id="content-wrap">
            <div className="image"> <img  src={postImg}  /></div>
            <div className ="post-header">
                <Link className="list-item__title" to={{pathname:`read/${id}` }}>
                     <div className="title"><h3>{title} </h3></div>
             </Link>
            <div>
            {
                    !!currentUser ?(
                        currentUser.id === userId ?
                        <Link to={{pathname:`/edit/${id}`}}>
                            <div className="edit-icon"></div>
                        </Link>:''
                    ):""
                }
            </div>
            </div>
            <div className="author small-px">{`by ${author}`}</div>
            
            <div className="post-desc">{trimPost(body)}</div>
     </div>    
     <footer id="footer">
         <div className="footer-grid">
         {
             comments.length === 0 ?
             'No comment' :
             <>
             <div className="comment-icon"></div><span>{comments.length}</span>
            </>
         }
            
           
         </div>
                 </footer>
        </div>
    )
}
const mapStateToProps =(state,props) =>({    
    comments:state.comments.filter((comment)=>comment.postId === props.post.id),
    currentUser:state.user.currentUser
 });
 
 export default connect(mapStateToProps)(Post);