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
        </div>
        
    )
}

export default Homepage;