// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import HomePage from "./components/home/HomePage";
import LogoutConfirmationModal from "./components/logout/Logout";
// import ProfileCopy from "./components/profile/ProfileCopy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<LogoutConfirmationModal />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/:id/followers/" element={<Followers />} />
        <Route path="/users/:id/following/" element={<Following />} />
      </Routes>
    </Router>
  );
}


export default App;
