import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsernamePage from "./UsernamePage";
import PasswordPage from "./PasswordPage";
import axios from "axios";

// Set the default base URL for all axios requests
axios.defaults.baseURL = "http://localhost:4000";
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
      const response = await axios.post("/login", {
        username,
        password: enteredPassword, // Data sent to the backend
      });

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/users/:id"); // Navigate to the profile page on success
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      let errorMessage = "Server error. Please try again later.";

      if (error.response) {
        errorMessage = error.response.data.message;
      }

      setError(errorMessage); // Display error message in the frontend
      console.error("Error during login:", errorMessage); // Log error details
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
              {error && <p className="text-danger">{error}</p>}{" "}
              {/* Display error if any */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
