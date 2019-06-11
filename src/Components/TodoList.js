import React, {Component} from "react";
import { EventEmitter } from 'events';

class TodoList extends Component{
    constructor(){
        super();
        this.state = {
            items: [], //Todo list items array
            renderIndex: 0,
            index: 0, // Array index that new todo list item will be set to
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteElement = this.handleDeleteElement.bind(this);
        this.handleElementState = this.handleElementState.bind(this);
    }

    componentDidMount(){
            let tData = localStorage.getItem("todoListData");

            let tItems;
            let tIndex;

            try {
                if(tData !== null){
                    tData = JSON.parse(tData);

                    tItems = tData.items;
                    tIndex = tData.index;

                    this.setState(prevState => ({
                        items: tItems,
                        index: tIndex,

                    }));
                }
            } catch (e) {
                // Do something if smt broken
                console.log("Error");
            }
    }

    componentWillMount(){
          this.eventEmitter = new EventEmitter();

          this.eventEmitter.addListener("changeRenderIndex", (index) => {
              this.setState({
                  renderIndex: index
              });
          });

      }

      handleElementState(e, index, text){
          let tItems = this.state.items;

          if(text === "Done"){
              if(tItems[index].isDone === false){
                  tItems[index].isDone = true;

              }else{
                  tItems[index].isDone = false;

              }
          }else if(text === "Progress"){
              if(tItems[index].inProgress === false){
                  tItems[index].inProgress = true;

              }else{
                  tItems[index].inProgress = false;

              }
          }else if(text === "Future"){
              if(tItems[index].inFuture === false){
                  tItems[index].inFuture = true;

              }else{
                  tItems[index].inFuture = false;
              }
          }

          this.setState({
              items: tItems
          }, this.setItem);

      }

      handleDeleteElement(e, index){
          let tItems = this.state.items;
          let tIndex;

          tItems.splice(index, 1);

          for(let i = 0; i < tItems.length; i++){
              tItems[i].index = i;
          }

          tIndex = this.state.index - 1;

          this.setState({
              items: tItems,
              index: tIndex
          }, this.setItem);
      }

      setItem(){
              localStorage.setItem("todoListData", JSON.stringify({
                  items: this.state.items,
                  index: this.state.index
                }));
      }

    handleHeaderChange(e, index){
         let tItems = this.state.items;
         tItems[index].header = e.target.value;
         this.setState({ items: tItems});

         this.setItem();
    }

    handleContentChange(e, index){
        e.preventDefault();

        const {value} = e.target.value

        if(value === ""){
            return;
        }

         let tItems = this.state.items;
         tItems[index].content = e.target.value;
         this.setState({ items: tItems});

         this.setItem();

    }

    handleClick(e){
        e.preventDefault();
        let tIndex = this.state.index;

        const newItem = {
            header: "",
            content: "",
            id: String(Date.now()),
            index: tIndex,
            isDone: false,
            inProgress: false,
            inFuture: false,
        }
        tIndex++;

        this.setState({
            items: this.state.items.concat(newItem),
            index: tIndex,
        }, this.setItem);

    }

    render(){
        let itemsToRender = [];
        let itemsToRenderDone = [];
        let itemsToRenderProgress = [];
        let itemsToRenderFuture = [];

        let render;

        itemsToRender = this.state.items;

        for(let i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].isDone === true){
                itemsToRenderDone = itemsToRenderDone.concat(this.state.items[i]);
            }
        }

        for(let i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].inProgress === true){
                itemsToRenderProgress = itemsToRenderProgress.concat(this.state.items[i]);
            }
        }


        for(let i = 0; i < this.state.items.length; i++){
            if(this.state.items[i].inFuture === true){
                itemsToRenderFuture = itemsToRenderFuture.concat(this.state.items[i]);
            }
        }

        switch(this.state.renderIndex){
            case 0:
                render = itemsToRender;
                break;

            case 1:
                render = itemsToRenderDone;
                break;
            case 2:
                render = itemsToRenderProgress;
                break;
            case 3:
                render = itemsToRenderFuture;
                break;
            default:
                render = itemsToRender;
        }

        return(
            <div className = "todoList">

                <div className = "todoListSidebar">

                    <div className = "todoBtn">
                        <div
                            onClick = {this.handleClick}
                            className = "addTodoButton"
                            >
                            Add todo
                        </div>
                    </div>

                    <div className = "todoListSidebarContent">

                        <SidebarComponent eventEmitter = {this.eventEmitter}
                            name = "All"
                            renderIndex = {0}
                            itemCount = {this.state.items.length}
                            />
                        <SidebarComponent eventEmitter = {this.eventEmitter}
                            name = "Done"
                            renderIndex = {1}
                            itemCount = {itemsToRenderDone.length}
                            />
                        <SidebarComponent eventEmitter = {this.eventEmitter}
                            name = "In Progress"
                            renderIndex = {2}
                            itemCount = {itemsToRenderProgress.length}
                            />
                        <SidebarComponent eventEmitter = {this.eventEmitter}
                            name = "Future"
                            renderIndex = {3}
                            itemCount = {itemsToRenderFuture.length}
                            />

                    </div>
                </div>

                <div className = "todoListContent">
                    {render.map((item) => {
                        return(
                          <div className = "todoListContentComponent" key = {item.id}>
                                    <div className = "todoListContentComponentHeader">

                                        <input className = "todoListInputHeader"
                                            onChange = { (e) => {
                                                this.handleHeaderChange(e, item.index)
                                            }}
                                            value = {item.header}
                                            >
                                        </input>

                                        <div className ="todoListDeleteElement"
                                            onClick = {(e) => {
                                                this.handleDeleteElement(e, item.index)
                                            }}
                                            >
                                        </div>

                                    </div>

                                    <div className = "todoListContentComponentSidebar">

                                        <div className ={item.isDone === false ? "todoListDoneElement" : "todoListIsDoneElement"}
                                            onClick = {(e) => {
                                                this.handleElementState(e, item.index, "Done")
                                            }}
                                            >
                                        </div>

                                        <div className ={item.inProgress === false ? "todoListProgressElement" : "todoListInProgressElement"}
                                            onClick = {(e) => {
                                                this.handleElementState(e, item.index, "Progress")
                                            }}
                                            >
                                        </div>

                                        <div className ={item.inFuture === false ? "todoListFutureElement" : "todoListInFutureElement"}
                                            onClick = {(e) => {
                                                this.handleElementState(e, item.index, "Future")
                                            }}
                                            >
                                        </div>

                                    </div>

                                    <div className = "todoListContentComponentElement">

                                        <form>
                                            <textarea type = "text" cols = "31" rows = "9" className = "todoListInputContent"
                                                onChange = { (e) => {
                                                    this.handleContentChange(e, item.index)
                                                }}
                                                value = {item.content}
                                                >
                                            </textarea>
                                        </form>

                                        {item.text}
                                    </div>
                            </div>
                            )
                    })}
                </div>

            </div>
        );
    }

}

class SidebarComponent extends Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.eventEmitter.emit("changeRenderIndex", this.props.renderIndex);
    }

    render(){
        return(
            <div onClick = {this.handleClick} className = "todoListSidebarElement">
                {this.props.name}
                <div className = "itemsCount">
                    ({this.props.itemCount})
                </div>
            </div>
        )
    }
}

export default TodoList;
