'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [userId, setuserId] = useState("");
  const [password, setpassword] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    console.log({ userId, password, saveInfo, autoLogin });
    router.push('/chat');
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.formContainer}>
        <input
          type="id"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          style={styles.input}
        />
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            />{" "}
            정보 저장
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={autoLogin}
              onChange={() => setAutoLogin(!autoLogin)}
            />{" "}
            자동 로그인
          </label>
        </div>
        <button style={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff", // 배경을 하얀색으로 통일
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    width: "90%",
    maxWidth: "380px", // 폼의 최대 너비
    backgroundColor: "#ffffff", // 배경 하얀색
    borderRadius: "20px",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "15px",
    fontSize: "20px", // 큰 글씨
    borderRadius: "12px",
    border: "1px solid #ff6600", // 오렌지 색 테두리 추가
    marginBottom: "1rem",
    boxSizing: "border-box",
    outline: "none",
    color: "#333", // 글자 색은 어두운 회색
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start",
  },
  checkboxLabel: {
    fontSize: "18px", // 체크박스 글씨도 크고 읽기 쉽게
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#555", // 체크박스 레이블 텍스트 색상
  },
  loginButton: {
    width: "100%",
    padding: "18px",
    fontSize: "22px", // 큰 글씨
    backgroundColor: "#ff6600", // 버튼 주황색
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s",
  },
};

export default LoginScreen;
