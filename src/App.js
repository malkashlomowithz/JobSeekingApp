import React from 'react';
import './App.css';
import LoginForm from './components/LoginComponents/LoginForm';
import RegistrationForm from './components/RegistrationComponents/RegistrationForm';
import Confirm from './components/RegistrationComponents/confirm'
import ConfirmedEmail from './components/RegistrationComponents/ConfirmedEmail';
import SendEmail from './components/LoginComponents/SendEmail'
import NavBar from './components/HomePageComponents/NavBar'
import Footer from './components/HomePageComponents/Footer'
import ContactForm from './components/HomePageComponents/ContactForm'
import HomePage from './components/HomePageComponents/HomePage'
import NewPassword from './components/LoginComponents/NewPassword';
import AddJob from './components/JobComponents/AddJob'
import UsersJobs from './components/JobComponents/UsersJob';
import Job from './components/JobComponents/Job';
import AdminPage from './components/AdminComponenets/AdminComponents';
import NotFound from './components/Notfound'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";

function App() {

  const userIsLoggedIn  =localStorage.getItem("isLogged");
  const userIsAdmin  = localStorage.getItem("isAdmin");

  return (
    <div className="App">
                  
    <Router>
    <div>
    <NavBar/>

        <Switch>
          <Route exact path ="/">
            <HomePage />
            </Route>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/confirm">
              <Confirm/>
            </Route>
            <Route path="/confirmedEmail">
              <ConfirmedEmail/>
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/newPassword">
              <NewPassword/>
            </Route>
            <Route path="/sendEmail">
              <SendEmail/>
            </Route>                  
            <Route path="/job">
              <Job/>
            </Route>
            <Route path="/contact">
              <ContactForm/>
          </Route> 
          {userIsLoggedIn === "true" ? (
          <Route exact path="/AddJob" component = {AddJob}/>
          ):(<Redirect to = "/login" />)}
          {userIsLoggedIn === "true" ? (
          <Route exact path="/UsersJobs" component ={UsersJobs} />
          ):(<Redirect to = "/login" />)} 
          {userIsAdmin === "true" ? (
          <Route exact path="/admin" component = {AdminPage}/>
          ):(<Redirect to = "/" />)} 
           <Route path="/*">
              <NotFound/>
          </Route>
          </Switch>
               
     <Footer/>
     </div>
    </Router>
    </div>

  );
}

export default App;


