import React,{useState} from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin,signInWithEmail } from '../../redux/user/user.action';
import FormInput from '../form-input/form-input';
import './sign-in.style.scss'

const SignIn =({startGoogleLogin,signInWithEmail,error})=>{
    const [userCredentials,setCredentials] = useState({email:'',password:''})
    const { email,password} = userCredentials;

    const handleSubmit=async(e)=>{
        e.preventDefault();
        signInWithEmail(email,password);
    }
    const handleChange =(e)=>{
        const {name,value} = e.target;
       setCredentials({...userCredentials,[name]:value});
    }
    return(
    <div className="signInConatiner">
       <h2 className="signInTitle">I already have an account</h2>
       <span>Sign in with your email and password</span>
       {<p className="form__error">{error}</p>}
        <form onSubmit={handleSubmit}>
         
            <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
         <div className="ButtonsBarContainer">
         <button className='button' type='submit'>SIGN IN</button>
         <button className="button" onClick={startGoogleLogin} type='button'>
                    <i className="google_logo" aria-hidden="true"></i>
                    <span className="box-layout_span">Sign in with Google</span>
                </button>
               
         </div>
               
        </form>
       
    </div>

    )
}
const mapStateToProps =(state)=>({
    error:state.user.error
})
const mapDispatchToProps =(dispatch) =>({
    startGoogleLogin :()=>dispatch(startGoogleLogin()),
    signInWithEmail:(email,password)=>dispatch(signInWithEmail({email,password}))
  
});
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);