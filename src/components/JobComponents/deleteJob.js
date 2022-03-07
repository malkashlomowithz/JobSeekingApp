import axios from 'axios';
import{ API_BASE_URL_JOBS} from '../../constants/apiConstants';






export default function deleteJob(  id ) {

    console.log(id)

    if(window.confirm(`האם אתה בטוח שברצונך למחוק משרה זו?`)){

        axios.delete(`${API_BASE_URL_JOBS}/deleteJob?id=${id}`,)
          .then(res => {
              console.log(res)
            if(res.data.payload.affectedRows === "1"){
    
            // send the user back to his collection.

                window.location.href = "/UsersJobs"
                          
            }
          })
          .catch(error => {
              console.error(error)
          })
      }  
}
