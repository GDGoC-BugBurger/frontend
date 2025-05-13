'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiSend, FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './ChatScreen.module.css';

type Message = {
  text: string;
  sender: 'me' | 'other';
  time: string;
  isAudio?: boolean;
};


const ChatScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordBtnDisabled, setRecordBtnDisabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      localStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        setRecordBtnDisabled(false);

        if (audioChunks.length === 0) return;
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioChunks([]);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');

        try {
          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          sendMessage(data.text, true);
        } catch (e) {
          alert('음성 인식 오류');
        }
      };
    }).catch((err) => {
      console.error('마이크 권한이 거부되었습니다.', err);
      alert('마이크 권한이 필요합니다. 권한을 부여해주세요.');
    });
  }, [audioChunks]);

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const sendMessage = (text: string, isAudio = false) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        text,
        sender: 'me',
        time: getCurrentTime(),
        isAudio,
      },
    ]);
    setInputText('');
  };

  const handleMicClick = () => {
    if (!mediaRecorderRef.current) return;

    if (!isRecording) {
      setAudioChunks([]);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSend = () => sendMessage(inputText);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={`${styles.globalReset} ${styles.chatContainer}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>대화하기</h1>
        <button className={styles.menuButton}>
          <FiMenu size={30} />
        </button>
      </div>

      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.messageWrapper} ${msg.sender === 'me' ? styles.right : styles.left}`}
          >
            <div className={styles.messageBubble}>
              <div className={styles.messageText}>{msg.text}</div>
              <div className={styles.messageTime}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <button
          onClick={handleMicClick}
          className={styles.micButton}
          disabled={recordBtnDisabled}
        >
          <FiMic size={24} color="#fff" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
          className={styles.inputField}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          <FiSend size={20} color="#fff" />
        </button>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={styles.recordingPopup}
          >
            🎤 녹음 중...
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
