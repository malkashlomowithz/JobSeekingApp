import React from 'react'
import Pic from './emailPic.png'
function Confirm() {

    return(
        <div className="card col-10 col-lg-4 login-card mt-8 hv-center" style={{marginTop: "25px"}}>
           <img src={Pic} alt="description" style={{width: "100px"}}/>
            <h1 >We are almost done!</h1>
            Confirm your email address.<br/>
            We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.
            If you do not receive a confirmation email, please check your spam folder. 
        </div>
    )
    
}
export default Confirm
