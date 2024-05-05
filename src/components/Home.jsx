import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";

function LandingPage() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default LandingPage;
