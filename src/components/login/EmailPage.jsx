import React, { useState } from "react";
import EmailInput from "./EmailInput";

const EmailPage = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNext = () => {
    onNext(email);
  };

  return (
    <div>
      <h2>Enter Email</h2>
      <EmailInput value={email} onChange={handleEmailChange} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default EmailPage;
