import React from 'react'
import './Footer.css'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL_ADMIN } from '../../constants/apiConstants';

function Footer(props){

    const redirectToContact = () => {

        props.history.push('/contact'); 

    //sends user to the top of the page to see the entire form,

         window.scrollTo({
            top: 0,
            behavior: "smooth",
        });        
    }

    const isAdmin = localStorage.getItem('isAdmin')

    async function redirectToAdminPage(){

        //check with DB if user is the admin

       let data = {email: localStorage.getItem('email'),
                   token: localStorage.getItem('token')} 
                   
        await axios.post(`${API_BASE_URL_ADMIN}/checkAdmin`, data)

        .then(async response => {

           if(response.data.payload === "ADMIN") {

            props.history.push('/admin');

           }else {

            props.history.push('/');
            console.log(response.data.payload)
           }        
        })
        .catch(error => {

            console.log(error)
        })
    }
    

    return(
        <div className = "footer">
            <p> 
                Built with ❤️ by Malky Shlomowitz © 2021  <br/>
                <span className = "loginText" onClick = {redirectToContact}>Contact me</span>
            </p>
            <div className = 'isAdmin' style={{display: isAdmin === 'true'  ? 'block' : 'none' }}>
                <span className="loginText" onClick={() => redirectToAdminPage()}>AdminPage</span>
            </div> 
        </div>
    )
}
export default withRouter(Footer)