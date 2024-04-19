import React, { useState, useEffect } from "react";
/* import TweetBox from "./TweetBox"; */
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <div className="feed">
                <div className="feed-header">
                    <h2>Home</h2>
                </div>

                {/* <TweetBox />  */}
                {/* For this i need to import Post from my MongoDB (create one) */}
                <FlipMove>
                    {posts.map((post) => (
                        <Post
                            key={post.text}
                            name={post.name}
                            username={post.username}
                            verified={post.verified}
                            text={post.text}
                            avatar={post.avatar}
                            image={post.image}
                        />
                    ))}
                </FlipMove>
            </div>
        </div>
    )
}

export default Feed

// Notes:  Change code according to created posts from other users (our own db)
// code that depends on our data is after posts.map (fix)
// Alternative:
/* {posts.map(post => (
    <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Author: {post.author}</p>
    </div>
))} */   // a simple all posts display
// create api endpoint that useEffect leads to
// decide if using TweetBox - might be unnecessary but nice to learn anyway
// good luck with adding styles :(((  
