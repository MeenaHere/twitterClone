// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from 'axios';

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4002/tweets');
        setPosts(response.data);
      } catch (error) {
        setError('Failed to fetch posts');
        console.error('Fetching error:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {error && <p>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p>@{post.username}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllPosts;