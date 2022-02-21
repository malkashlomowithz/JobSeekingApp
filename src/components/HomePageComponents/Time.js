import React, {useState, useEffect } from 'react';
import axios from 'axios';

function Time() {

    const [data, setData] =  useState([]);
 
     useEffect(() => {
    const  fetchData =  async () => {

    
      await axios(`http://worldtimeapi.org/api/ip`)

      .then(res => {

        setData(res.data.datetime);
      })
      .catch(error => {

        console.log(error)
      })
    }; 
    fetchData();
  }, []);

    return (

        <div>
         <p> Today's date: <span style={{color: "#eb6e15"}} >{data.slice(0,10)}</span>  The time is now: <span style={{color: "#eb6e15"}}>{data.slice(11,16)}</span> 
         </p>
        </div>
    )
}
export default Time