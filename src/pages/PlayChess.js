import Navbar from "../components/Navbar";
import React, {} from 'react';
import { faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons";
import OptionBlock from "../components/OptionBlock";
import "../stylesheets/PlayChess.css"
import axios from "axios";

function PlayChess() {
    return (
        <div className={"playChessContainer"}>
            <Navbar className={"Navbar"} />
            <div className={"playOption1"} onClick={async () => {
                await axios.post(
                    "http://localhost:5000/seekGame"
                )
            }}><OptionBlock text={"Play Online"} icon={faChessQueen} /></div>
            <div className={"playOption2"}><OptionBlock text={"Play Computer"} icon={faChessKing}/></div>
        </div>
    )
}

export default PlayChess;