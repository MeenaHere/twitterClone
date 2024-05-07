import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  const goToRegister = () => {
    navigate("/register"); // Navigate to register page
  };

  return (
    <div className="container text-center">
      <h1>Twitter Clone!</h1>
      <p>This is the starting point of our application.</p>

      <button className="btn btn-success me-3" onClick={goToLogin}>
        Login
      </button>
      <button className="btn btn-primary" onClick={goToRegister}>
        Register
      </button>
    </div>
  );
};

export default Home;
