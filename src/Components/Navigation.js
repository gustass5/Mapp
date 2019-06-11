import React, { Component } from "react";
import NavComponent from "./NavComponent.js"


class Navigation extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className = "navigation">
                <NavComponent name = "Home" />
                <NavComponent name = "ToDo" />
            </div>
        );
    }


}

export default Navigation;
