import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, onCommentSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/comment/${postId}`, {
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
        <form className='post-comment' onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post your comment"

            />
            <button className='feed-btn' type="submit">Post</button>
        </form>
    );
}

export default CommentForm;
