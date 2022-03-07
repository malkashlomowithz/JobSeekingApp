import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import FixUpEmail from './FixUpEmail'
import PasswordStrengthBar from 'react-password-strength-bar';
import { ClassicSpinner } from "react-spinners-kit";

function RegistrationForm(props) {
    const [state , setState] = useState({
        name : "",
        nickname : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null,
        alertMessage: null,
        loading: false
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = async () => {

        setState(prevState => ({
            ...prevState,
            loading:true,
        }))

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
                            alertMessage : '  אנא בדוק, ייתכן שנרשמת בעבר עם כתובת הדוא"ל .',
                            loading: false,
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
                            successMessage: 'איזה כיף יצרת חשבון!',
                            alertMessage: null,
                            loading: false,
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
                alertMessage: 'נא להזין כתובת אימייל חוקית ולמלא את כל השדות.',
                loading: false,
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
                alertMessage : 'הסיסמא איזה חזקה מספיק. ',
                loading: false,
            })); 
        }else if(state.password === state.confirmPassword ){      
            sendDetailsToServer() 
        } else {        
            setState(prevState => ({
                ...prevState,
                successMessage: null,
                alertMessage : 'סיסמאות לא תואמות',
                loading: false,
            })); 
        }    
    }    
    return(
        <div className=" card col-12 col-lg-4 register-card mt-2 hv-center">
            <form>
                <h4 className = "cardTitle">הירשם:</h4>
            <div className="form-group text-right">
                    <label htmlFor="exampleInputName">שם</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="שם מלא"
                        value={state.name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleInputNickname">כינוי</label>
                    <input type="text" 
                        className="form-control" 
                        id="nickname" 
                        placeholder="שם כינוי"
                        value={state.nickname}
                        onChange={handleChange}           
                    />
                </div>
                <div className="form-group text-right">
                <label htmlFor="exampleInputEmail1">כתובת מייל</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="מייל" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1">סיסמה</label>
                    <small id="passwordHelp" className="form-text text-muted">
                    חייב לכלול:
                     לפחות ספרה אחת.
                     לפחות אות קטנה אחד.
                     לפחות אות גדולה גדול.
                     לפחות תו אחת מיוחדת.
                     אורך 8 תווים לפחות, אך לא יותר מ-32.
                </small>                  
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="סיסמא"
                        value={state.password}
                        onChange={handleChange} 
                    />
                    <PasswordStrengthBar password={state.password} />  
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1">אשר סיסמא</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="אשר סיסמא"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <div>
            </div>
               <button  
                    type="submit" 
                    className="btn "
                    onClick={handleSubmitClick}
                >
                    הירשם
                    <span><ClassicSpinner size = {20} color = "black" loading = {state.loading} /></span>
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>
            <div className="mt-2">
                <span>יש לך כבר חשבון?</span>
                <span className="loginText" onClick={() => redirectToLogin()}> התחבר </span> 
            </div>           
        </div>
    )
}
export default withRouter(RegistrationForm);

