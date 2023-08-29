import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home"
import Contact from "./Contact"
import JobEdit from "../JobForm/JobEdit"
import JobMenu from "../list/Menu";
import JobNew from "../JobForm/NewJob";

function Router(){
    return(
<Routes>
    <Route exact={true} path="/" element={ <Navigate to="/home"/> }/>
    <Route exact={true} path="/home" element={ <Home/> }/>
    <Route exact={true} path="/jobs" element={ <JobMenu/> }/>
    <Route exact={true} path="/jobs/new" element={ <JobNew/> }/>
    <Route exact={true} path="/jobs/:job_id/edit" element={ <JobEdit/> }/>
    <Route exact={true} path="/contacts" element={ <Contact/> }/>
</Routes>
    
)}

export default Router
