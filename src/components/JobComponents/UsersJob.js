import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {API_BASE_URL_jobS, API_BASE_URL_AUTH} from '../../constants/apiConstants';
import './UsersJob.css'
import JobCard from './JobCard'
import Loading from '../LoadingComponents/Loading'
 function UsersJobs(props) {

  //get the users job collection from the DB

  const [data, setData] =  useState([]);
  const [isLoading, setLoading] = useState(true)
  const localUserDetails = {

    email : localStorage.getItem('email'),
    token : localStorage.getItem('token'),
    device : localStorage.getItem('device'),
}

    useEffect(() => {
      //get the user email from the local storage and get the users job collection from DB by email

      const q = localStorage.getItem('email')

      const  fetchData =  async () => {
       
        await axios(`${API_BASE_URL_jobS}/search?word=${q}`)
        .then(async res => {

          if(res){

          //before rendering the data on the browser we will make sure the user is token logged in
            await axios.post(`${API_BASE_URL_AUTH}/tokenLogin`,localUserDetails)
            .then(result => {

              if(result.data.payload === "Not Logged"){

                //if user is not token logged in redirect him to login.
    
                props.history.push(`/login`);

              }else if (result.data.payload.token) {

                setData(res.data);
                setLoading(false)
                localStorage.setItem("token", result.data.payload.token)
              }else {

                props.history.push(`/login`);

               }    
            })
            .catch(error => {
    
              console.log(error)
            })
          }
        })
        .catch(error => {

          console.log(error)
        })     
      };
      fetchData();
  
    }, []);
    //direct the user to the clicked job.

  const  redirectToClickedjob = (id) => {

    props.history.push(`/job/${id}`);
  }
  
    return (
        <div className = "jobs">

           <h1  className = "usersTitle"> all my jobs </h1>
           <small className = "form-text text-muted"> There are {data.length} jobs in your collection.</small>
             <div style={{display: isLoading  ? 'block' : 'none' }}><Loading/></div>
           <div className = "row m-1" >

              {data.map(item => (
                <div key = {item._id} className = ' col-lg-3 col-md-4 col-sm-6  '
                     onClick = {() => redirectToClickedjob(item._id)}>
                  <JobCard
                          job = {item}   
                          id = {item._id}                       
                        />
                </div>      
              ))}
          </div>   
        </div>
    )
}
export default withRouter(UsersJobs)



