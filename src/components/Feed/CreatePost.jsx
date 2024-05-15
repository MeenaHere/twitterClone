import React, { useState, useContext } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import AuthContext from "../../AuthContext";



/* axios.defaults.baseURL = "http://localhost:4000"; */
axios.defaults.withCredentials = true;

function CreatePost() {
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const { auth } = useContext(AuthContext);

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handlePostSubmit = async () => {
        try {
            if (!auth.user) {
                setStatus('Unauthorized. Please log in.');
                return;
            }

            const response = await axios.post(`http://localhost:4000/posts/create`, { content });

            if (response.status === 201) {
                setStatus("Post created successfully");
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
        <div className="new-post-container">
            <div className="new-post">
                <Avatar sx={{ bgcolor: deepPurple[500] }} className="avatar">A</Avatar>
                <input
                    type="text"
                    placeholder="What is happening?!"
                    value={content}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="buttons">
                <button className="feed-btn" onClick={handlePostSubmit}>Post</button>
            </div>
            {status && <p>{status}</p>}
        </div>
    );
}

export default CreatePost;
