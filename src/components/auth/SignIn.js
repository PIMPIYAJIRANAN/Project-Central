import React, {useState} from 'react'
import '../../index.css'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
const SignIn =(props)=> {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleChange = (e) =>{
        switch(e.target.id){
            case 'email' :
                setEmail(e.target.value)
                return;
            case 'password':
                setPassword(e.target.value)
                return;
            default:
                return;
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        props.signIn({email,password})
    }
    const {authError,auth} = props
    
    if(auth.uid) return <Redirect to ='/'/>
    return (
        <div className="container ">
        {auth.isLoaded  && <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3 ">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange}  />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}  />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className="red-text center">
                        {props.authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>}
            
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
