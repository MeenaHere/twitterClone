import React, { useState } from "react";
import Username from "./Username";

const UsernamePage = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNext = () => {
    onNext(username);
  };

  return (
    <div>
      <h2>Enter Username</h2>
      <Username value={username} onChange={handleUsernameChange} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default UsernamePage;
