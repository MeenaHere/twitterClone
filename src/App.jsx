import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/profile/Profile";
import './index.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
/* 
import EditProfile from "./components/profile/EditProfile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following"; */
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/explore" component={ExplorePage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/messages" component={MessagesPage} /> */}
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/:id/followers/" element={<Followers />} />
        <Route path="/users/:id/following/" element={<Following />} />
      </Routes>
    </Router>


  );
}

export default App;
