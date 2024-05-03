import React, { useState } from "react";
import PasswordInput from "./PasswordInput";

const PasswordPage = ({ email, onLogin }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    onLogin(email, password);
  };

  return (
    <div>
      <h2>Enter Password</h2>
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default PasswordPage;
