import HomePage from "./components/HomePage/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";

import EditProfile from "./components/profile/EditProfile";
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
        {/* <Route path="/profile" component={ProfilePage} /> */}
        {/*  <Route path="/more" component={MorePage} /> */}
        {/* Add more routes for other pages */}
      </Routes>
    </Router>


  );
}

export default App;
