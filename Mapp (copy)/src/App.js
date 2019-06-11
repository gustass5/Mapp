import React, {Component} from "react";
import { EventEmitter } from 'events';
import Sidebar from "./Components/Sidebar.js";
import Content from "./Components/Content.js";
//import "./css/app.css";
import "./css/main.css";

class App extends Component{
    constructor(){
        super();

        this.state = {
            isNavigationEnabled: true,
            currentHeight: 652
        };
    }

    componentWillMount(){
        this.eventEmitter = new EventEmitter();
    }


    render(){

        return(
            <div className = "app" id = "app">

                <Sidebar eventEmitter = {this.eventEmitter}/>
                <div className = "mainHeader"></div>
                <Content eventEmitter = {this.eventEmitter}/>
            </div>
        );
    }
}

export default App;
