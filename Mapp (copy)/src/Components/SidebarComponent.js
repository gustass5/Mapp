import React, { Component } from "react";
import PropTypes from 'prop-types';

class SidebarComponent extends Component{
    constructor(){
        super();
        this.state = {
            active: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.eventEmitter.addListener("changeActive", () => {
            this.setState({active: false});
        });
    }

    handleClick(e){
        this.props.eventEmitter.emit("changeWindowIndex", this.props.windowIndex);
        this.props.eventEmitter.emit("changeActive");
        this.setState({active: true})
    }

    render(){
        return(
            <div className = "sidebarComponent">
                <div className = {this.state.active === true ? "sidebarElement" +" "+ "active" : "sidebarElement"} onClick = {this.handleClick}>
                    <div className = "iconPlaceholder" id = {this.props.id}>
                    </div>
                    <a className = "item">
                        {this.props.name}
                    </a>
                </div>
            </div>
        );
    }
}

export default SidebarComponent;

SidebarComponent.propTypes = {
        name: PropTypes.string,
        id: PropTypes.string
};

SidebarComponent.defaultProps = {
    name: "No title"
};
