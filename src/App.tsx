import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./app/login/page";
import ChatScreen from "./app/chat/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
};

export default App;