import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState("");

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit = async () => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId");
            /* const postId = localStorage.getItem("postId"); */
            const response = await axios.post(`http://localhost:4000/comment/${postId}/${userId}`, { content });
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