import React from "react";
import "./AddTopicButton.css";

function AddTopicButton( {onClick}) {
    return (
        <button className="add-topic-btn">
            <span className="plus-icon">+</span>
            <span className="button-text">Start A New Topic</span>
        </button>
    );
}

export default AddTopicButton;
