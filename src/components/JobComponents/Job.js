import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPage from './JobPage';
import './Job.css';
import {API_BASE_URL_JOBS} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";


function Job(props) {

  const [data, setData] =  useState([]);



// get the job from the bd with job id from the location pathname
  useEffect(() => {

    const  fetchData =  async () => {

      //get the id number to fined the job by id
      const jobId = props.location.pathname.split('/')[2];
      const email= localStorage.getItem('email')

      await axios(`${API_BASE_URL_JOBS}/getJobById?id=${jobId}&email=${email}`,)
      .then(async res => {

        console.log(res.data.payload.Table)

        setData(res.data.payload.Table);

      })
      .catch( error => {

        console.log(error)
      })
    };
    fetchData();

  }, []);


  
  
 

  return(
    <>
      {data.map(item => ( 

        <div key = {item.id}> 
                <JobPage
                        job = {item}  
                        key = {item.id}  
                        id = {item.id}                       
                /> 
      </div>                         
      ))} 
  </>
)
}
export default withRouter(Job);
