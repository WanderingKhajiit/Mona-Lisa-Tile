import React, { useState } from "react";
import JobForm from "./JobForm";
import { createJobs, convertToBase64URL} from "../utils/api"
import { useNavigate } from "react-router";

export const JobNew = () => {
    const initialJobState = {
      neighborhood: "",
      picture: [],
      worker: "",
      date:""
    };
    const [job, setJob] = useState({
        ...initialJobState,
      });
    
    const [base64URL, setBase64URL] = useState("")


    const history = useNavigate()


    const handleChange = async ({ target }) => {
      if(target === "picture"){
        const file = target.files[0]
        const base64DataURL = await convertToBase64URL(file)   
        setBase64URL(base64DataURL);
        
    }else{
      setJob({
  
        ...job,
  
        [target.name]: target.value,
  
      });
    }
  
    };

const submitHandler = async (event) => {
    
    const abortController = new AbortController()
    
    await createJobs(job, abortController.signal)
    .then(setJob(initialJobState))
    .then(history('/jobs'));
    console.log("it is working")
    
    
    return () => abortController.abort();
  };


  return (
    <div>
    <section>
      <h2>New Job:</h2>
      <JobForm
        job={job}
        url={base64URL}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </section>
    </div>
  );
}


/*const submitHandler = (event) => {
  event.preventDefault();
  const abortController = new AbortController()
  console.log("it is working", jobs)
  createJob(job)
  setJob({...initialJobState})
};*/

export default JobNew