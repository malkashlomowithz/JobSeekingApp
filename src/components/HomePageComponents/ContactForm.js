import React, {useState} from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import {API_BASE_URL_MESSAGE} from '../../constants/apiConstants';
import { ClassicSpinner } from "react-spinners-kit";

function ContactForm(props) {

    let email = localStorage.getItem('email')

    const [state , setState] = useState({
        name: '',
        message:'',
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
    const handleSubmitClick = (e) => {

        e.preventDefault();
           sendForm()
    } 
    const redirectToHome = () => {

        props.history.push('/');  
    }   
    const sendForm = () => {
        if(state.name.length && email.length && state.message.length){
            const data = {
                "name": state.name,
                "email": email,
                "message": state.message,
            }
            setState(prevState => ({
                ...prevState,
                loading:true,
            }))
            axios.post(`${API_BASE_URL_MESSAGE}`, data)
            .then(res => {
                if(res.status === 200){
                setState(prevState => ({
                    ...prevState,
                    alertMessage : null,
                    successMessage : "ההודעה שלך נשלחה בהצלחה אני אצור איתך קשר תוך 24 שעות",
                    loading: false,
                }));
                setTimeout(() => {
                    redirectToHome()
                }, 4500)                    
                } 
            })
            .catch(error => {
                setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : error,
                loading: false
            }));       
            })
        }else{
            setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : "אנא מלא את כל השדות",
                loading: false
            }));       
        }         
    }
    return (
         <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form className = 'mt-2'>
            <h4>אנא מלא את הטופס</h4>               
               <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1">שם מלא</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your full name"
                        value={state.name}
                        onChange={handleChange} 
                    />
                </div>

                  
                <div className="form-group text-right">
                <label htmlFor="exampleInputTitle">הודעה</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="message" 
                    value={state.message}
                    onChange={handleChange} 
                    rows="6"
                    cols="60"
                />                   
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
                >  <span><ClassicSpinner size = {20} color = "black" loading = {state.loading} /></span>
                    שלח הודעה
                </button>
            </form>
               
        </div>
    ) 
}
export default withRouter(ContactForm)
