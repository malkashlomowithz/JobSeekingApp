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

    //sends the username and password to the server
    async function  handleSubmitClick(e) {
        //get the spinner to work

        setState(prevState => ({
            ...prevState,
            loading: true
        }))
        e.preventDefault();

        const fixedEmail= FixUpEmail(state.email)

        if(fixedEmail!== false  && state.password.length >= 8) {
            
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
                        alertMessage : "שם משתמש וסיסמא לא תואמים.",
                        loading: false
                    }))
                    // if the user did not confirm his email address.
                    //A) new token will be sent to storage and he will receive an email with a link.
                    //B) he will be directed to confirm page.
               } else if (response.data.payload.message === "not active"){
                    setState(prevState => ({
                        ...prevState,
                        successMessage : " אישרת את כתובת המייל שלך",
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

                } else if (response.data.payload.message === "כתובת מייל לא קיימת!"){

                    setState(prevState => ({
                        ...prevState,
                        successMessage : null,
                        alertMessage : response.data.payload.message,
                        loading : false
                    }))

                }else {

                    setState(prevState => ({
                        ...prevState,
                        successMessage :`הי ${response.data.payload.nickname}! ברוך שובך לאפליקציית חיפוש העבודה שלך`,
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
                alertMessage : 'נא להזין את האימייל והסיסמה שלך',
                loading : false
            }))
        }
    }
    return(       
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h4 className = "cardTitle">התחבר:</h4>
            <form>
                <div className="form-group text-right">
                <label htmlFor="exampleInputEmail1">כתובת מייל</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-right">
                <label htmlFor="exampleInputPassword1">סיסמה</label>
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
                    className="btn "
                    onClick={handleSubmitClick}
                >              
                <ClassicSpinner size={20} color="black" loading = {state.loading} />   שלח  </button>
            </form>
            
            <div className="registerMessage">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> <br/><br/>              
                <span className="loginText" onClick={() => redirectToSendEmail()}>forgot password? </span><br/><br/>
            </div>
        </div>
    )
}
export default withRouter(LoginForm);


