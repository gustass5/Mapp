import React, { Component } from 'react';

class Workout extends Component{
    constructor(){
        super();

        this.state = {
            workoutTypes: [],
            workoutTypesIndex: 0,
            currentWorkout: null,
            showIndex: 0,
        }

        this.handleAddType = this.handleAddType.bind(this);
        this.handleAddWorkout = this.handleAddWorkout.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleWorkoutNameChange = this.handleWorkoutNameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleWorkoutClick = this.handleWorkoutClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.setItem = this.setItem.bind(this);
    }

    componentDidMount(){
        let tData = localStorage.getItem("workoutData");

        try {
            if(tData !== null){
                tData = JSON.parse(tData);
                this.setState(prevState => ({
                    workoutTypes: tData.workoutData
                }));

                if(tData.typesIndex !== null){
                    this.setState(prevState => ({
                        workoutTypesIndex: tData.typesIndex
                    }));
                }
            }
        } catch (e) {
            // Do something if smt broken
            console.log("Error");
        }
    }

    handleShow(e, index){
        this.setState({showIndex: index});
    }

    handleWorkoutClick(e, index, typeIndex){
        this.setState({
            currentWorkout: this.state.workoutTypes[typeIndex].workouts[index],
        });

    }

    handleAddType(){
        let tIndex = this.state.workoutTypesIndex;

        const newWorkoutType = {
            name: "",
            workouts: [],
            index: tIndex,
            indexW: 0 ,//workouts array index
            id: String(Date.now())
        }
        tIndex++;

        this.setState({
            workoutTypes: this.state.workoutTypes.concat(newWorkoutType),
            workoutTypesIndex: tIndex
        },this.setItem);

    }

    handleAddWorkout(e, index){
        let tItems = this.state.workoutTypes;
        let tIndex = tItems[index].indexW;

        const newWorkout = {
            name: "",
            content: "",
            index: tIndex,
            id: String(Date.now())
        }

        tIndex++;

        tItems[index].workouts = tItems[index].workouts.concat(newWorkout);
        tItems[index].indexW = tIndex;

        this.setState({
            workoutTypes: tItems
        });

        this.setItem();

    }

    handleTypeChange(e, index){
        let tItems = this.state.workoutTypes;
        tItems[index].name = e.target.value;
        this.setState({workoutTypes: tItems});
        this.setItem();
    }

    handleWorkoutNameChange(e, index, typeIndex){
        let tItems = this.state.workoutTypes;

        tItems[typeIndex].workouts[index].name = e.target.value;

        this.setState({
            workoutTypes: tItems
        });

        this.setItem();
    }

    handleContentChange(e, index, typeIndex){
        let tItems = this.state.workoutTypes;

        tItems[typeIndex].workouts[index].content = e.target.value;

        this.setState({
            workoutTypes: tItems
        });

        this.setItem();
    }

    handleDelete(e, index, typeIndex, type){
        let tItems = this.state.workoutTypes;
        let tIndex = 0;

        if(type === 1){ // 1 = delete workout 0 = delete workoutType

            tItems[typeIndex].workouts.splice(index, 1);

            for(let i = 0; i < tItems[typeIndex].workouts.length; i++){
                tItems[typeIndex].workouts[i].index = i;
                tIndex = i+1;
            }

            tItems[typeIndex].indexW = tIndex;


            this.setState({
                workoutTypes: tItems,
                currentWorkout: null
            }, this.setItem);

        }else if(type === 0){
            tItems.splice(typeIndex, 1);

                for(let i = 0; i < tItems.length; i++){
                    tItems[i].index = i;
                    tIndex = i+1;
                }

                this.setState({
                    workoutTypes: tItems,
                    workoutTypesIndex: tIndex,
                    currentWorkout: null
                }, this.setItem);

        }
    }

    setItem(){
        localStorage.setItem("workoutData", JSON.stringify({
            workoutData: this.state.workoutTypes,
            typesIndex: this.state.workoutTypesIndex
          }));
    }

    render(){

        return(
            <div className = "workout">
                <div className = "sidebar">
                    <div className = "addType"
                        onClick = {this.handleAddType}
                        >
                        Add workout type
                    </div>

                    {this.state.workoutTypes.map(item => {
                        return(
                            <div className = "element" key = {item.id}>
                                <input className = "input"
                                    onChange = {(e) =>{
                                        this.handleTypeChange(e, item.index);
                                    }}
                                    value = {item.name}
                                    placeholder = "Type"

                                    onClick = {(e) => {
                                        this.handleShow(e, item.index);
                                    }}
                                >
                                </input>

                                <div
                                    className = "workoutCloseBtn type"
                                    onClick = {(e) => {this.handleDelete(e, 0, item.index, 0)}}
                                    >
                                </div>

                                <div className = "sidebar">
                                    {this.state.showIndex === item.index ? item.workouts.map(workout => {

                                        return <div key = {workout.id}>
                                                <input
                                                    className = "workoutName"
                                                    value = {workout.name}
                                                    placeholder = "Workout"
                                                    onChange = {(e) => {
                                                        this.handleWorkoutNameChange(e, workout.index, item.index);
                                                    }}
                                                    onClick = {(e) =>{
                                                        this.handleWorkoutClick(e, workout.index, item.index);
                                                    }}
                                                    >
                                                </input>

                                                <div
                                                    className = "workoutCloseBtn"
                                                    onClick = {(e) => {this.handleDelete(e, workout.index, item.index, 1)}}
                                                    >
                                                    &#x2716;
                                                </div>
                                            </div>
                                    }) : ""}
                                </div>

                                <div className = "addWorkout"onClick = {(e) => {
                                        this.handleAddWorkout(e, item.index)
                                    }}>
                                    Add workout
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className = "content">
                    {this.state.currentWorkout !== null ?
                    <textarea className = "workoutContent" type = "text"
                        onChange = { (e) => {
                            this.handleContentChange(e, this.state.currentWorkout.index, this.state.showIndex)
                        }}
                        value = {this.state.currentWorkout.content}
                        >
                    </textarea>
                    :
                    ""}
                </div>
            </div>
        );
    }
}

export default Workout;
