// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchField from "../RightSide/SearchField";
import Feed from "../Feed/Feed";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home-page">
      <Sidebar />
      <Feed />
      <SearchField />
    </section>
  );
}

export default HomePage;
