'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './LoginScreen.css';

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/members/sign-in', {
        username,
        password,
      });

      if (response.status === 200 && response.data.success) {
        // 로그인 성공 시
        router.push('/chat');
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-subtitle">Enter your username and password to login</p>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUserId(e.target.value)}
        className="input-field"
        placeholder="아이디"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
        placeholder="비밀번호"
      />

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={() => setSaveInfo(!saveInfo)}
          />
          정보 저장
        </label>
        <label>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={() => setAutoLogin(!autoLogin)}
          />
          자동 로그인
        </label>
      </div>

      <button onClick={handleLogin} className="login-button">
        로그인
      </button>

      <div className="help-links">
        <a href="#">Forgot Username?</a>
        <a href="#">Forgot Password?</a>
        <a href="#">Don't have an account? Register</a>
        <a href="#">Need help? Visit our help center</a>
      </div>
    </div>
  );
};

export default LoginScreen;
