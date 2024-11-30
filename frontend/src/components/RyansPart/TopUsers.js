import React from "react";
import "./TopUsers.css";
import AddTopicButton from "./AddTopicButton.js";

function TopUsers() {
    const users = ["Kenny", "Fatima", "Jonathan", "Daniel"];
    return (
        <div className="top-users">
            <div className="seperate">
            <h4 className="top-users-title">Top Users</h4>
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={index} className="user-item">
                        <img src="path-to-user-profile.jpg" alt={user} className="profile-pic" />
                        <span className="username">{user}</span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default TopUsers;