import Navbar from "../components/Navbar";
import React, {} from 'react';
import { faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons";
import OptionBlock from "../components/OptionBlock";
import "../stylesheets/PlayChess.css"

function PlayChess() {
    return (
        <div className={"playChessContainer"}>
            <Navbar className={"Navbar"} />
            <div className={"playOption1"}><OptionBlock text={"Play Online"} icon={faChessQueen} /></div>
            <div className={"playOption2"}><OptionBlock text={"Play Computer"} icon={faChessKing}/></div>
            <iframe src={"https://lichess.org/api/user/eaviles/current-game"} />
        </div>
    )
}

export default PlayChess;