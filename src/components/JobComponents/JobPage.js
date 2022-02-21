import React from 'react'
import './JobPage.css'
import {FaUtensils} from 'react-icons/fa'
import { FaClock } from 'react-icons/fa'


 function JobPage({job}) {

    return (
        <div className = 'page'> 
           <h1 className = 'jobTitle'>{job.title}</h1> 
           <h4 className = 'text-muted'>{job.description}</h4>
           <div className='info'>
           <table className = ' container'>
           <tbody>
  
               <tr>
                    <th><FaUtensils /> Servings:</th>
                    <th>< FaClock/> Preparation time:</th>    
                </tr>
                <tr>
                    <td>{job.servings}</td>
                    <td>{job.preparation_time}</td>
                </tr> 
            </tbody>
           </table>
           </div>
           <div className = "imageCon">
                <img className = 'pageImg' src={`http://localhost:3000/images/${job.file}`} alt = 'recip'/>
            <div>
                    
                </div>
            </div>
           
           <h2>Ingredients:</h2>
           <textarea  
                type="text" 
                value={job.ingredients}
                className = "textarea" readOnly
           />
           <h2>Preparations:</h2>
           <textarea 
                type="text" 
                value={job.preparations}
                className = "textarea" readOnly
            />
        </div>
    )
}

export default (JobPage)