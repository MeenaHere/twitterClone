import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "./login.css";

// Set the default base URL for axios requests
axios.defaults.baseURL = "http://localhost:4000";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        const userId = response.data.userId; // Get user ID from response (if applicable)
        navigate(`/users/${userId}`); // Redirect to the user's profile page
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
            <div className="card-header sign_in_div text-black text-center">
              Sign in to X
            </div>
            <div className="card-body text-center">
              {/* Login form with username and password */}
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    required
                    placeholder="Username"
                  />
                </div>
                <div className="form-floating ">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange} // Update password state
                    required
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-dark sign_in_btn  "
                >
                  Sign in
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
