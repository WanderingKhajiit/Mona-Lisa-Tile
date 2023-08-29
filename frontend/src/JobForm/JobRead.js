import React from "react"
import { deleteJobs } from "../utils/api"
import { useNavigate } from "react-router"

function Jobs ({ job, url }){
const navigate = useNavigate()


if(job){
   
      return (
      <>
         <div className="list-read">
            <div className="list-child" key={job.job_id}>
               <p className="listing">{job.neighborhood}</p>
               <img className="center" src={job.picture} alt="waiting"/>
               <p className="listing">{job.worker}</p>
               <p className="listing">{job.date}</p>
                  <button className="listing" onClick={() => {
                     deleteJobs(job, job.job_id)
                     .then(navigate('/jobs'))}}>
                     Delete
                  </button>
            </div>
         </div>
            
      </>
         )}else{
            return(
               <><div>No Job Listed?</div></>
            )
         }    
}
    export default Jobs