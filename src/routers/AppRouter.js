import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';



import HomePage from '../components/pages/homepage/homepage';
import AddPost from '../components/post/add-post/add-post';
import EditPost from '../components/post/edit-post/edit-post';
import SinglePost from '../components/post/post-view/single-post';
import SignInSignUpPage from '../components/pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { fetchPostsStartAsync } from '../redux/post/post.action';
import { isUserAuthenticated } from '../redux/user/user.action';



//export const history =createHistory();

const AppRouter =({fetchPostsStartAsync,isUserAuthenticated,currentUser})=>{
    useEffect(()=>{
        fetchPostsStartAsync();
        isUserAuthenticated()
    },[isUserAuthenticated,fetchPostsStartAsync])
   
    return(
        <div>
            <Header/>
            <Switch>
                <PublicRoute path="/" component={HomePage} exact={true} /> 
                <PublicRoute path="/read/:id" component={SinglePost}/> 
                
                <PrivateRoute path="/create" component={AddPost} /> 
                <PrivateRoute path="/edit/:id" component={EditPost} /> 
                <PublicRoute exact path="/signin" 
                    render={()=> currentUser ? <Redirect to='/'/>:<SignInSignUpPage/>}
                />  
            </Switch>
        </div>
//         <Router >
//             {/* <Router history = {history} ></Router> */}
//     <div>
//        <Header/>
//         <Switch>      
//             <PublicRoute path="/" component={HomePage} exact={true} />     
           
//             <PublicRoute path="/read/:id" component={SinglePost}/>           
//             <PrivateRoute path="/create" component={AddPost} />   
//             <PrivateRoute path="/edit/:id" component={EditPost} />  
                        
//             <Route component={NotFoundPage} />
//         </Switch>
       
//     </div>        
//     </Router>
// )};
)};
const mapStateToProps =(state)=>({
    currentUser:state.user.currentUser
})
const mapDispatchToProps =(dispatch)=>({
    fetchPostsStartAsync:()=>dispatch(fetchPostsStartAsync()),
    isUserAuthenticated:()=>dispatch(isUserAuthenticated())

  });
  export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);
