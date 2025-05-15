import { AppProps } from 'next/app';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "../app/login/page";
import ChatScreen from "../app/chat/page";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default MyApp;