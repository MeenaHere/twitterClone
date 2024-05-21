import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import Post from "./Post";
import Tweetbox from "../Tweet/Tweetbox";

function Feed() {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchPostsFromFollowedUsers(userId);
        }
    }, [userId]);

    const fetchPostsFromFollowedUsers = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/tweets/followingPosts/${userId}`);
            console.log('Fetched posts from followed users:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts from followed users:', error);
        }
    };

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
                {posts.map(post => (
                    <Post key={post._id} post={post} fetchPosts={() => fetchPostsFromFollowedUsers(userId)} />
                ))}
            </div>
        </div>
    );
}

export default Feed;




/* // eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import Post from "./Post";
import Tweetbox from "../Tweet/Tweetbox";


function Feed() {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchPostsFromFollowedUsers(userId);
        }
    }, [userId]);


    const fetchPostsFromFollowedUsers = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/tweets/followingPosts/${userId}`);
            console.log('Fetched posts from followed users:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts from followed users:', error);
        }
    };

    
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
                {posts.map(post => (
                    <Post key={post._id} post={post} fetchPosts={() => fetchPostsFromFollowedUsers(userId)} />
                ))}
            </div>
        </div>
    );
}

export default Feed;

 */




/*    useEffect(() => {
           axios
               .get("http://localhost:4000/tweets/all")
               .then((response) => {
                   console.log("Post response:", response.data);
   
                   setPosts(response.data);
               })
               .catch((error) => {
                   console.error("Error fetching post:", error);
               });
       }, []);
   
       const fetchPosts = async () => {
           try {
               const response = await axios.get('http://localhost:4000/posts');
               setPosts(response.data);
           } catch (error) {
               console.error('Error fetching posts:', error);
           }
       }; */