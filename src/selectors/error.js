
export default (e)=>{
    let errorCode = e.code;
    let errorMessage = e.message;  
     let error=''; 
    if(errorCode === 'auth/user-not-found'){
        error= 'Email address not register.Create an account or try again';
    }else if(errorCode === 'auth/wrong-password'){
        error= 'Enter the wrong password.Try again.';
    }else if (errorCode === 'auth/too-many-requests'){ 
        error= 'You have attempted to login too many times. Try again later.';
    }else if (errorCode === 'auth/invalid-email') {
        error='Enter a valid email address.';
    }else if (errorCode ===  'auth/account-exists-with-different-credential') {
        error='An account already exists with the same email address but different sign-in credentials.';
    }
    else {    
        error= errorMessage;              
    }  
    return error;     
} 