import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchField from "../RightSide/SearchField";
import Feed from "../Feed/Feed";
/* import Tweetbox from "../Tweetbox.jsx"; */
/* import GetAllPosts from "../GetAllPosts.jsx"; */
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home-page">
      <Sidebar />
      <Feed />
      <SearchField />
      {/*   <Tweetbox /> */}
      {/*   <GetAllPosts /> */}
    </section>
  );
}

export default HomePage;
