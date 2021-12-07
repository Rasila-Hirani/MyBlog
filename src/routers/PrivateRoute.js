import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect} from 'react-router-dom';


export const PrivateRoute =(props) =>(
    props.isAuthenticated ? <div>
   
      <Route {...props} />
    </div>:<Redirect to="/" />
    
);

const mapStateToProps = (state) =>({    
  isAuthenticated : !!state.user.currentUser.id
});

export default connect(mapStateToProps)(PrivateRoute);