import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AddJob.css'
import {API_BASE_URL_jobS , API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";

function SendJob(props) {

 //get all the details of the job from the db by job id.
 
 const [data, setData] =  useState([]);

 useEffect(() => {

    const  fetchData =  async () => {

        const jobId = window.location.pathname.split('/')[2];

        await axios(`${API_BASE_URL_jobS}/${jobId}`,)
        .then(res => {

        SendJobToState(res.data)
        setData([res.data]);
        })
        .catch(error => {
            console.log(error)
        })        
    };
    fetchData();    
  }, []);

 const [state , setState] = useState({
        to: "",
        message:"",
        job: [],
        successMessage: null,
        alertMessage: null
     })
//set the state: send the input values to state
     const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))        
    }
    const redirectToThisjob = (id) => {

        props.history.push(`/job/${id}`);
    }

    const SendJobToState = (data) => {

        setState(prevState => ({
            ...prevState,
            job: data
        }));
    }

    //send info to server
    async function  handleSubmitClick(e){
        e.preventDefault();

        if(state.to.length && data.length ){
                
            const info = {
                to: state.to,
                message: state.message,
                job: state.job,
                email: localStorage.getItem('email') 
            }  
            axios.post(`${API_BASE_URL}/share`, info)
            .then(res => {
                if(res.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        alertMessage : null,
                        successMessage :` your job was sent to ${info.to}`
                    }));
                    setTimeout(() => {
                        redirectToThisjob(state.job._id)
                    }, 3500) 
                }})
            .catch(error => {
                console.error(error)
            })         
        }else{
            setState(prevState => ({
                ...prevState,
                alertMessage : "An email address and a brief message is required!"
            }));
        }
    }
    return(
    <div className="card col-12 col-lg-4 mt-2 hv-center AddJob">
    
        {data.map(item => ( 
         <form key = {item._id}>
            <h4 className = "cardTitle">Send your job:</h4>
            <div className="form-group text-left">
                <label htmlFor="exampleInputTitle">Title</label>
                <input type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Give your job a title"
                    value={item.title}
                    onChange={handleChange} 
                />
               <input type="text" 
                    style={{display:"none"}}
                    id="data" 
                    placeholder="Give your job a title"
                    value={ state.data}
                    onChange={handleChange} 
                />
            </div>
           
            <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="to" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.to}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">To whom do you want to send this job</small>
            </div>
            <div className="form-group text-left">
                <label htmlFor="exampleInputTitle">Message</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="message" 
                    value = {state.message}                    
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
                Send
                </button>
        </form>
            ))}

        </div>   
        )

}
export default withRouter(SendJob) 