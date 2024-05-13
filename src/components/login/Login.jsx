import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // HTTP client for backend communication

// Set the default base URL for axios requests
axios.defaults.baseURL = "http://localhost:4000";

const Login = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // Use for redirection

  const handleUsernameNext = (enteredUsername) => {
    setUsername(enteredUsername); // Update the username
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password, // Send username and password to the backend
      });

      if (response.status === 200) {
        console.log("Login successful");
        console.log(response.data);
        const userId = response.data.userId;
        localStorage.setItem("userId", userId); // Store user ID in local storage
        console.log(localStorage.getItem("userId"));
        navigate(`/homepage`);
        /*        navigate(`/users/${userId}`); // Redirect to the user's profile page */
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      setError(errorMessage); // Display error message to the user
      console.error("Error during login:", errorMessage); // Log the error details
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
              {/* Login form with username and password */}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange} // Update password state
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              {error && <p className="text-danger">{error}</p>}{" "}
              {/* Display error message */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
