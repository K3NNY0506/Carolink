import React from "react";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for Topics"
                className="search-input"
            />
            <button className="search-button">
                🔍 
            </button>
        </div>
    );
}

export default SearchBar;
