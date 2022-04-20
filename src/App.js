import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Heading from "./components/Heading";
import NavBar from "./components/Nav";
import Articles from "./components/Articles";
import Home from "./components/Home";
import Topics from "./components/Topics";
import SingleTopic from "./components/SingleTopic";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Heading></Heading>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicName" element={<SingleTopic />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
