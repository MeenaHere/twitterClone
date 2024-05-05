import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, onCommentSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/comment/${postId}`, {
                userId: 'userId',
                content: content,
            });
            onCommentSubmit(response.data);
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Reply"
            />
            <button type="submit">Post</button>
        </form>
    );
}

export default CommentForm;
