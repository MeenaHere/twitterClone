import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";

import EditProfile from "./components/profile/EditProfile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/edit/:id" element={<EditProfile />} />
        <Route path="/users/:id/followers/" element={<Followers />} />
        <Route path="/users/:id/following/" element={<Following />} />
      </Routes>
    </Router>
  );
}

export default App;
