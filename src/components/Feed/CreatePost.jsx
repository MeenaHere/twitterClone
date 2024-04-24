import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = { author, content };
            console.log('Request Body:', requestBody);
            const response = await axios.post('http://localhost:4000/feed/posts', {

                content: content,
            });
            const data = response.data;

            if (response.status === 200) {
                onPostCreated(data);
                // Reset form fields after successful submission
                setAuthor('');
                setContent('');
            } else {
                console.error('Error creating post:', data.error);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <textarea
                    placeholder="What is happening?!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
