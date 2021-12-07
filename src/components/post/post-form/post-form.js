import React,{useState} from 'react';

import moment from 'moment';
import Quill from '../../Quill';
import xss from 'xss';

export const PostForm =({onSubmit,title,body,createdAt,postImg,userId})=>{
   
    
    const [blogTitle,setTitle] = useState(title || '');
    const [blogBody, setBody] = useState(body || '');
    const [blogCreatedAt] = useState(createdAt || moment());
    const [error,setError] = useState('');
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(postImg);

    const onChangePicture =(e)=>{
        if(e.target.files[0]){
            setPicture(e.target.files[0]);
            const reader =new FileReader();
            reader.addEventListener("load",()=>{
                setImgData(reader.result);
            })
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const onTitleChange =(e)=>{
        setTitle(e.target.value);
    }
    const onBlogBodyChange =(value) =>{  
       setBody(value);
    }
    const onFormSubmit =(e) =>{
        e.preventDefault(); 
        if(!blogTitle || !blogBody || !imgData)
        {
            setError('Please provide post Image, Title and Content')
        }
        else{
            setError('');           
          onSubmit({
              postImg:imgData,
                title:blogTitle,
                body:xss(blogBody),
                createdAt:blogCreatedAt.valueOf()
                
            })
        }
    }
    return(
        <form className="form" onSubmit={onFormSubmit}>
                 {error && <p className="form__error">{error}</p>}
                 <img className="post-img" src={imgData}  />
                 <label for="postPic">Choose File</label>
                 <input id="postPic" type="file" onChange={onChangePicture} hidden />
                 
                 <input 
                        autoFocus
                        className="text-input"
                        type="text" 
                        placeholder="Blog Title"                        
                        value={blogTitle} 
                        onChange={onTitleChange} 
                    />
                   
                <Quill body={blogBody} setBody={onBlogBodyChange} />             
                    <div>
                        <button className="button">Save Post</button>
                    </div>
            </form>
    );
}



export default PostForm;
