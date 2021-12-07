import React,{useEffect, lazy,Suspense} from 'react';
import {connect} from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

import Spinner from './components/spinner/spinner';

import Header from './components/Header';
const HomePage = lazy(() => import('./components/pages/homepage/homepage'));
const AddPost = lazy(() => import('./components/post/add-post/add-post'));
const EditPost = lazy(() => import('./components/post/edit-post/edit-post'));
const SinglePost = lazy(() => import('./components/post/post-view/single-post'));
const SignInSignUpPage = lazy(() => import('./components/pages/sign-in-and-sign-up/sign-in-and-sign-up'));


import { fetchPostsStartAsync } from './redux/post/post.action';
import { isUserAuthenticated } from './redux/user/user.action';
import {startFetchComment} from './redux/comments/comment.action';

const App =({fetchPostsStartAsync,isUserAuthenticated,currentUser,startFetchComment})=>{
    useEffect(()=>{
        fetchPostsStartAsync();
        startFetchComment();
        isUserAuthenticated();
        
    },[isUserAuthenticated,fetchPostsStartAsync])
  
    return(
        <div>
            <Header/>
            <Switch>
                <Suspense fallback={<Spinner/>}>
                <Route path="/" component={HomePage} exact={true} /> 
                <Route path="/read/:id" component={SinglePost}/> 
                
                <Route path="/create" render={(props)=> !currentUser ? <Redirect to='/'/>:<AddPost {...props}/> }/> 
               
                <Route path="/edit/:id" render={(props)=> !currentUser ? <Redirect to='/'/>:<EditPost {...props}/> }/> 
                <Route exact path="/signin" 
                    render={()=> currentUser ? <Redirect to='/'/>:<SignInSignUpPage/>}
                /> 
                </Suspense> 
            </Switch>
        </div>
)};
const mapStateToProps =(state)=>({
    currentUser:state.user.currentUser
})
const mapDispatchToProps =(dispatch)=>({
    fetchPostsStartAsync:()=>dispatch(fetchPostsStartAsync()),
    isUserAuthenticated:()=>dispatch(isUserAuthenticated()),
    startFetchComment:()=>dispatch(startFetchComment())

  });
  export default connect(mapStateToProps,mapDispatchToProps)(App);