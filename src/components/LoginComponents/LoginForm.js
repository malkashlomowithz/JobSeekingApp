import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import FixUpEmail from '../RegistrationComponents/FixUpEmail'
import { ClassicSpinner } from "react-spinners-kit";


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null,
        alertMessage: null,
        loading: false,
    })

    //sets the data in the state

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
       
    //functions that will redirect the user .

    const redirectToConfirm= () => {
        
        props.history.push('/Confirm');  
    }
    const redirectToHome = () => {
        
        props.history.push('/');
        window.location.reload();
    }
    const redirectToRegister = () => {

        props.history.push('/register'); 
    }
    const redirectToSendEmail = () => {
       
        props.history.push('/sendEmail');
    }
    const redirectToEditProfile = () => {
       
        props.history.push('/editProfile');
    }

    //sends the username and password to the server
    async function  handleSubmitClick(e) {
        //get the spinner to work

        setState(prevState => ({
            ...prevState,
            loading: true
        }))
        e.preventDefault();
        if( FixUpEmail(state.email)  && state.password.length >= 8) {
            
        const data = {
            "email":state.email,
            "password":state.password,
        }
        await axios.post(`${API_BASE_URL_AUTH}/regLogIn`, data)

            .then(async response => {

                console.log(response)

                if( response.data.payload.message === "not a match!"){

                    setState(prevState => ({
                        ...prevState,
                        successMessage :null,
                        alertMessage : "Username and password do not match.",
                        loading: false
                    }))
                    // if the user did not confirm his email address.
                    //A) new token will be sent to storage and he will receive an email with a link.
                    //B) he will be directed to confirm page.
               } else if (response.data.payload.message === "not active"){
                    setState(prevState => ({
                        ...prevState,
                        successMessage : "Your email address was not confirmed",
                        alertMessage : null,
                        loading : false
                    }))
                     localStorage.setItem("email", response.data.payload.email);
                     localStorage.setItem("token", response.data.payload.token);
                     localStorage.setItem("nickname", response.data.payload.nickname);
                     localStorage.setItem("device", response.data.payload.device)
                     localStorage.setItem("isLogged", true)
                     localStorage.setItem("isAdmin", response.data.payload.isAdmin)
                    //use set time out so the user should see the massage 
                      setTimeout(() => {
                       redirectToConfirm()                      
                    }, 2000);

                } else if (response.data.payload.message === "This email address does not exists!"){

                    setState(prevState => ({
                        ...prevState,
                        successMessage : null,
                        alertMessage : response.data.payload.message,
                        loading : false
                    }))

                }else {

                    setState(prevState => ({
                        ...prevState,
                        successMessage :`Hi ${response.data.payload.nickname}! Welcome back to your job app`,
                        alertMessage : null,
                        loading : false
                    }))                       
                     localStorage.setItem("email", state.email);
                     localStorage.setItem("token", response.data.payload.newToken);
                     localStorage.setItem("nickname", response.data.payload.nickname);
                     localStorage.setItem("device", response.data.payload.device );
                     localStorage.setItem("isLogged", true);
                     localStorage.setItem("isAdmin", response.data.payload.isAdmin)

                      setTimeout(() => {
                         redirectToHome()
                    }, 3500);
                }
            })
            .catch(async error =>  {
                console.log(error);
            });
        } else {
            setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : 'please enter your email and password',
                loading : false
            }))
        }
    }
    return(       
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h4 className = "cardTitle">Login</h4>
            <form>
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
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                    <span><GoThumbsup/> </span>  {state.successMessage}
                </div>
                <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
                    <span><GoThumbsdown/> </span>  {state.alertMessage}
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >              
                <ClassicSpinner size={20} color="#fff" loading = {state.loading} />   Submit</button>
            </form>
            
            <div className="registerMessage">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> <br/><br/>              
                <span className="loginText" onClick={() => redirectToSendEmail()}>forgot password? </span><br/><br/>
                <span className="loginText" onClick={() => redirectToEditProfile()}>Edit profile </span> 
            </div>
        </div>
    )
}
export default withRouter(LoginForm);


