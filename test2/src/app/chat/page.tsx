'use client';

import React, { useState, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import IconButton from "../IconButton";
import { ReactElement } from "react";

const ChatScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("마이크 권한이 부여되었습니다.");
    } catch (err) {
      console.error("마이크 권한이 거부되었습니다.", err);
      alert("마이크 권한이 필요합니다. 권한을 부여해주세요.");
    }
  };

  const handleMicClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setMessages((prev) => [...prev, "🎙️ 녹음된 메시지 샘플"]);
    }, 2000);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prev) => [...prev, inputText.trim()]);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    requestMicPermission();
  }, []);

  const MicIcon: ReactElement = <FiMic size={24} color="#fff" />;
  const SendIcon: ReactElement = <FiSend size={20} color="#fff" />;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>채팅</h1>
        <button style={styles.menuButton}>≡</button>
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx} style={styles.message}>{msg}</div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <IconButton
          icon={MicIcon}
          onClick={handleMicClick}
          style={styles.micButton}
        />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
          style={styles.input}
        />
        <IconButton
          icon={SendIcon}
          onClick={handleSend}
          style={styles.sendButton}
        />

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={styles.recordingPopup}
          >
            🎤 녹음 중...
          </motion.div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fdf4e3",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    position: "relative",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#ffa500",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    fontSize: "28px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  chatBox: {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  message: {
    padding: "0.75rem 1rem",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    marginBottom: "1rem",
    fontSize: "20px",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #ddd",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  micButton: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#ff6600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    marginRight: "0.5rem",
    cursor: "pointer",
  },
  input: {
    flex: 1,
    fontSize: "18px",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
  sendButton: {
    width: "50px",
    height: "50px",
    marginLeft: "0.5rem",
    borderRadius: "50%",
    backgroundColor: "#4caf50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
  },
  recordingPopup: {
    position: "absolute",
    bottom: "110px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ffcccc",
    padding: "1rem 2rem",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "22px",
    zIndex: 10,
  },
};

export default ChatScreen;
