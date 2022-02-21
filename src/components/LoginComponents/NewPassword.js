import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {API_BASE_URL_AUTH} from '../../constants/apiConstants';
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import PasswordStrengthBar from 'react-password-strength-bar';




function NewPassword(props) {
    const [state , setState] = useState({
        
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

    const handleSubmitClick = (e) => {

        e.preventDefault();
        
        if(state.password === state.confirmPassword ) {
      
            sendDetailsToServer() 
        } else {
            setState(prevState => ({
                ...prevState,
                alertMessage : "Passwords do not match",
                successMessage: null,
            }));
        }    
    }
    const redirectToHome = () => {

        props.history.push('/');
    }
    const redirectToConfirm= () => {
        
        props.history.push('/Confirm');     
    }

  // get the token and email from url and local storage.

        let url = document.URL;
        let splitUrl = url.split("=");
        let urlToken = splitUrl[2];
        let urlEmail = splitUrl[1].split("&token")[0];
        let storedToken = localStorage.getItem("token")     

    const sendDetailsToServer = async () => {
             
        if( state.password.length && storedToken === urlToken) {
            
            
            const newPassword={
                "token" : urlToken , 
                "email" : urlEmail ,
                "password" : state.password,
            }
            axios.post(`${API_BASE_URL_AUTH}/updatePassword`, newPassword)
                .then(async response => {

                    console.log(response)

                        if(response.data.payload.message === "not active"){
                            localStorage.setItem("token", response.data.payload.token);
                            localStorage.setItem("email", response.data.payload.email );
                            localStorage.setItem("device", response.data.payload.device);
                            localStorage.setItem("nickname", response.data.payload.nickname );
                            localStorage.setItem("isLogged", true );
                            localStorage.setItem("isAdmin", response.data.payload.isAdmin );

                            setState(prevState => ({
                                ...prevState,
                                alertMessage : null,
                                successMessage: 'Your password was changed but your email address was not confirmed',
                            }));
                            setTimeout(() => {
                            redirectToConfirm()   
                            }, 3500);                  
                        }else {
                            console.log(response.data.payload.token)
                            localStorage.setItem("token", response.data.payload.token);
                            localStorage.setItem("email", response.data.payload.email );
                            localStorage.setItem("device",  response.data.payload.device);
                            localStorage.setItem("nickname", response.data.payload.nickname );
                            localStorage.setItem("isLogged", true );
                            localStorage.setItem("isAdmin", response.data.payload.isAdmin );

                            setState(prevState => ({
                                ...prevState,
                                alertMessage : null,
                                successMessage: 'Your password was changed !'
                            }));
                            setTimeout(() => {
                                redirectToHome()   
                            }, 3500);               
                        }
                })
                .catch(async error => {
        
            setState(prevState => ({
                ...prevState,
                alertMessage : error,
                successMessage: null,
            }))   
        })               
    }else {
        setState(prevState => ({
                ...prevState,
                alertMessage : "error",
                successMessage: null,
            }))   

    }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <h4>Create a new password</h4>
               
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
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
                    Send
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>      
        </div>
    )
}

export default withRouter(NewPassword);


