import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import FixUpEmail from '../RegistrationComponents/FixUpEmail'


function SendEmail(props) {

   const [state , setState] = useState({
        email : "",
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
    const handleSubmitClick = (event) => {

        event.preventDefault()

        sendEmailToServer()
    }
    const redirectToHome = () => {
        
        props.history.push('/');   
    }
    async function sendEmailToServer(){

        if(FixUpEmail(state.email)){
            
          const usersEmail = {'email':state.email}

           await axios.post(`${API_BASE_URL_AUTH}/sendsLinkForForgotPassword`, usersEmail)
           .then(async response => {
            console.log(response)

                if(response.data.payload ===  "This email daaress does not exists"){

                    console.log(response.data.payload)

                    setState(prevState => ({
                        ...prevState,
                        successMessage : null,
                        alertMessage : response.data.payload
                 }))
                }else {

                     localStorage.setItem("token" , response.data.payload)

                     setState(prevState => ({
                           ...prevState,
                           successMessage : 'We have sent you a link, Please check your inbox',
                           alertMessage : null
                    }))
                    
                    setTimeout(() => {
                        redirectToHome()
                    }, 2000)
                }

                
            })

        }else{
            
            setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : 'please enter your email address.'
         }))
        }
            
           
        
    }
    
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{marginTop: '40px'}}>
            <form style={{paddingTop: '40px'}}>
            <h2>Enter your email address:</h2>
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
                <small id="emailHelp" className="form-text text-muted">We'll send you an email with a link so you can creat a new password.</small>
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
export default withRouter(SendEmail)    
