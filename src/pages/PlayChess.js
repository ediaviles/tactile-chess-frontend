import Navbar from "../components/Navbar";
import React, {useEffect, useState} from 'react';
import { faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons";
import OptionBlock from "../components/OptionBlock";
import "../stylesheets/PlayChess.css"
import axios from "axios";
import {fetchData} from "../components/ndJSONStreamReader";

function PlayChess() {
    const [games, setGames] = useState([])

    useEffect( () => {
        fetchCurrentGames()
    }, [])
    const headers = {
        Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
    };
    const formData = (data) => {
        const formData = new FormData();
        for (const k of Object.keys(data)) formData.append(k, data[k]);
        return formData;
    };

    const fetchCurrentGames = () => {
        //TODO figure out how to get users live games
        let response = axios.get('https://lichess.org/api/account/playing', {
            headers: headers
        }).then((r) => {setGames([...r.data.nowPlaying])})
    }

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

    const renderGames = () => {
        if (games.length === 0) {
            return <div className={"noCurrentGames"}>
                        <p>No current live games.</p>
                    </div>
        } else {
            return games.map((game) => (
                <div className={"playOption1"} onClick={() => {window.location.pathname=`/test/${game.fullId}`}}>
                    <OptionBlock text={"Current Live Game"} icon={faChessQueen}/>
                </div>
            ))
        }
    }

    return (
        <>
            <div className={"playChessContainer"}>
                <Navbar className={"Navbar"} />
                {renderGames()}
            </div>
        </>
    )
}

export default PlayChess;