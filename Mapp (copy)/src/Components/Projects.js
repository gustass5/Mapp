import React, { Component } from "react";

class Projects extends Component{
    constructor(){
        super();

        this.state ={
            projects: [],
            projectsIndex: 0,
            currentContent: null,
        }

        this.handleAddProject = this.handleAddProject.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.setItem = this.setItem.bind(this);
    }

    componentDidMount(){
        let tData = localStorage.getItem("projectsData");

        try {
            if(tData !== null){
                tData = JSON.parse(tData);
                this.setState(prevState => ({
                    projects: tData.projects,
                    projectsIndex: tData.projectsIndex
                }));

            }
        } catch (e) {
            // Do something if smt broken
            console.log("Error");
        }
    }

    handleProjectChange(e, index, type){
        let tItems = this.state.projects;

        if(type === "name"){
            tItems[index].name = e.target.value;

        }else if(type === "content"){
            tItems[index].content = e.target.value;
        }
        this.setState({
            projects: tItems
        }, this.setItem);
    }

    handleShow(e, index){
        this.setState({currentContent: this.state.projects[index]});
    }

    handleAddProject(e){
        let tIndex = this.state.projectsIndex;

        const newProject = {
            name: "",
            content: "",
            index: tIndex,
            id: String(Date.now())
        }

        tIndex++;

        this.setState({
            projects: this.state.projects.concat(newProject),
            projectsIndex: tIndex
        },this.setItem);

    }

    handleDelete(e, index){
        let tItems = this.state.projects;
        let tIndex = 0;
        let tIndex2 = this.state.currentContent;

        tItems.splice(index, 1);

        for(let i = 0; i < tItems.length; i++){
            tItems[i].index = i;
            tIndex = i+1;
        }

        if(tIndex2 !== null){
            if(tIndex === tIndex2.index){
                this.setState({currentContent: null});
            }
        }

        this.setState({
            projects: tItems,
            projectsIndex: tIndex
        }, this.setItem);


    }

    setItem(){
        localStorage.setItem("projectsData", JSON.stringify({
            projects: this.state.projects,
            projectsIndex: this.state.projectsIndex
          }));
    }
    render(){

        return(
            <div className = "projects">
                <div className = "sidebar">
                    <div className = "projectBtn"
                        onClick = {this.handleAddProject}
                    >
                        Add new Project
                    </div>

                    {this.state.projects.map(item =>{
                        return(
                            <div key = {item.id} className = "element">
                                <input className = "projectInputHeader"
                                    onChange = {(e) =>{
                                        this.handleProjectChange(e, item.index, "name");
                                    }}

                                    onClick = {(e) => {
                                        this.handleShow(e, item.index);
                                    }}

                                    value = {item.name}
                                    placeholder = "Name"
                                >
                                </input>

                                <div
                                    className = "deleteBtn"
                                    onClick = {(e) => {this.handleDelete(e, item.index)}}
                                    >
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className = "content">
                        {this.state.currentContent !== null ?
                            <textarea className = "projectContent" type = "text"
                                onChange = { (e) => {
                                    this.handleProjectChange(e, this.state.currentContent.index, "content")
                                }}
                                value = {this.state.currentContent.content}
                                >
                            </textarea>
                            :
                            ""
                        }

                </div>
            </div>
        );
    }
}

export default Projects;
