import React, {Component} from "react";
import Home from "./Home.js";
import TodoList from "./TodoList.js";
import Workout from "./Workout.js";
import Projects from "./Projects.js";
import Screen from "./Screen.js";

class Content extends Component{
    constructor(){
        super();

        this.state = {
            contentComponents: [],
            index: 0,
            windowIndex: 0
        }
    }


    componentWillMount(){
        this.props.eventEmitter.addListener("changeWindowIndex", (index) =>{
            this.setState({
                windowIndex: index
            });
        });
    }

    render(){

        let currentWindow;

        switch(this.state.windowIndex){
            case 0:
                currentWindow = <Home />
            break;
            case 1:
                currentWindow = <TodoList />
                break;
            case 2:
                currentWindow = <Workout />
                break;
            case 3:
                currentWindow = <Projects />
                break;
            case 4:
                currentWindow = <Screen />
                break;
            default:
                currentWindow = <Home />
        }

        return(
            <div className = "content" id = "content">
                {currentWindow}
            </div>
        );
    }

}

export default Content;
