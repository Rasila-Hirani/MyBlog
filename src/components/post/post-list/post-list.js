import React,{ useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import {SelectFilterBlog} from '../../../selectors/blog';
import Post from '../post-view/post';
import './post-list.style.scss'
export const PostList =(props)=>{
  
    const postData=props.posts; 
    const [data,setData]=useState([]);
    const [offset,setOffset] =useState(0);
    const [perPage,setPerpage]=useState(3);
    const [currentPage,setCurrentPage]=useState(0);
    const [pageCount,setPageCount]=useState(0);
    const receivedData=()=>{
        let slice=[];
        if(postData !=null){
            if(postData.length ===1){
                slice = postData;
            }
            else{
                 slice =postData.slice(offset, offset + perPage)
            }
            setPageCount(Math.ceil(postData.length / perPage))
            setData(slice) 
        }
          
      //+++++++++++++++++++++++++++
     
    }
    const handlePageClick=(e)=>{        
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setOffset(offset);             
    }
    useEffect(()=>{
      receivedData(); 
    },[currentPage,props.posts])  
   
    return(
        <>
        <div className="display-posts-listing grid">
        {
           (data.length === 0) ?( 
            <div className="">
             <span>No Post</span>
            </div>
         ):( 
                 data.map((post,index) =>{  
                 return <div className="listing-item" key={index}>
                    <Post key={post.id} post={post} />
                 </div>
             })
         )
        }

        </div>
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    autoResetPage="false"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    
           
        
    </>
    )
}
const mapStateToProps =(state) =>({    
    posts:SelectFilterBlog(state.posts,state.filters)
 });
 
export default connect(mapStateToProps)(PostList);