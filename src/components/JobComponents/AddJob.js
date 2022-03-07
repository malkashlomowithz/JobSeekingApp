import React, {useState} from 'react';
import axios from 'axios';
import './AddJob.css'
import {API_BASE_URL_JOBS , API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import { ClassicSpinner } from "react-spinners-kit";

function AddJob(props) {

     const [state , setState] = useState({
        title: "",
        name:"",
        link:"",
        clink:"",
        details: "",
        place:"",
        sentTo:"",
        status:"",
        successMessage: null,
        alertMessage: null,
        loading: false
     })
//set the state: send the input values to state
     const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        })) 
            
    }
    const redirectToUsersJobs = (id) => {

        props.history.push('/UsersJobs'); 
    }
    const redirectToLogin = () => {
        
        props.history.push('/login');  
    }

    async function  handleSubmitClick(e){

        //get the spinner working
        setState(prevState => ({
            ...prevState,
            loading : true,
        }));

        e.preventDefault();
        // check user filed in the fieleds
        if( state.title.length && state.details.length) {
                
            const job = {
                title: state.title,
                name: state.name,
                link: state.link,
                clink:state.clink,
                details: state.details,
                place: state.place,
                sentTo: state.sentTo,
                status: state.status,
                email: localStorage.getItem('email') 
            }  
            

            //check user is logged in with token login.
                //get user details from localStorage

            const localUserDetails = {

                email : localStorage.getItem('email'),
                token : localStorage.getItem('token'),
                device : localStorage.getItem('device'),
            }

            console.log(localUserDetails)
            await axios.post(`${ API_BASE_URL_AUTH}/tokenLogin`, localUserDetails)

            .then(res => {
        
              console.log(res.data.payload)
        
              if(res.data.payload === "Not Logged"){
        
                redirectToLogin()
              } else if (res.data.payload.token){

                //stor the new token in localStorage,

                localStorage.setItem("token" , res.data.payload.token)
                // send the job to DB,

                axios.post(`${API_BASE_URL_JOBS}/addJob`, job)
                 .then(res => {

                    if(res.data.payload.affectedRows === "1"){
                        
           //if this job was added show the user a success message and redirect him to the job page

                    setState(prevState => ({
                        ...prevState,
                        alertMessage : null,
                        successMessage : "כל הכבוד הגשת מועומדות למשרה וזכרת לעדכן!",
                        loading: false,
                    }));
                    setTimeout(() => {
                        redirectToUsersJobs()
                    }, 2500); 
                   }else{
                    setState(prevState => ({
                        ...prevState,
                        alertMessage : res.data.payload.error,
                        successMessage : null,
                        loading: false,
                    }));

                   }
                 }) 
                    
                 .catch(error => {

                    console.log(error)

                 // in case job was not added show the user a alert message

                        setState(prevState => ({
                            ...prevState,                       
                            successMessage : null,
                            alertMessage : `oops!${error}`,
                            loading: false, 
                        }));
                 })    
              }
            })
            .catch(error => {
              console.error(error)
            })              
    } else {

        //if user did not add all the job information.

        setState(prevState => ({
            ...prevState,                       
            successMessage : null,
            alertMessage : "אופס! חסר לך מידע בסיסי על המשרה.",
            loading: false, 
        }));
    }
}  
    return(
        <div className="card col-12 col-lg-4 mt-2 hv-center AddJob">
        <form method="post">
            <h4 className = "cardTitle">*הוסף משרה חדשה*</h4>
        <div className="form-group text-right">
                <label htmlFor="exampleInputTitle"> שם המשרה*</label>
                <input type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="לדוג': מנהל מוצר"
                    value={state.title}
                    onChange={handleChange} 
                />
         </div>
         <div className="form-group text-right">
                <label htmlFor="exampleInputTitle">שם החברה</label>
                <input type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="לדוג': חברה איקס "
                    value={state.name}
                    onChange={handleChange} 
                />
         </div>
         
         <div className="form-group text-right">
                <label htmlFor="exampleInputTitle">  לינק - איפה ראית את המשרה</label>
                <input  type="link" 
                    className="form-control" 
                    id="link" 
                    placeholder="הכנס לינק לדף המשרה"
                    value={state.link}
                    onChange={handleChange} 

                />
         </div>
         <div className="form-group text-right">
                <label htmlFor="exampleInputTitle">  לינק - לאתר החברה</label>
                <input  type="link" 
                    className="form-control" 
                    id="clink" 
                    placeholder="הכנס לינק לאתר החברה"
                    value={state.clink}
                    onChange={handleChange} 

                />
         </div>
         <div className="form-group text-right">
            <label htmlFor="exampleInputTitle">פרטי המשרה*</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="details" 
                    placeholder="פרט/י כל מה שידוע לך על המשרה , מומלץ לעשות העתק הדבק מהמקור כדי לוודע שיש לך את כל המידע הרלוונטי..."
                    value={state.details}
                    onChange={handleChange} 
                    rows="6"
                    cols="60"
                />      
         </div>
         <div className="form-group text-right">
                <label htmlFor="exampleInputPreparations">מיקום החברה</label>
                <input  type="text" 
                    className="form-control" 
                    id="place" 
                    placeholder= "לדוג': תל אביב על קו הרכבת"
                    value={state.place}
                    onChange={handleChange} 
                   
                />
         </div>
         <div className="form-group text-right">
                <label htmlFor="exampleInputPreparations">לאן הגשת את הקורות חים</label>
                <input  type="text" 
                    className="form-control" 
                    id="sentTo" 
                    placeholder= "לדוג': דרך אתר דרושים "
                    value={state.sentTo}
                    onChange={handleChange} 
                   
                />
                
                </div>
                <div className="form-group text-right">
                <label htmlFor="exampleInputCategory">סטטוס</label>
                <input  type="text" list = 'categories'
                    className="form-control" 
                    id= "status" 
                    placeholder= "סמן סטטוס"
                    value={state.status}
                    onChange={handleChange} 
               />

         </div>
         
            <div className="alert alert-success mt-2" style = {{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style = {{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>
                <button 
                    type="submit" 
                    className="btn "
                    onClick={handleSubmitClick}
                >                
                   <span> הוסף  &nbsp; </span> 
                   <span><ClassicSpinner size = {20} color = "black" loading = {state.loading} /></span> 
                    
                </button>
                
         </form>
         
         </div>                        
    )
}
export default withRouter(AddJob) 