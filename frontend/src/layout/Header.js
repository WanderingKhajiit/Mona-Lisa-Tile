import React from "react";
import { Link } from "react-router-dom"


function Header(){
    return(
    <header>
        <nav>
            <Link to="/home" className="navAnchor">Home</Link>
            <Link to="/jobs" className="navAnchor">Prior Jobs</Link>
            <Link to="/contacts" className="navAnchor">Contact Us</Link>
        </nav>
    </header>
    )
}

export default Header