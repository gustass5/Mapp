import React, { Component } from "react";
import PropTypes from 'prop-types';

class NavComponent extends Component{
    render(){
        return(
            <div className = "navComponent">
                <div className = "navElement">
                    {this.props.name}
                </div>
            </div>
        );
    }


}

export default NavComponent;

NavComponent.propTypes = {
        name: PropTypes.string
};
