
import React from 'react';
import axios from 'axios';
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

async function TokenLogin(){


    //get user details from localStorage

  const localUserDetails = {

        email : localStorage.getItem('email'),
        token : localStorage.getItem('token'),
        device : localStorage.getItem('device'),
    }

    await axios.post(`${ API_BASE_URL_AUTH}/tokenLogin`, localUserDetails)

    .then(res => {

      console.log(res.data.payload)

      if(res.data.payload === "Server issue"|| "Not Logged"){

        
      }
    })
    .catch(error => {
      console.error(error)
    })         
}  
 export default withRouter(TokenLogin)

 