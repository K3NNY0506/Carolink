import React from "react";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <i className="icon-home"></i> Home
                </li>
                <li className="menu-item">
                    <i className="icon-discussions"></i> Discussions
                </li>
                <li className="menu-item">
                    <i className="icon-dashboard"></i> Dashboard
                </li>
                <li className="menu-item">
                    <i className="icon-star"></i> Star
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
