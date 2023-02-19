import Navbar from '../components/Navbar';
import "../stylesheets/Homepage.css";
import React, {useState} from 'react';
import { faChess, faChartPie, faChessBoard } from "@fortawesome/free-solid-svg-icons";
import OptionBlock from "../components/OptionBlock"
import {useNavigate} from "react-router";

function Homepage() {
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url);
    }

    return (
        <div className={"pageContainer"}>
            <Navbar className={"Navbar"} />
            <div className={"Option1"} onClick={() => navigateTo("/play")}><OptionBlock text={"Play Chess"} icon={faChess} /></div>
            <div className={"Option2"}><OptionBlock text={"Match History"} icon={faChartPie} /></div>
            <div className={"Option3"}><OptionBlock text={"Puzzles"} icon={faChessBoard} /></div>
        </div>
        
    )
}

export default Homepage;

{/*
            
*/}
{/*<button onClick={async () => {
                await axios.post(
                    "http://localhost:80/seekGame"
                )
            }}>
                Create Game</button><br/>
            <label>Game ID:</label><input onChange={(e) => {setGameId(e.target.value)}}/><br/>
            <label>Move:</label><input onChange={(e) => {setMove(e.target.value)}}/><button onClick={async () => {
                return axios.post(
                    `http://localhost:80/makeMove/${gameId}/${move}`
                ).catch( (e) => {console.log(e)})
            }}>Submit Move</button>*/}