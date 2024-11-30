import React from "react";
import SearchBar from "./SearchBar";
import "./Header.css";

import logo from "./logo.jpg";
import profilePic from "./logo.jpg";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} className="logo-image" alt="Logo" />
                CaroLink
            </div>
            <SearchBar />
            <div className="logout-section">
                <span>Logout</span>
                <img src={profilePic} className="profile-pic" alt="User Profile" />
            </div>
        </header>
    );
}

export default Header;
