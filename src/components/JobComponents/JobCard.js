import React from 'react'
import './JobCard.css'
import {Card} from 'react-bootstrap'
import  pic  from './image.jpg'

export default function JobCard({job}) {

    return (
        <div>
            <Card className = "JobCard mt-3" > 

               <Card.Img   variant="top" src = {pic} className ='caredImage'/>
               
               <div className='card-text text-muted'>
               <small className="text-muted">Added on: {(job.added_date).slice(0,10)}</small>
               </div>
                       
               <Card.Title className='card-text'>{job.name}</Card.Title> 
               
               <Card.Body >
               
                {job.place}
                
 
               </Card.Body>
   
            </Card>  
            
        </div>
    )
}
