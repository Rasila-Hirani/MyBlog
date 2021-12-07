
export const SelectFilterBlog =(blogs,{text='',searchBy})=>{


  if(blogs.length >0){
   
    return blogs.filter((blog) =>{   
     
      if(searchBy === 'title'){  
     
          const titleMatch =blog.title.toLowerCase().includes(text.toLowerCase().trim());              
          return titleMatch;
      }
      else if(searchBy === 'author'){               
          const authorMatch= blog.author.toLowerCase().includes(text.toLowerCase().trim());
          return authorMatch;
      }
      }).sort((a,b) =>{
      return a.createdAt < b.createdAt ? 1 : -1;
      })
    
  }


}
