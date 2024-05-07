import React, { useState } from "react";
import PasswordInput from '../login/Password'

const PasswordPage = ({ username, onLogin }) => {
  // Change from email to username
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    onLogin(password); // Pass username instead of email
  };

  return (
    <div>
      <h2>Enter Password</h2>
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default PasswordPage;
