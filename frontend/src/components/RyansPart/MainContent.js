import React, { useState } from "react";
import TopicCard from "./TopicCard";
import "./MainContent.css";
import Dummyprompt from "./Dummyprompt";

function MainContent() {
    const [isPromptVisible, setIsPromptVisible] = useState(false);

    const togglePrompt = () => {
        setIsPromptVisible(!isPromptVisible);
    };

    return (
        <div className="main-content">
            <h2>Latest Discussions</h2>
            <center>
                <button className="add-topic-btn" onClick={togglePrompt}>
                    <span className="plus-icon">+</span>
                    <span className="button-text">Start A New Topic</span>
                </button>
            </center>

            {isPromptVisible && ( // Conditionally render Dummyprompt
                <div>
                    <Dummyprompt />
                </div>
            )}

            <div className="topic-cards-container">
                <TopicCard />
                <TopicCard />
                <TopicCard />
            </div>
        </div>
    );
}

export default MainContent;
