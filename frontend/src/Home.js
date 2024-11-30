import React from 'react';
import Header from "./components/RyansPart/Header";
import Sidebar from "./components/RyansPart/Sidebar";
import MainContent from "./components/RyansPart/MainContent";
import TopUsers from "./components/RyansPart/TopUsers";
import Footer from "./components/RyansPart/Footer";
import "./components/RyansPart/App.css";
import "./components/RyansPart/AddTopicButton.css";


function Home() {
  return (
      <div className="app-container">
          <Header />
          <div className="content">
              <Sidebar />
              <div className="main-wrapper">
                  <MainContent />                      
              </div>
              <TopUsers />
          </div>
          <Footer />
      </div>
  );
}

export default Home;
