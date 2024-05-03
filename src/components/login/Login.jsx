import React, { useState } from "react";
import EmailPage from "./EmailPage";
import PasswordPage from "./PasswordPage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setPage(2);
  };

  const handleLogin = (enteredEmail, enteredPassword) => {
    console.log("Email:", enteredEmail);
    console.log("Password:", enteredPassword);
  };

  return (
    <div>
      {page === 1 && <EmailPage onNext={handleNext} />}
      {page === 2 && <PasswordPage email={email} onLogin={handleLogin} />}
    </div>
  );
};

export default Login;
