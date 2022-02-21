import React, {useState} from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import {API_BASE_URL} from '../../constants/apiConstants';

function ContactForm(props) {

    const [state , setState] = useState({
        name: '',
        email: '',
        message:'',
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
           sendForm()
    } 
    const redirectToHome = () => {

        props.history.push('/');  
    }   
    const sendForm = () => {
        if(state.name.length && state.email.length && state.message.length){
            const data = {
                "name":state.name,
                "email":state.email,
                "message": state.message,
            }
            axios.post(`${API_BASE_URL}/contactUs`, data)
            .then(res => {
                if(res.status === 200){
                setState(prevState => ({
                    ...prevState,
                    alertMessage : null,
                    successMessage : "Your message was sent! I will try to get back to you with an answer within 48 hours"
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
                alertMessage : error
            }));       
            })
        }else{
            setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : "Please fill in all fields"
            }));       
        }         
    }
    return (
         <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form className = 'mt-2'>
            <h4>Please fill out the form:</h4>               
               <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Full name</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your full name"
                        value={state.name}
                        onChange={handleChange} 
                    />
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
                <label htmlFor="exampleInputTitle">Message</label>
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
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Send message
                </button>
            </form>
               
        </div>
    ) 
}
export default withRouter(ContactForm)
