import React, {useState} from 'react';
import './JobPage.css'
import {GoLinkExternal} from 'react-icons/go'
import {RiDeleteBin2Line} from 'react-icons/ri'
import deleteJob from './deleteJob'
import axios from 'axios';
import {API_BASE_URL_JOBS} from '../../constants/apiConstants';


function JobPage({job}) {

    //get job id from url

    const jobId =  window.location.href.split('/')[4]
    //set state 
    const [state , setState] = useState({isOpen1:false, isOpen2:false,});
    const [status , setStatus] = useState(job.status);
    const [sentTo , setsentTo] = useState(job.sentTo);

        const showInput1 = () => setState({isOpen1: true, isOpen2: false }); 
        const showInput2 = () =>  setState({isOpen2: true, isOpen1: false })
   
    const sendStatusToDB = async() => {
        let update = {
            id: jobId,
            status: status
        }
        await axios.put(`${API_BASE_URL_JOBS}/updateStatus`, update)
        .then(async res => {
     
           setStatus(res.data.payload.Table[0].status)
           setState({ isOpen1:false})
        })
        .catch(error =>{
            console.log(error)
        }) 
    } 
    const sendSentToToDB = async() => {
        let update = {
            id: jobId,
            sentTo: sentTo
        }
        await axios.put(`${API_BASE_URL_JOBS}/updateSentTo`, update)
        .then(async res => {

           setsentTo(res.data.payload.Table[0].sentTo)
           setState({ isOpen2:false})
        })
        .catch(error =>{
            console.log(error)
        }) 
    } 
    //RegExp to check if text is hebrew or not

        const onlyHebrewPattern = new RegExp(/[\u05D0-\u05FF]+/);

    return (
        <>         
        <div className = 'page  card col-12 col-lg-4 '>              
            <h3 className='card-header'> {job.title}</h3>
            <div className=" bodyPage">
                <small> שם החברה: {job.name}</small>
                <h5 className='right' >פרטי המשרה:</h5>
                <p  className = {onlyHebrewPattern.test(job.details) === true  ? 'right' : 'left'} >
                    {job.details}     
                </p>
                 <h5 className='right'> מיקום המשרה:
                <small> {job.place} </small>
                </h5> 
                <h5 className='right'> סטטוס:
                    <small> {status} </small> <br/>
                    <small className='pointer' onClick={showInput1}> ( עריכה )</small>
                    <div style={{display: state.isOpen1 === true  ? 'block' : 'none' }}>
                    <div className="text-right input-group  mt-4">
                    <input className='form-control' 
                    type="text" list = 'categories'                  
                    id= "status" 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
               />
                    <button className='btn' type="button"  
                    onClick={()=>sendStatusToDB()}><small>עדכן</small></button>  
                    </div>
                    </div>
                </h5>
                <h5 className='right'> שלחתי קורות חיים ל- 
                    <small> {sentTo} </small> <br/>
                    <small className='pointer' onClick={showInput2}> ( עריכה )</small>
                    <div style={{display: state.isOpen2 === true  ? 'block' : 'none' }}>
                    <div className="text-right input-group  mt-4">
                    <input className='form-control' 
                    type="text" list = 'categories'                  
                    id= "sentTo" 
                    value={sentTo}
                    onChange={e => setsentTo(e.target.value)}
               /> <br/>
                    <button className='btn' type="button"  
                    onClick={()=>sendSentToToDB()}><small>עדכן</small></button>  
                    </div>
                    </div>
                 </h5>
                 <h6 className='right'>נשלח בתאריך {job.added_date.slice(0,10)}</h6>

                <div className='text-center'>
                    <a href={job.link } target="_blank" rel="noreferrer">
                        <button className='thisButton'> לדף המשרה <GoLinkExternal className='GoLink'/></button>
                    </a>
                    <a href={job.clink } target="_blank" rel="noreferrer"> 
                        <button className='thisButton'> לאתר החברה <GoLinkExternal className='GoLink'/></button>
                    </a> 
                    <button className='thisButton' onClick={() => deleteJob(job.id)}>מחק משרה <RiDeleteBin2Line className='GoLink'/></button>
                </div> 
            </div>      
        </div>   
        </>   
    )
}

export default (JobPage)