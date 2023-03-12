import Navbar from "../components/Navbar";
import React, {} from 'react';
import { faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons";
import OptionBlock from "../components/OptionBlock";
import "../stylesheets/PlayChess.css"
import axios from "axios";
import {fetchData} from "../components/ndJSONStreamReader";

function PlayChess() {
    const headers = {
        Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
    };
    const formData = (data) => {
        const formData = new FormData();
        for (const k of Object.keys(data)) formData.append(k, data[k]);
        return formData;
    };

    const createAISeek = () => {
        //First start a stream
        fetchData("stream events", null).then(r => {})

        //Then start a seek
        fetch(`https://lichess.org/api/challenge/ai`,
            {
                headers: headers,
                method: 'POST',
                mode: 'cors',
                body: formData({
                    level: 1,
                    'clock.limit': 60 * 3,
                    'clock.increment': 2,
                })
            })
    }
    const createOnlineSeek = () => {
        fetchData('stream events', null).then(r => {})
        fetch(`https://lichess.org/api/board/seek`,
            {
                headers: headers,
                method: 'POST',
                mode: 'cors',
                body: formData({
                    rated: false,
                    time: 180,
                    increment: 30,
                    variant: "standard",
                    color: "white"
                })
            })
    }

    return (
        <div className={"playChessContainer"}>
            <Navbar className={"Navbar"} />
            <div className={"playOption1"} onClick={() => {
                //TODO implement seek logic for live users
                createOnlineSeek()
            }}>
                <OptionBlock text={"Play Online"} icon={faChessQueen} /></div>
            <div className={"playOption2"} onClick={() => {
                //TODO implement seek logic for Lichess AI
                createAISeek()
            }}>
                <OptionBlock text={"Play Computer"} icon={faChessKing}/></div>
        </div>
    )
}

export default PlayChess;