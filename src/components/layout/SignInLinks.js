import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from  '../../store/actions/authActions'

const SignInLinks = (props) =>{
    const handleSignout = (e) =>{
        e.preventDefault();
        props.signOut()
    }
    const {profile}=props
    return(
        <ul className="right">
            <li><NavLink to ='/create'> NewProject </NavLink></li>
            <li><a onClick={handleSignout}>Logout</a></li>
            <li><NavLink to ='/' className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps =(dispatch) =>{
    return{
        signOut: () => dispatch(signOut())
    }
}
export default connect(null,mapDispatchToProps)(SignInLinks);