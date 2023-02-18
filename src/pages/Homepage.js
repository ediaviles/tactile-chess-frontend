import Navbar from '../components/Navbar';
import "../stylesheets/Homepage.css";
import axios from "axios";
import React, { useState } from 'react';

function Homepage() {
    const [gameId, setGameId] = useState('');
    const [move, setMove] = useState('');

    return (
        <>
            <Navbar/>
            <div data-testid={"container"} />
            <iframe src="https://lichess.org/tv/frame?theme=brown&bg=dark" className={"test"} allowtransparency="true" frameborder="0" title={"Test"}></iframe>
            <button onClick={async () => {
                await axios.post(
                    "http://localhost:5000/seekGame"
                )
            }}>
                Create Game</button><br/>
            <label>Game ID:</label><input onChange={(e) => {setGameId(e.target.value)}}/><br/>
            <label>Move:</label><input onChange={(e) => {setMove(e.target.value)}}/><button onClick={async () => {
                return axios.post(
                    `http://localhost:5000/makeMove/${gameId}/${move}`
                ).catch( (e) => {console.log(e)})
            }}>Submit Move</button>
        </>
    )
}

export default Homepage;