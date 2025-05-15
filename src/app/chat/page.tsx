'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import IconButton from '../IconButton';
import axios from 'axios';

// API 엔드포인트 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServerResponse {
  text?: string;
  audioUrl?: string;
}

interface Message {
  type: 'user' | 'ai';
  text: string;
}

const ChatScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {
      alert('마이크 권한이 필요합니다.');
    });
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendAudioToStt(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, 5000);
    } catch (err) {
      console.error('녹음 실패:', err);
    }
  };

  const sendAudioToStt = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice.webm');

    try {
      const res = await axios.post<ServerResponse>(
        `${API_BASE_URL}/api/chats/speech-to-text`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      const { text, audioUrl } = res.data;

      if (text) setMessages((prev) => [...prev, { type: 'ai', text }]);
      if (audioUrl) new Audio(audioUrl).play();
    } catch (err) {
      console.error('STT 전송 실패:', err);
      setMessages((prev) => [...prev, { type: 'ai', text: '❌ 음성 인식 실패' }]);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prev) => [...prev, { type: 'user', text: inputText }]);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Remindly</h1>
        <p style={styles.subtitle}>🗣️ 발음 교정 챗봇과 대화해보세요</p>
      </div>

      <div style={styles.chatBox} ref={chatRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '0.75rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: msg.type === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                backgroundColor: msg.type === 'user' ? '#dcfce7' : '#ffffff',
                alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <span style={styles.messageText}>{msg.text}</span>
              <span style={styles.messageTime}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <IconButton icon={<FiMic size={24} color="#fff" />} onClick={handleMicClick} style={styles.micButton} />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          style={styles.inputField}
        />
        <IconButton icon={<FiSend size={20} color="#fff" />} onClick={handleSend} style={styles.sendButton} />
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
  chatContainer: {
    width: '100%',
    height: '100dvh',
    maxWidth: '480px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fffdf4', // 은은한 크림톤
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    position: 'relative',
    borderRadius: '20px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    padding: '1.5rem 1rem 1rem',
    backgroundColor: '#fff7d6',
    borderBottom: '1px solid #f0e5b3',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#ec8305',
    marginBottom: '0.25rem',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginTop: 0,
  },
  chatBox: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    backgroundColor: '#fff', // 회색 제거, 흰색으로 통일
  },
  messageText: {
    fontSize: '16px',
    color: '#000',
    marginBottom: '0.5rem',
    whiteSpace: 'pre-wrap',
  },
  messageTime: {
    fontSize: '11px',
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'right',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#fff7d6',
    borderTop: '1px solid #f0e5b3',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  micButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ec8305',
    marginRight: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  sendButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ec8305', // Remindly 주색상으로 통일
    marginLeft: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  inputField: {
    flex: 1,
    fontSize: '16px',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
    height: '35px',
    backgroundColor: '#fff',
  },
  recordingPopup: {
    position: 'absolute',
    bottom: '110px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffdddd',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '18px',
    zIndex: 10,
    color: '#a00',
  },
};

export default ChatScreen;
