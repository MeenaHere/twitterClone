import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

function CreatePost({ onPostCreated }) {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = { content };
            console.log('Request Body:', requestBody);
            const response = await axios.post('http://localhost:4000/feed/posts', {

                content: content,
            });
            const data = response.data;

            if (response.status === 200) {
                onPostCreated(data);
                // Reset form fields after successful submission
                setAuthor("");
                setContent("");
            } else {
                console.error("Error creating post:", data.error);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="new-post-container">
            <form onSubmit={handleSubmit}>
                <div className="new-post">
                    <Avatar sx={{ bgcolor: deepPurple[500] }} className="avatar">
                        A
                    </Avatar>
                    <input
                        className="form-input"
                        placeholder="What is happening?!"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                </div>
                <div className="buttons">
                    <button type="submit" className="feed-btn">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
