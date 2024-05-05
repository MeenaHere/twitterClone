import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsernamePage from "./UsernamePage";
import PasswordPage from "./PasswordPage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameNext = (enteredUsername) => {
    setUsername(enteredUsername);
    setPage(2);
  };

  const handleLogin = async (enteredPassword) => {
    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        navigate("/users/home");
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              Login
            </div>
            <div className="card-body">
              {page === 1 && <UsernamePage onNext={handleUsernameNext} />}
              {page === 2 && (
                <PasswordPage username={username} onLogin={handleLogin} />
              )}
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
