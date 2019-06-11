import React, { Component } from "react";
import YouTube from 'react-youtube';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const fs = electron.fs;
const {BrowserWindow, app} = window.require("electron").remote;
const url = window.require("url");
const path = window.require("path");

class Music extends Component{
    constructor(){
        super();

        this.state = {
            enterValue: "",
            playlists: [],
            currentMusic: [],
            playlistsIndex: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
        this.handlePLaylistNameChange = this.handlePLaylistNameChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handlePLay = this.handlePlay.bind(this);
    }

    handleChange(e){
        this.setState({
            enterValue: e.target.value
        });
    }

    handleSubmit(e){
        let tItems = this.state.playlists;
        let index = this.state.showIndex;
        let tIndex = tItems[index].indexM;


        const newSong = {
            name: "aaaaa",
            index: tIndex,
            link: this.state.enterValue,
            id: String(Date.now()),
        }

        tIndex++;

        tItems[index].music = tItems[index].music.concat(newSong);
        tItems[index].indexM = tIndex;

        this.setState({
            playlists: tItems,
            currentMusic: tItems[index].music
        });

    }

    handleAddPlaylist(e){
        let tIndex = this.state.playlistsIndex;

        const newPLaylist = {
            name: "",
            music: [],
            index: tIndex,
            indexM: 0,
            id: String(Date.now())
        }

        tIndex++;

        this.setState({
            playlists: this.state.playlists.concat(newPLaylist),
            playlistsIndex: tIndex
        });

    }

    handlePLaylistNameChange(e, index){
        let tItems = this.state.playlists;

        tItems[index].name = e.target.value;

        this.setState({
            playlists: tItems
        });
    }

    handleShow(e, index){
        this.setState({
            showIndex: index,
            currentMusic: this.state.playlists[index].music
        });

    }

    handlePlay(e, index){

        let songPlay = new BrowserWindow({
            webPreferences: {
                webSecurity: false
            }
        });

        songPlay.loadURL(`file:///home/gustas/Electron/everythin2/public/songPlay.html`);

    }

    render(){
        return(
            <div className = "music">
                <div className = "content">

                    <div className = "enter">
                        <input
                            onChange = {this.handleChange}
                            value = {this.state.enterValue}
                        >
                        </input>

                        <button
                            className = "enterSubmit"
                            onClick = {this.handleSubmit}
                            >
                            submit
                        </button>
                    </div>

                    <div className = "playlistContent">
                        {this.state.currentMusic.map(song => {
                            return(
                                <div key = {song.id} className = "song">
                                    song.name
                                    <button
                                        onClick = {(e) => {this.handlePlay(e, song.index)}}
                                        >
                                        Play
                                    </button>
                                </div>
                            )
                        })}

                    </div>

{/*                    <YouTube
                        videoId = {"2tch4J_pP9o"}
                        />*/}
                </div>

                <div className = "sidebar">
                    <button
                        className = "addPlaylist"
                        onClick = {this.handleAddPlaylist}
                    >
                        Add new PLaylist
                    </button>

                    {this.state.playlists.map(item => {
                        return(
                            <div key = {item.id} className = "element">
                                <input
                                    value = {item.name}
                                    onChange = {(e) => {
                                        this.handlePLaylistNameChange(e, item.index);
                                    }}
                                    onClick = {(e) =>{
                                        this.handleShow(e, item.index);
                                    }}
                                >
                                </input>
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default Music
