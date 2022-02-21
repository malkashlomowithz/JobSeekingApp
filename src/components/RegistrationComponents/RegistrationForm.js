import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import FixUpEmail from './FixUpEmail'
import PasswordStrengthBar from 'react-password-strength-bar';

function RegistrationForm(props) {
    const [state , setState] = useState({
        name : "",
        nickname : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null,
        alertMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = async () => {

        //check all field are filled, if email is an email and fix it up 
        //and check the pw meets the requirements
        const fixedEmail= FixUpEmail(state.email)
        
        if( fixedEmail!== false && state.email.length && state.password.length 
            && state.name.length && state.nickname.length) {
            
            const user={
                "name":state.name,
                "nickname":state.nickname,
                "email":fixedEmail ,
                "password":state.password
            }
            //send to db
            axios.post(`${ API_BASE_URL_AUTH}/register`, user)
            
                    .then(async response => {


                    if(response.data.payload.errorMessage ){

                        // send error alert

                        setState(prevState => ({
                            ...prevState,
                            successMessage: null,
                            alertMessage : 'Please check, you might have registered in the past with this email address or might be that someone is using this nickname.'
                        }));
                    } else if(response.data.payload){

                      let storage = response.data.payload
                        
                        localStorage.setItem("token", storage.token);
                        localStorage.setItem("email", storage.email );
                        localStorage.setItem("device", 1 );
                        localStorage.setItem("nickname", storage.nickname );
                        localStorage.setItem("isLogged", true );
                        localStorage.setItem("isAdmin", storage.isAdmin );

                        //send success message
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'You have created an account!',
                            alertMessage: null
                        }));                        
                        setTimeout(() => {
                            redirectToConfirm()
                        }, 2500);                                           
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                });               
        } else {                                  
            // send error alert
            setState(prevState => ({
                ...prevState,
                successMessage: null,
                alertMessage: 'Please enter a valid email address and fill in all the fields.'
            }));   
        }       
    }    
    const redirectToLogin = () => {
      
        props.history.push('/login');      
    }
    const redirectToConfirm= () => {
        
        props.history.push('/Confirm');     
    }
    const handleSubmitClick = (e) => {

        e.preventDefault();

        //check the passwords match and is strong enough.
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(strongRegex.test(state.password)===false){
            console.log(strongRegex.test(state.password))
             setState(prevState => ({
                ...prevState,
                successMessage: null,
                alertMessage : 'Password is not strong enough. '
            })); 
        }else if(state.password === state.confirmPassword ){      
            sendDetailsToServer() 
        } else {        
            setState(prevState => ({
                ...prevState,
                successMessage: null,
                alertMessage : 'Passwords do not match'
            })); 
        }    
    }    
    return(
        <div className="card col-12 col-lg-4 register-card mt-2 hv-center">
            <form>
                <h4 className = "cardTitle">Register:</h4>
            <div className="form-group text-left">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your name"
                        value={state.name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputNickname">Nickname</label>
                    <input type="text" 
                        className="form-control" 
                        id="nickname" 
                        placeholder="Nickname"
                        value={state.nickname}
                        onChange={handleChange}           
                    />
                <small id="nicknameHelp" className="form-text text-muted">Other users will see you with this name.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <small id="passwordHelp" className="form-text text-muted">
                    Inclosed:
                    At least one digit.
                    At least one lowercase character. 
                    At least one uppercase character.
                    At least one special character.
                    At least 8 characters in length, but no more than 32.
                </small>                  
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                    <PasswordStrengthBar password={state.password} />  
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <div>
            </div>
               <button  
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>           
        </div>
    )
}
export default withRouter(RegistrationForm);