import React from 'react';

import {connect} from 'react-redux';
import {signOutStart} from '../redux/user/user.action';
import { Link } from 'react-router-dom';


export class Header extends React.Component{

    render(){
        return(
        <header className="header">
                <div className="header__content content-container">
                    <Link to="/"> <div className="logo">  </div> </Link>
                 
                        <div >
                        { !!this.props.currentUser ?
                            (<>
                                <span className="header__title">{`Hello ${this.props.currentUser.displayName}`}</span>
                                <button className="button header__login" onClick={this.props.signOutStart}>Sign out</button>
                            </>
                                
                            ) :(
                                <Link className="button header__login" to="/signin">Sign In </Link>
                                ) 
                            
                    }
                        </div>
                    </div>
                   
            
                
         </header>
        );
    }
}
const mapStateToProps = (state) =>({    
    currentUser : state.user.currentUser,
});
const mapDispatchToProps =(dispatch) =>({
    signOutStart :()=>dispatch(signOutStart())
});
export default connect(mapStateToProps,mapDispatchToProps)(Header);


