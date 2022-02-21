import React, {useState} from 'react';
import axios from 'axios';
import './AddJob.css'
import {API_BASE_URL_jobS , API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";
import { ClassicSpinner } from "react-spinners-kit";

function AddJob(props) {

     const [state , setState] = useState({
        title: "",
        category: "",
        description: "",
        ingredients:"",
        preparations: "",
        servings: "",
        preparation_time: "",
        file: "",
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
    const redirectToThisjob = (id) => {

        props.history.push(`/job/${id}`);
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
        if( state.title.length && state.category.length && state.ingredients.length && state.preparations.length) {
                
            const job = {
                title: state.title,
                category: state.category,
                description: state.description,
                ingredients: state.ingredients,
                preparations: state.preparations,
                servings: state.servings,
                preparation_time: state.preparation_time,
                file: state.file, 
                created_by: localStorage.getItem('email') 
            }  
            

            //check user is logged in with token login.
                //get user details from localStorage

            const localUserDetails = {

                email : localStorage.getItem('email'),
                token : localStorage.getItem('token'),
                device : localStorage.getItem('device'),
            }
            await axios.post(`${ API_BASE_URL_AUTH}/tokenLogin`, localUserDetails)

            .then(res => {
        
              console.log(res.data.payload)
        
              if(res.data.payload === "Not Logged"){
        
                redirectToLogin()
              } else if (res.data.payload.token){

                //stor the new token in localStorage,

                localStorage.setItem("token" , res.data.payload.token)
                // send the job to DB,

                axios.post(`${API_BASE_URL_jobS}`, job)
                 .then(res => {

           //if this job was added show the user a success message and redirect him to the job page

                    setState(prevState => ({
                        ...prevState,
                        alertMessage : null,
                        successMessage : "your job was added to your personal job collection",
                        loading: false,
                    }));
                    setTimeout(() => {

                    // get the id of this job

                    let jobId = res.data._id;
                    redirectToThisjob(jobId)
                    }, 3500);  
                 }) 
                    
                 .catch(error => {

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
            alertMessage : "oops! you are missing some basic information about your job.",
            loading: false, 
        }));
    }
}  
    return(
        <div className="card col-12 col-lg-4 mt-2 hv-center AddJob">
        <form method="post">
            <h4 className = "cardTitle">Add your job:</h4>
        <div className="form-group text-left">
                <label htmlFor="exampleInputTitle">Title</label>
                <input type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Give your job a title"
                    value={state.title}
                    onChange={handleChange} 
                />
         </div>
         <div className="form-group text-left">
                <label htmlFor="exampleInputCategory">Category</label>
                <select  type="text" list = 'categories'
                    className="form-control" 
                    id= "category" 
                    value={state.category}
                    onChange={handleChange} 
                >
                    <option defaultValue>Select the appropriate category</option>
                    <option value="cakes">Cakes</option>
                    <option value="cookies">Cookies</option>
                    <option value="breads">Breads</option>
                    <option value="desserts">Desserts</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="fish">Fish</option>
                    <option value="salads">Salads</option>
                    <option value="spreads">Spreads</option>
                    <option value="pies ">Pies</option>
                    <option value="side_dishes">Side dishes</option>
                    <option value="soups">Soups</option>
                    <option value="pesach">Pesach</option>
                    <option value="others">Others</option>                   
                </select>
         </div>
         <div className="form-group text-left">
                <label htmlFor="exampleInputTitle">Description</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="description" 
                    placeholder="Write briefly about your job....."
                    value={state.description}
                    onChange={handleChange} 
                    rows="6"
                    cols="60"
                />
         </div>
         <div className="form-group text-left">
            <label htmlFor="exampleInputTitle">Ingredients</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="ingredients" 
                    placeholder="ex: 2 cup flour...."
                    value={state.ingredients}
                    onChange={handleChange} 
                    rows="6"
                    cols="60"
                />      
         </div>
         <div className="form-group text-left">
                <label htmlFor="exampleInputPreparations">Preparations</label>
                <textarea  type="text" 
                    className="form-control" 
                    id="preparations" 
                    placeholder= "ex: Put all the ingredients in a bowl......"
                    value={state.preparations}
                    onChange={handleChange} 
                    rows="6"
                    cols="60"
                />
         </div>
         <div className ="row g-3 form-group text-left ">
         <div className="col-md-6">
                <label htmlFor="exampleInputServings">Servings</label>
                <input  type="number" 
                    className="form-control" 
                    id="servings" 
                    value={state.servings}
                    onChange={handleChange} 
                />
                </div>
                 <div className="col-md-6 ">
                <label htmlFor="exampleInputPreparationTime">Preparation time</label>
                <input type="time" 
                       className="form-control" 
                       id="preparation_time" 
                       time={state.preparation_time}
                       onChange={handleChange} 
                />             
                </div>
         </div>
            <div className="alert alert-success mt-2" style = {{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style = {{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-success"
                    onClick={handleSubmitClick}
                >                
                   <span> Add this job  &nbsp; </span> 
                   <span><ClassicSpinner size = {20} color = "#14660f" loading = {state.loading} /></span> 
                    
                    </button>
                
         </form>
         
         </div>                        
    )
}
export default withRouter(AddJob) 