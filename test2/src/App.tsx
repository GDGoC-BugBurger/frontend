import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./app/login/page";
import ChatScreen from "./app/chat/page";

const App = () => {
  return (
    <Router>
      <Route>
        <Route path="/" element={<LoginScreen /> as React.ReactElement} />
        <Route path="/chat" element={<ChatScreen /> as React.ReactElement} />
      </Route>
    </Router>
  );
};

export default App;