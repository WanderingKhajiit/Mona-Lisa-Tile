import React from "react";
import { useNavigate } from "react-router-dom"
import hasPermission from "../perm/Permissions";
import { actions } from "../perm/Permissions";


export const JobForm = ({
    job,
    handleChange,
    submitHandler
  }) => {
    
      
     
  const history = useNavigate()

    return(
      
      
    <form onSubmit={submitHandler} className="formS" id="formS">
        <fieldset>
        <label htmlforfor="neighborhood">Job Site</label>
        <input 
        id="neighborhood" 
        type="text" 
        name="neighborhood"
        required={true} 
        value={job.neighborhood}
        onChange={handleChange}/>
        

        <label htmlforfor="picture">Proof</label>
        <input
        id="picture"
        type="file"
        name="picture"
        required={true}
        onChange={handleChange}
        />

        <label htmlforfor="worker">Worker</label>
        <input
        id="worker"
        type="text"
        name="worker"
        required={true}
        maxLength="100" 
        value={job.worker}
        onChange={handleChange}
        />

        <label htmlforfor="date">Date</label>
        <input
        id="date"
        type="date"
        name="date"
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        required={true}
        maxLength="100" 
        value={job.date}
        onChange={handleChange}
        />

        </fieldset>
        <button form="formS" type="submit">Submit</button>
        <button type="button" onClick={() => history('/jobs')}>Back</button>
    </form>
    )
}


export default JobForm