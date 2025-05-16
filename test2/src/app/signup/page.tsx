'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './LoginScreen.css';

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async () => {
    if (!username || !password || !email || !guardianEmail || !phoneNumber || !address || !birthDate) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('http://api.bugburger.whqtker.site/api/members/sign-up', {
        username,
        password,
        email,
        guardianEmail,
        phoneNumber,
        birthDate,
      });

      if (response.status === 201 || response.data.success) {
        setSuccessMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError("회원가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">회원가입</h1>

      <div className="input-group">
        <label>아이디를 입력해주세요</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>이메일을 입력해주세요</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>비밀번호를 입력해주세요</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>비밀번호를 한 번 더 입력해주세요</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>보호자 이메일을 입력해주세요</label>
        <input
          type="email"
          value={guardianEmail}
          onChange={(e) => setGuardianEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>전화번호를 입력해주세요 (예: 010-1234-5678)</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />
      </div>


      <div className="input-group">
        <label>생년월일을 선택해주세요</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="input-field"
        />
      </div>

      <button onClick={handleSignUp} className="login-button">
        회원가입하기
      </button>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="help-links">
        <a href="/login">이미 계정이 있으신가요? 로그인</a>
      </div>
    </div>
  );
};

export default SignUpScreen;
