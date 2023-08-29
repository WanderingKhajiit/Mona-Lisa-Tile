import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "./JobForm";
import { updateJob, readJobs, convertToBase64URL } from "../utils/api";
import Jobs from "./JobRead";


export default function JobEdit(){
    const initialJobState = {
        neighborhood: "",
        picture: [],
        worker: "",
        date:""
      };
   const { job_id } = useParams();

   const [job, setJob] = useState({
    ...initialJobState,
  });

  const history = useNavigate()

async function handleChange ({ target }) {
    if(target.name === "picture"){
        const file = target.files[0]
        if(file){
            try{
                const base64DataURL = await convertToBase64URL(file)   
                setJob({
                    ...job,
                    [target.name]: base64DataURL
                });
                 
            }catch(error){
                console.error('Error converting file to base64:', error)
            } 
        }
        
        
    }else{
        setJob({
            ...job,
            [target.name]: target.value,
    });
    }
  };

const submitHandler = async (event) => {
  event.preventDefault();
  const abortController = new AbortController()
  
  try {
    //console.log(job)
    await updateJob(job, job_id, abortController.signal)
    .then(history('/jobs'))
    console.log("Job updated");

    // Additional handling for the updated job, if needed
} catch (error) {
    console.error("Error updating job:", error);
} 
    return () => abortController.abort();
};

useEffect(() => {
    const abortController = new AbortController()
    //console.log(job_id)
    readJobs(job_id, abortController.signal)
    .then((dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0) {
            // Assuming the job data is an object within the array
            const fetchedJob = dataArray[0];
            //console.log("edit", fetchedJob);
            setJob(fetchedJob);
    }})
    .catch((error) => {
            console.error("Error fetching job:", error);
        });

    return () => abortController.abort();
}, [job_id])
  

    return (
        <>
        <section>
            <h2 className="titles">Edit Job:</h2>
            <JobForm
            job={job}
            handleChange={handleChange}
            submitHandler={submitHandler}/>
        </section>
        <section>
            <Jobs
            job={job}/>
        </section>
        
        </>
    )
}