import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL_AUTH} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import{ GoThumbsup, GoThumbsdown} from "react-icons/go";

function EditProfile(props) {
    const [state , setState] = useState({
        name : "",
        nickname : "",
        successMessage: null,
        alertMessage: null
    })
    //get information from localStorage.

    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    //const getUser

    const handleSubmitClick = (e) => {

        e.preventDefault();
        
        if(state.nickname.length && state.name.length && email.length && token.length) {

            const user={
                "name":state.name,
                "nickname":state.nickname,
                "email":email,
                "token":token,
            }
            axios.post(`${ API_BASE_URL_AUTH}/EditProfile`, user)
            .then(async response => {

                console.log(response)
                
                localStorage.setItem("nickname", state.nickname)
                
                    setState(prevState => ({
                        ...prevState,
                        successMessage : 'we have updated your account',
                        alertMessage : null
                    }));
                    setTimeout(() => {                       
                        redirectToHome()
                      }, 5000);       
            })
            .catch(async error => {
                setState(prevState => ({
                    ...prevState,
                    successMessage : null,
                    alertMessage : error
                }));

            })
        }else {
            setState(prevState => ({
                ...prevState,
                successMessage : null,
                alertMessage : "You are not logged in"
            }));
            setTimeout(() => {
                redirectToLogin()
              }, 5000);


        }    
           
    }
    const redirectToHome = () => {
        
        props.history.push('/');
       
    }
    const redirectToLogin = () => {
        
        props.history.push('/login');
       
    }
    

   

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <h4>Edit your profile:</h4>
                <p id="UsersEmail" className=" text-muted">For email address : {localStorage.getItem("email")}</p>    

            <div className="form-group text-left">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your name"
                        value={state.name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputNickname">Nickname</label>
                    <input type="text" 
                        className="form-control" 
                        id="nickname" 
                        placeholder="Nickname"
                        value={state.nickname}
                        onChange={handleChange}                 
                    />
                <small id="nicknameHelp" className="form-text text-muted">Other users will see you with this name.</small>

                </div>
                
                <div>                    
            </div>
           
               <button  
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Update
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsup/> </span>  {state.successMessage}
            </div>
            <div className="alert alert-danger mt-2" style={{display: state.alertMessage ? 'block' : 'none' }} role="alert">
              <span><GoThumbsdown/> </span>  {state.alertMessage}
            </div>
            
        </div>
    )
}

export default withRouter(EditProfile);