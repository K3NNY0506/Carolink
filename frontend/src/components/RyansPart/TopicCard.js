import React from "react";
import "./TopicCard.css";

function TopicCard() {
    return (
        <div className="topic-card">
            <h3 className="topic-title">Topic Title</h3>
            <p className="topic-description">
                A brief description of the topic goes here. It can be a few lines long to give users an idea of what the topic is about.
            </p>
            <div className="topic-footer">
                <div className="user-info">
                    <img src="path-to-user-profile.jpg" alt="User" className="user-image" />
                    <span className="topic-author">Posted by User</span>
                </div>
                <span className="topic-date">Date</span>
            </div>
            <div className="interaction-bar">
                <button className="like-button">👍 10</button>
                <button className="reply-button">💬 5 Replies</button>
            </div>
        </div>
    );
}

export default TopicCard;
