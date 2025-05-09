import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    console.log({ name, birthdate, phone, saveInfo, autoLogin });
    navigate("/chat");
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.appHeader}>
        <h1 style={styles.appTitle}>발음 코치</h1>
      </div>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="생년월일 (예: 19450123)"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            /> 정보 저장
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={autoLogin}
              onChange={() => setAutoLogin(!autoLogin)}
            /> 자동 로그인
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
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffcc00",
    fontFamily: "Arial, sans-serif",
  },
  appHeader: {
    padding: "2rem 1rem 1rem",
    textAlign: "center",
  },
  appTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ffffff",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    padding: "2rem 1.5rem",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    fontSize: "18px",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    width: "100%",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  checkboxLabel: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  loginButton: {
    fontSize: "20px",
    padding: "0.75rem",
    backgroundColor: "#0984e3",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "1rem",
    width: "100%",
  },
};

export default LoginScreen;