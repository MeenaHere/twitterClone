import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getOneUser } from '../../userServices';

axios.defaults.baseURL = "https://x-twitter-clone-react.netlify.app";
axios.defaults.withCredentials = true;


function ReplyForm({ commentId, onReplySubmit }) {
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
            const response = await axios.post(`https://x-twitter-clone-react.netlify.app/comment/${commentId}/reply`, {
                userId: userId,
                content: content,
                username: user.username,
                /*  commentId: commentId */
            });

            if (onReplySubmit) {
                onReplySubmit(response.data);
            }
            console.log(response.data);
            setContent('');
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    return (
        <form className='post-comment' onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={handleInputChange}
                placeholder="Post your reply..."

            />
            <button className='feed-btn' type="submit">Reply</button>
        </form>
    );
}

export default ReplyForm;
