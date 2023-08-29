import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listJobs, convertToBase64URL } from "../utils/api";
import JobList from "../JobForm/JobList"

export default function JobMenu(){

const [jobs, setJobs] = useState([]);
    
useEffect(loadJobs, [])
function loadJobs(){
  const abortController = new AbortController();

  listJobs(abortController.signal)
    .then(setJobs)

  return () => abortController.abort()
  };

    return(
        <>
        <div>
          <Link to={"/jobs/new"}><div className="links">New Listing</div></Link>
        </div>
        
        <div>
          <JobList
          jobs={jobs}
          />
        </div>
        </>
    )
}