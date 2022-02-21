import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPage from './JobPage';
import './Job.css';
import {API_BASE_URL_jobS} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup } from "react-icons/go";

function Job(props) {

  const [data, setData] =  useState([]);
  const [state , setState] = useState({

    selectedFile: null,
    successMessage: null,
    alertMessage : null,  
})


// get the job from the bd with job id from the location pathname
  useEffect(() => {

    const  fetchData =  async () => {

      //get the id number to fined the job by id
      const jobId = props.location.pathname.split('/')[2];

      await axios(`${API_BASE_URL_jobS}/${jobId}`,)
      .then(async res => {

        setData([res.data]);
      })
      .catch( error => {

        console.log(error)
      })
    };
    fetchData();

  }, []);

  // function that directs the user to see all his jobs.
  const redirectUsersJobs = () => { 

    props.history.push('/UsersJobs');
   }

   // function thats deletes the job from db
 function deleteThisjob(id ,title){

    if(window.confirm(`Are you sure you want to delete ${title} job?`)){

    axios.delete(`${API_BASE_URL_jobS}/${id}`,)
      .then(res => {
        if(res.status === 200){

          //if this job was deleted send successMessage.
          setState(prevState => ({
            ...prevState,
            alertMessage : null,
            successMessage : <p>{title} was deleted from your job collection!</p>
        }));

        // send the user back to his collection.
        setTimeout(() => {
          redirectUsersJobs()
        }, 4500)                 
        }
      })
      .catch(error => {
          console.error(error)
      })
  }  
  }  
  //this function will direct the user to the update job page.
  const updateThisjob = (id) => {

    props.history.push(`/updatejob/${id}`);
  }

  //this function will direct the user to the send job page.
  const sharejob = (id) => {

    props.history.push(`/SendJob/${id}`);
  }
  // adding a image to the state
  const onChangeHandler=event=>{
    setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  //Send the image to the DB
  const onClickHandler = (id, title) => {
  
    const data = new FormData() 
    data.append('file', state.selectedFile)

    axios.put(`${API_BASE_URL_jobS}/image/${id}`, data,)
    .then(res => {

     const image = res.data
 
      if(res.status === 200) {
        //if the job was updated with the new image then:
        //A)the state will be set with the updated image
        setData([image])
        //B)the user will see a success message
        setState(prevState => ({
          ...prevState,
          alertMessage : null,
          successMessage : `An image was added for ${title}!`
        }))
        //the user will be sent to the top of the page to see the new image
        setTimeout(() => {

          window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        }, 3300)
      }    
    })
    .catch(error => {
        console.error(error)
    })
  }
  

  return(
    <>
      {data.map(item => ( 
        <div key = {item._id}>             
                <JobPage
                        job = {item}  
                        key = {item._id}  
                        id = {item._id}                       
                /> 
        <div className = "icons" >     
            <div className="alert alert-success mt-2 col-lg-8" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
        <div >      
          <img className = "image"
                src='' alt="Delete "              
                onClick = {() => deleteThisjob(item._id, item.title)}
          /> Delete this job from your collection
            <br/> 

        <img className = "image"
              src='' alt="update "                         
              onClick = {() => updateThisjob(item._id)}
        /> Update your job
          <br/>

        <img className = "image"
                src='' alt="addImage "
        /> Add a image to your job
          <input type="file" name="file" onChange={onChangeHandler}/>
        <button type="button" style = {{display:"none"}} onClick={onClickHandler(item._id,item.title)}></button> 
          <br/>
          
        <img className = "image"
            src="" alt="share "            
            onClick = {() => sharejob(item._id,)}
        /> Share your job 
      </div>     
      </div>  
      </div>                         
      ))} 
  </>
)
}
export default withRouter(Job);
