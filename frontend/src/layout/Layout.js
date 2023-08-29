import React from "react";
import Header from "./Header"
import Router from "./Routes"


function Layout(){
    return(
        <div>
            <div>
                <div>
                    <Header/>
                </div>
                <div>
                    <Router/>
                </div>
            </div>
        </div>
    )
}

export default Layout