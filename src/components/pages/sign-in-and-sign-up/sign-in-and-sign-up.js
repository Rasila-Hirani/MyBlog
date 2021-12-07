import React from 'react';
import SignIn from '../../sign-in/sign-in';
import SignUp from '../../sign-up/sign-up';
import './sign-in-and-sign-up.style.scss';

const SignInSignUpPage =() =>(
    <div className="SignInAndSignUpContainer">
        <SignIn/>
        <SignUp/>
    </div>
);
export default SignInSignUpPage;