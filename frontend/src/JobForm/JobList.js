import React from "react"
import { Link } from "react-router-dom";
//URL.createObjectURL(new Blob([Buffer.from(
export const JobList = ({ jobs, url }) => {

 
  if(jobs.length){
    return jobs.map((job, index) => {
        return (
          <>
            <div className="list">
              <div className="list-child" key={index}>
                <p className="listing">{job.neighborhood}</p>
                <><img className="center" alt="waiting" src={job.picture}/></>
                <p className="listing">{job.worker}</p>
                <p className="listing">{job.date}</p>
              <Link
              to={`/jobs/${job.job_id}/edit`}
              >
              <button className="listing">Edit</button>
              </Link>
              </div>
            </div>
          </>
        )
    })  
    }else{
      return(
        <div>
          <h4>No Jobs Listed</h4>
        </div>
      )
    }

}


export default JobList