import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./app/login/page";
import ChatScreen from "./app/chat/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen /> as React.ReactElement} />
        <Route path="/chat" element={<ChatScreen /> as React.ReactElement} />
      </Routes>
    </Router>
  );
};

export default App;