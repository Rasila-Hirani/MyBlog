import React, {useMemo, useState} from 'react';
import { connect } from 'react-redux';
import  {Node,createEditor} from 'slate';
import {Slate, Editable, withReact} from 'slate-react'// Import the Slate components and React plugin
import moment from 'moment';
import {startAddComment} from '../../../redux/comments/comment.action';

const CommentForm =({startAddComment,currentUser,postId})=>{
    const [error,setError] = useState('');
    //Slate JS
    const editor = useMemo(() => withReact(createEditor()),[]);
    const initialEditorValue = [{
      type: 'paragraph',
      children: [{ text: '' }],
    }];
    const [value, setValue] = useState(initialEditorValue)
    //Serialize and Deserialize Editor value  
    const serialize = (value) => {
        return (value
          .map(n => Node.string(n)).join('\n')
        )
      }
      const deserialize = (string) => {
        return string.split('\n').map(line => {
          return {children: [{ text: line }],}
        })
      }
    const postComment =(e)=>{
      e.preventDefault();
      if(!!currentUser){
      const content = serialize(value);
      if(content){
        setError('');
        const newComment={
          text:content,
          userName:currentUser.displayName,
          userId:currentUser.id,
          date:moment().valueOf(),
          postId
        };
        setValue(initialEditorValue)
       startAddComment(newComment,postId);
      }else{
        setError('Please enter comment.')
      }
      }else{
        setError('Sign In Or Sign up for Comment')
      }
    }
      return(
        <div>
             
         {error && <p className="form__error">{error}</p>}
         
         <div className="slate_box">

            <Slate editor={editor} value={value} onChange={newValue =>setValue(newValue)} >
                    <Editable placeholder="What are your thoughts?" className="slate" />
            </Slate>
            <div className="post_btn">
                <span>Sign In Or Sign up for Comment</span>
                <button className="button" onClick={postComment}>Post Comment</button>
                <button className="button" onClick={()=>{  setError(''); setValue(initialEditorValue)}}>Cancel</button>
            </div>
         </div>
        
        </div>
    );
}
const mapStateToProps =(state,props) =>({
  currentUser:state.user.currentUser
})
const mapDispatchToProps=(dispatch)=>({   
  startAddComment: (newComment) =>dispatch(startAddComment(newComment))
 
})
export default connect(mapStateToProps,mapDispatchToProps)(CommentForm);