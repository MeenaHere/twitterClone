import React, { useState } from "react";
import UsernamePage from "./UsernamePage";
import PasswordPage from "./PasswordPage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const handleUsernameNext = (enteredUsername) => {
    setUsername(enteredUsername);
    setPage(2); // Move to the password page
  };

  const handleLogin = async (enteredPassword) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        // Redirect to /home after successful login
        history.push("/home");
      } else {
        setError(data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      {page === 1 && <UsernamePage onNext={handleUsernameNext} />}
      {page === 2 && <PasswordPage username={username} onLogin={handleLogin} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
