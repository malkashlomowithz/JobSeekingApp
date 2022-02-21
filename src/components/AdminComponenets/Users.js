import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { API_BASE_URL_ADMIN, API_BASE_URL_PREMIUM} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function Users() {

    const [data, setData] =  useState([]); 

 //get users from DB

    useEffect(() => {

      const  fetchData =  async () => {

        const data = {"email" : localStorage.getItem('email'),
                      "token" : localStorage.getItem('token')}

         await axios.post(`${API_BASE_URL_ADMIN}/seeAllUsers`, data)
         .then(res => {

             setData(res.data.payload);
         })
         .catch(error => {

            console.log(error)
         })
      };  
       fetchData();  
    }, []);

    //this function will delete the selected user from table
 
    async function deleteUser(id){

       let userId = id.toString()

        if(window.confirm(`Are you sure you want to delete this user?`)){

          let user = {"id": userId}

          await axios.post(`${ API_BASE_URL_ADMIN}/deleteUser`,user)
              .then(res => {

                if(res.data.status === 200){
            
                    window.alert("user was deleted")
                }
              })
              .catch(error =>{
                window.alert(error)
            })
        }
    }
  async function addPremiumUser(email , nickname){
    if(window.confirm(`Are you sure you want to add this user as a premium user?`)){

        let thisUser = {"email": email,
                        "nickname": nickname}

        await axios.post(`${API_BASE_URL_PREMIUM}/addPremiumUser`,thisUser)
            .then(res => {

              if(res.data.status === 200){
          
                  window.reload()
              }
            })
            .catch(error =>{
                alert(error)
            })

        }
  }  
   

    return(

        <div>
            <div style = {{width: "70%",margin:"auto"}}>
            <h3>All users</h3>
            
            <table className = "table "style={{border:"2px solid #f5a267"}} >
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nickname</th>
                    <th>Email</th>
                    <th>Joined date</th>
                    <th>Last logged</th> 
                </tr>
                </thead>               
                <tbody >
                {data.map(item => (
                <tr key = {item.id}>
                    <td >{item.id}</td>
                    <td >{item.nickname}</td>
                    <td>{item.email}</td>
                    <td>{(item.joined_date).slice(0,10)}</td>
                    <td>{(item.last_logged.slice(0,10))}</td>
                    <td onClick = {() => deleteUser(item.id)} 
                        style = {{cursor: "pointer", color: "green",font_weight: "bold"}}>
                            DELETE 
                    </td>
                    <td onClick = {() => addPremiumUser(item.email, item.nickname)} 
                        style = {{cursor: "pointer", color: "green", font_weight: "bold"}}>
                            ADD TO PREMIUM USERS 
                    </td>
                </tr>
                ))}
                </tbody>                
            </table>            
            </div>
        </div>
    )


}

export default withRouter(Users);




        
