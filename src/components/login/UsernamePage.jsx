import React, { useState } from "react";
import Username from "./Username";

const UsernamePage = ({ onNext }) => {
  const [username, setUsername] = useState(""); // Change from email to username

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
      <button className="btn btn-primary" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default UsernamePage;

