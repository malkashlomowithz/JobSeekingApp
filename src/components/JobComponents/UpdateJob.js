import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../JobComponents/AddJob.css'
import {API_BASE_URL_jobS} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";

function Updatejob(props) {

 //get all the details of the job
 
 const [data, setData] =  useState([]);

 useEffect(() => {

    const  fetchData =  async () => {

        const jobId = window.location.pathname.split('/')[2];    
        
        await axios(`${API_BASE_URL_jobS}/${jobId}`)

        .then(res => {

            setData([res.data])  
        })
        .catch(error => {
            console.log(error)
        })         
    };

    fetchData();

  }, []);


 const [state , setState] = useState({
        title: "",
        category: "",
        description: "",
        ingredients:"",
        preparations: "",
        servings: "",
        preparation_time: "",
        image: "",
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
    async function  handleSubmitClick(e){
        e.preventDefault();
// check user filed in the fieleds
        if( state.title.length && state.category.length && state.ingredients.length && state.preparations.length){
                
            const job = {
                title: state.title,
                category: state.category,
                description: state.description,
                ingredients: state.ingredients,
                preparations: state.preparations,
                servings: state.servings,
                preparation_time: state.preparation_time,
                image: state.image, 
                created_by: localStorage.getItem('email') 
            }  
            console.log(job)

            axios.put(`${API_BASE_URL_jobS}`, job)
            .then(res => {

                if(res.status === 200){

           //if this job was added show the user a success message and redirect him to the job page

                    setState(prevState => ({
                        ...prevState,
                        alertMessage : null,
                        successMessage : "your job was added to your personal job collection"
                    }));
                    setTimeout(() => {
            // get the id of this job 
                        let jobId = res.data._id;
                        redirectToThisjob(jobId)
                    }, 3500)                    
                }  else{ 
                    setState(prevState => ({
                        ...prevState,
                        alertMessage : "oops! Please try again there is a server issue."
                    }));
                }    
            })
            .catch(error => {
                console.error(error)
            })         
        }else{

            // in case job was not added show the user a alert message

            setState(prevState => ({
                ...prevState,
                alertMessage : "oops! you are missing some basic information about your job."
            }));
        }
    }
    return(
        <div className="card col-12 col-lg-4 mt-2 hv-center AddJob">
            {data.map(item => ( 
        <form key = {item._id}>
            <h4 className = "cardTitle">Update your job:</h4>
        <div className="form-group text-left">
                <label htmlFor="exampleInputTitle">Title</label>
                <input type="text" 
                    className="form-control" 
                    id="title" 
                    
                   
                    value={item.title}
                    
                    onChange={handleChange} 
                />
         </div>
         <div className="form-group text-left">
                <label htmlFor="exampleInputCategory">Category</label>
                <select  type="text" list = 'categories'
                    className="form-control" 
                    id= "category" 
                    defaultValue = {item.category}
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
                    <option value="spreads ">Spreads</option>
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
                    //placeholder="Write briefly about your job....."
                    defaultValue={item.description}
                    value = {state.description}
                    
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
                    //placeholder="ex: 2 cup flour...."
                    defaultValue = {item.ingredients}
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
                    //placeholder= "ex: Put all the ingredients in a bowl......"
                    defaultValue = {item.preparations}
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
                    defaultValue = {item.servings}
                    value={state.servings}
                    onChange={handleChange} 
                />
                </div>
                 <div className="col-md-6 ">
                <label htmlFor="exampleInputPreparationTime">Preparation time</label>
                <input type="time" 
                       className="form-control" 
                       id="preparation_time" 
                       defaultValue ={ item.preparation_time}
                      value={state.preparation_time}
                       onChange={handleChange} 
                />             
                </div>
         </div>
         {/* <div className="form-group text-left">
                    <label htmlFor="exampleInputImage">Upload a picture</label>
                    <input type="file" 
                    className="form-control" 
                    id="image" 
                    defaultValue = {item.image}
                    updatedvalue ={state.image}
                    onChange={handleChange }                 
                    />             
                </div> */}
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
                >Update</button>
         </form>
            ))}
         
         </div>                        
    )
}
export default withRouter(Updatejob) 