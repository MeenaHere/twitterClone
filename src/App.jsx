import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";
import Login from "./components/login/Login";
import HomePage from "./components/home/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/:id/followers/" element={<Followers />} />
        <Route path="/users/:id/following/" element={<Following />} />
      </Routes>
    </Router>
  );
}


export default App
