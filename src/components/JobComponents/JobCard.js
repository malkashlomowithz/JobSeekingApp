import React from 'react'
import './JobCard.css'
import {Card} from 'react-bootstrap'
import { IoIosTimer } from 'react-icons/io'

export default function JobCard({job}) {

    const nickname = localStorage.getItem("nickname")
    return (
        <div>
            <Card className = "JobCard" > 

               <Card.Img   variant="top" src = {`images/${job.file}`} className ='caredImage'/>
               
               <div className='card-text text-muted'>By {nickname} <br/>
               <small className="text-muted">Added on: {(job.created_at).slice(0,10)}</small>
               </div>
                       
               <Card.Title className='card-text'>{job.title}</Card.Title> 
               
               <Card.Body >
               
               <IoIosTimer className = "timer" /> {job.preparation_time}
 
               </Card.Body>
   
            </Card>  
            
        </div>
    )
}
