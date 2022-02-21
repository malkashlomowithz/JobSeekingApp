import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';

const {
    v4: uuidv4
} = require('uuid');


function ConfirmedEmail(props) {

    const [state , setState] = useState({
        
        successMessage: null,
        alertMessage: null
    })

    //compering url token to local storage token if it is a match updates DB if not gives an option for a new link.

    let url = document.URL;
    let splitUrl = url.split("=");
    let urlToken = splitUrl[2];
    let urlEmail = splitUrl[1].split("&token")[0];
    let storedToken = localStorage.getItem('token')  
    
    //updating users table user is active and creat a new token save it in db and in local storage.

    async function updateDB(){
        if(storedToken === urlToken) {

        let newToken =  uuidv4()

        console.log(newToken)

        const data = {"email": urlEmail,
                      "token": newToken}

            localStorage.setItem("token", newToken);

        await axios.put(`${API_BASE_URL_AUTH}/updateConfirmedEmail`, data)

        .then(async response => {

            console.log(response) 

            if(response.status === 200){

                setState(prevState => ({
                    ...prevState,
                    alertMessage : null,
                    successMessage: 'Your email was confirmed'
                }));
                setTimeout(() => {      
                    redirectToHome()
                }, 3500)

        } else {
            setState(prevState => ({
                ...prevState,
                alertMessage : "server issue",
                successMessage: null
            }));
        }
        }); 
    }else{
        setState(prevState => ({
            ...prevState,
            alertMessage : "something went wrong",
            successMessage: null
        }));
    }
}
    async function sendNewLink(){

    // set up a new token and update users table and sends a new link with the new token

        let newToken =  uuidv4()

        console.log(newToken)

        const data = { "email": urlEmail,
                       "token": newToken }
              console.log(data)

        await  axios.put(`${API_BASE_URL_AUTH}/sendNewLink`, data)

        .then(async response => {

            if(response.status === 200){

                localStorage.setItem("token", newToken);
                redirectToConfirm(); 
            }    
        })
    }
    const redirectToConfirm= () => {
        
        props.history.push('/Confirm');       
    } 
    const redirectToHome= () => {
        
        props.history.push('/');       
    } 
 return(
    <div className = "card col-12 col-lg-4 mt-2 hv-center"style={{marginTop: '150px'}}>
        <button 
            type = "submit" 
            className = "btn btn-primary"
            onClick = {updateDB}
            style = {{display: !state.successMessage ? 'block' : 'none' }}
        >
         Confirm my email
        </button>
         
         <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage} <br></br>
              <button className="btn btn-primary"  onClick={() => sendNewLink()} >Send me a new link</button>
            </div>
    </div>  
 )          
}  
export default withRouter(ConfirmedEmail) 