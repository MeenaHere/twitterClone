import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsernamePage from "./UsernamePage";
import PasswordPage from "./PasswordPage";
import axios from "axios";
const backendURL = "http://localhost:4000/users";

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
      console.log("Attempting login with username:", username, "and password:", enteredPassword);
      const response = await axios.post(`${backendURL}/login`, {
        username,
        password: enteredPassword, //
      });

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/home");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
      console.error("Error during login:", error.message);
    }

    // Authentication calls will be HERE!!!

    setTimeout(() => {
      // Navigate to the home page
      navigate("/home");
    }, 1000);
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
