import React from 'react'
import './NavBar.css'
import Logo from './logo.png'
import { withRouter } from "react-router-dom";
import { ImUser } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";

 function NavBar(props){

    

    const loggedInAs = localStorage.getItem('nickname');
    const isLogged = localStorage.getItem('isLogged');

    const redirectToHome = () => {
        scrollToTop()
        props.history.push('/');  
    }   
    const redirectToAddJob =  () =>{
       
    //sends user to the top of the page to see the entire form,
                 scrollToTop()
        props.history.push('/AddJob');
     
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const redirectToLogin = () => {
        scrollToTop()
        
        props.history.push('/login');  
    }
    const redirectToRegister = () => {
        scrollToTop()
        
        props.history.push('/register');    
    }
    
    function UsersJobs(){
        scrollToTop()

        props.history.push('/UsersJobs'); 

}
    const Logout = () => {
        
        localStorage.clear();
        props.history.push('/');
       // window.location.reload();
    }

    return(
        <div className='nav'>
                
                     <img src={Logo} alt="description" onClick={() => redirectToHome()} className="navLogo"/> 
                
                <div >
                    <ul className = 'navLinks'>
                        
                        <li className = 'navLink' 
                            onClick={() => redirectToAddJob()}>הוסף משרה חדשה</li>
                        <li className = 'navLink' onClick={() => UsersJobs()}> ראה את כל המשרות </li>
                        <li  className = 'navLink' style={{display: isLogged === 'true'  ? 'none' : 'inline-block' }} 
                            onClick={() => redirectToLogin()}>התחבר</li>
                        <li style={{display: isLogged === 'true'  ? 'none' : 'inline-block' }} className = 'navLink' onClick={() => redirectToRegister()}>צור חשבון</li>
            
                        <li className = 'isLogged' style={{display: isLogged === 'true'  ? 'block' : 'none' }}><ImUser/> שלום {loggedInAs}!</li>
                        <li className = 'Logout' style={{display: isLogged === 'true'  ? 'block' : 'none' }}onClick={() => Logout()}><BiLogOut/> התנתק</li>
                        
                    </ul>
                </div> 
  
                               

        </div>
    )
}
export default withRouter(NavBar)