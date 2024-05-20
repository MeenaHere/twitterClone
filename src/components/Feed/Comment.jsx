import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getOneUser } from '../../userServices';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function CommentForm({ postId, onCommentSubmit }) {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");

    const userId = localStorage.getItem("userId");


    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            try {
                const dbuser = await getOneUser(userId);
                setUser(dbuser);
                console.log("user", dbuser);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, [userId]);

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setStatus('Unauthorized. Please log in.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:4000/comment/${postId}`,
                {
                    userId: userId,
                    username: user.username,
                    content: content,
                    postId: postId
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);

            setContent('');

            if (onCommentSubmit) {
                onCommentSubmit(response.data);
            }

        } catch (error) {
            setStatus("Failed to create comment");
            console.error("Error creating comment:", error);
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