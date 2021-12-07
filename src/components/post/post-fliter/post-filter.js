import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setTextFilter,searchByTitle,searchByAuthor} from '../../../redux/post-filter/post-filter.action';

class PostFilterPage extends React.Component{

    onTextChange =(e)=>{
        this.props.dispatch(setTextFilter(e.target.value))
    }
    onSortChange =(e) =>{
        if(e.target.value === 'title'){          
           this.props.dispatch(searchByTitle());
        }else if(e.target.value === 'author'){
            this.props.dispatch(searchByAuthor());
        }
           
    }
    render(){
        return( 
            <div>                 
                <div className="input-group">              
                    <div className="input-group__item">
                        <input 
                            className="text-input" 
                            placeholder="Search Post"
                            type="text" 
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select 
                            className="select"
                            onChange={this.onSortChange}
                           
                        >
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                </div>                
                    <div className="input-group__item">                           
                            {!!this.props.currentUser ? 
                                <Link className="button" to="/create">Add Post</Link> :
                                <span></span>                              
                            }
                    </div>
                </div>                    
            </div>
        );
    }
}


const mapStateToProps =(state) =>({
    filters:state.filters,
    currentUser:state.user.currentUser
});

export default connect(mapStateToProps)(PostFilterPage);
