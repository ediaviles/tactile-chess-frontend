import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import "../stylesheets/Navbar.css";
import {useNavigate} from "react-router";

function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const [navIcon, setNavIcon] = useState(faBars);
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url);
    }

    const updateShowNav = () => {
        setShowNav(!showNav);
        if (showNav) {
            setNavIcon(faBars);
        } else {
            setNavIcon(faX);
        }
    }


    return(
        <div className={'navbar-container'} data-testid={'navbar-container'}>
            {/* <h3 className={'title'} onClick={() => {navigateTo("/")}}>Tactile Chess</h3>
            <FontAwesomeIcon className={`bars`} icon={navIcon} onClick={updateShowNav}/>
            <div className={`navbar-elements ${showNav && 'active'}`}>
                <ul>Login</ul>
                <ul>Share ID</ul>
                <ul>Create Account</ul>
                <ul>Home</ul>
            </div> */}
            <h2 className={'title'} onClick={() => {navigateTo("/")}}>Tactile Chess</h2>
        </div>
    )
}

export default Navbar;