import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState("");

    const loggedInUserId = localStorage.getItem("userId");
    console.log(localStorage.getItem("userId"))

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            if (!loggedInUserId) {
                setStatus('Unauthorized. Please log in.');
                return;
            }
            const response = await axios.post(`http://localhost:4000/comment/${postId}`, { content });
            if (response.status === 201) {
                setContent(""); // Clear input after successful posting
            } else {
                setStatus("Failed to create post");
            }
        } catch (error) {
            setStatus("Failed to create post");
            console.error("Error creating post:", error);
        }
    };

    return (
        <form className='post-comment'>
            <textarea
                value={content}
                onChange={handleInputChange}
                placeholder="Post your comment"

            />
            <button className='feed-btn' onClick={handleSubmit}>Post</button>
        </form>
    );
}

export default CommentForm;