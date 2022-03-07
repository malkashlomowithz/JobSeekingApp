import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {API_BASE_URL_JOBS, API_BASE_URL_AUTH} from '../../constants/apiConstants';
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

      const user= localStorage.getItem('email')

      const  fetchData =  async () => {
       
        await axios.get(`${API_BASE_URL_JOBS}/getUsersJobs?email=${user}`)
        .then(async res => {

         let jobs = res.data.payload.Table

          if(jobs){

          //before rendering the data on the browser we will make sure the user is token logged in
            await axios.post(`${API_BASE_URL_AUTH}/tokenLogin`,localUserDetails)
            .then(result => {

              if(result.data.payload === "Not Logged"){

                //if user is not token logged in redirect him to login.
    
                props.history.push(`/login`);

              }else if (result.data.payload.token) {

                setData(jobs);
                setLoading(false)
                localStorage.setItem("token", result.data.payload.token)
              }else {

                props.history.push(`/login`);

               }    
            })
            .catch(error => {
    
              console.log(error)
            })
          }else {
            props.history.push(`/`);
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

           <h1  className = "usersTitle">   כל המשרות שלי:</h1>
           <p className = "form-text text-muted"> יש לך {data.length} משרות עליהם הגשת מועומדות</p>
             <div style={{display: isLoading  ? 'block' : 'none' }}><Loading/></div>

            
           <div className = "row m-1" >

              {data.map(item => (
                <div key = {item.id} className = ' col-lg-3 col-md-4 col-sm-6  '
                     onClick = {() => redirectToClickedjob(item.id)}>
                  <JobCard
                          job = {item}   
                          id = {item.id}                       
                        />
                </div>      
              ))}
          </div>   

<div>{data.name}</div>
        </div>
    )
}
export default withRouter(UsersJobs)



