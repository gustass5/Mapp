import React, { Component } from "react";
import SidebarComponent from "./SidebarComponent.js";

class Sidebar extends Component{

        render(){
            return(
                <div className = "mainSidebar">
                    <div className = "placeholder01">
                        mapp
                    </div>
                    <div className = "sidebarComponents">
                        <SidebarComponent
                            name = "Home"
                            id = "home"
                            windowIndex = {0}
                            eventEmitter = {this.props.eventEmitter}
                        />

                        <SidebarComponent
                            name = "Todo List"
                            id = "todoList"
                            windowIndex = {1}
                            eventEmitter = {this.props.eventEmitter}
                        />

                        <SidebarComponent
                            name = "Workouts"
                            id = "workouts"
                            windowIndex = {2}
                            eventEmitter = {this.props.eventEmitter}
                        />

                        <SidebarComponent
                            name = "Projects"
                            id = "projects"
                            windowIndex = {3}
                            eventEmitter = {this.props.eventEmitter}
                        />

                        <SidebarComponent
                            name = "Screen"
                            id = "screen"
                            windowIndex = {4}
                            eventEmitter = {this.props.eventEmitter}
                        />
                        </div>
                </div>
            );
        }
    }
export default Sidebar;
