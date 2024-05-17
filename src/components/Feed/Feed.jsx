import React, { useState, useEffect } from "react";
/* import TweetBox from "./TweetBox"; */
import "../Feed/Feed.css";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import Post from "../Feed/Post";
import Tweetbox from "../Tweet/Tweetbox";
/* import Tweetbox from "../Tweetbox"; */

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/posts")
            .then((response) => {
                console.log("Post response:", response.data);

                setPosts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, []);

    return (
        <div className="feed">
            <div className="feed-header">
                <div className="left-header">
                    <h3>For you</h3>
                </div>
                <div className="right-header">
                    <h3>Following</h3>
                </div>
                <div className="settings">
                    {<FiSettings className="settings-icon" />}
                </div>
            </div>
            <div className="create-post-container">
                <Tweetbox />
            </div>

            <div>
                {posts && posts.map((post) => <Post key={post._id} post={post} />)}
            </div>
        </div>
    );
}

export default Feed;
