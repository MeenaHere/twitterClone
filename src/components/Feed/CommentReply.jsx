import React, { useState } from 'react';
import axios from 'axios';

function ReplyForm({ commentId, onReplySubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/comment/${commentId}/reply`, {
                userId: 'userId',
                content: content,
            });
            onReplySubmit(response.data);
            setContent('');
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    return (
        <form className='post-comment' onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post your reply..."

            />
            <button className='feed-btn' type="submit">Reply</button>
        </form>
    );
}

export default ReplyForm;
