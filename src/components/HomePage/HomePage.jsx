import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import SearchField from '../RightSide/SearchField'
import Feed from '../Feed/Feed'
import './HomePage.css'
/* import Feed from '../Feed/Feed' */

function HomePage() {
    return (

        <section className='home-page'>

            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="feed-area">
                <Feed />
            </div>
            <div className="search-trends">
                <SearchField />
            </div>

        </section>
    )
}

export default HomePage

/* HOME PAGE */

/* Sidebar (left side):
            Logo
            Explore
            Notifications
            Messages
            Lists
            Communities
            Premium
            Profile
            Post Button
            Logged In User */
/* Feed (Middle Part):
          For You + Following
          Post + Like,Comment etc.
          Feed */

/* Right Side:
            Search Field
            Who to follow
            Footer( Terms of Service, etc.) */
