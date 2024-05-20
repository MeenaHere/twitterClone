import React, { useState, useEffect } from 'react';
import CommentForm from './Comment';
import ReplyForm from './CommentReply';
import axios from 'axios';
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


function Post({ post, fetchPosts }) {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchProfilePhoto();
        fetchComments();
    }, []);

    const fetchProfilePhoto = async () => {
        try {
            const response = await axios.get('http://localhost:4000/posts/random-dog-image');
            const randomDogImageUrl = response.data.message;
            setProfilePhoto(randomDogImageUrl);
        } catch (error) {
            console.error('Error fetching random dog image:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/comment/${post._id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        await fetchComments();
        setAddComment(false);
    };

    const handleReplySubmit = async () => {
        await fetchComments();
    };

    const createdAt = new Date(post.createdAt);
    const date = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const toggleAddComment = () => {
        setAddComment(!addComment);
    };

    const toggleShowComments = () => {
        setShowComments(!showComments);
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:4000/comment/${commentId}`);
            fetchComments(); // Refresh comments after deletion
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        try {
            await axios.delete(`http://localhost:4000/comment/${commentId}/reply/${replyId}`);
            fetchComments(); // Refresh comments after deletion
        } catch (error) {
            console.error('Error deleting reply:', error);
        }
    };
    return (
        <div className='container-post'>
            <div className="post-card">
                <div className="post-content">
                    <div className='post-info'>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                            {post.userId && post.userId.fullName ? post.userId.fullName.split(' ')[0].charAt(0) : ''}
                        </Avatar>
                        <p>{post.userId && post.userId.username ? `@${post.userId.username}` : '@username'}</p>
                        <p> &#8226;</p>
                        <p>{date}</p>
                    </div>
                    <p>{post.content}</p>
                    <div className="media">
                        <img src={profilePhoto} alt="Profile Photo" />
                    </div>
                    <div className="post-buttons">
                        <span>
                            <FaRegComment className='comment-icon' onClick={toggleAddComment} />
                            <span className="num">
                                {post.comments && post.comments.length}
                            </span>
                        </span>
                        <AiOutlineRetweet className='comment-icon' />
                        <FiHeart className='comment-icon' />
                        <p>some other stuff</p>
                    </div>
                </div>
            </div>
            {addComment && <CommentForm postId={post._id} onCommentSubmit={handleCommentSubmit} />}
            <span className='show-all' onClick={toggleShowComments} style={{ cursor: 'pointer' }}>Show All Comments</span>
            {showComments && (
                <div className='comment-area'>
                    {comments.map((comment) => (
                        <div className='comment' key={comment._id}>
                            <p>@{comment.userId.username}</p>

                            <p>
                                {comment.content}
                                <button className='del-btn' onClick={() => handleDeleteComment(comment._id)}>x</button>
                            </p>
                            <ReplyForm commentId={comment._id} onReplySubmit={handleReplySubmit} />
                            {comment.reply && comment.reply.map(reply => (
                                <div className='reply' key={reply._id}>
                                    <p>@{reply.userId.username}</p>
                                    <p>{reply.content}
                                        <button className='del-btn' onClick={() => handleDeleteReply(comment._id, reply._id)}>x</button>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;





/* import React, { useState, useEffect } from 'react';
import CommentForm from './Comment';
import ReplyForm from './CommentReply';
import axios from 'axios';
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';






function Post({ post, fetchPosts }) {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetchProfilePhoto();
        fetchComments();
    }, []);


    const fetchProfilePhoto = async () => {
        try {
            const response = await axios.get('http://localhost:4000/posts/random-dog-image');
            const randomDogImageUrl = response.data.message;
            setProfilePhoto(randomDogImageUrl);
        } catch (error) {
            console.error('Error fetching random dog image:', error);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/comment/${post._id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        await fetchComments();
        setAddComment(false);
    };

    const handleReplySubmit = async () => {
        await fetchComments();
    };


    const createdAt = new Date(post.createdAt);

    const date = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


    const toggleAddComment = () => {
        setAddComment(!addComment);
    }

    const toggleShowComments = () => {
        setShowComments(!showComments);
    }



    return (
        <div className='container-post'>
            <div className="post-card">

                <div className="post-content">

                    <div className='post-info'>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                            {post.userId && post.userId.fullName ? post.userId.fullName.split(' ')[0].charAt(0) : ''}
                        </Avatar>


                        <p>{post.userId && post.userId.username ? `@${post.userId.username}` : '@username'}</p>
                        <p> &#8226;</p>
                        <p>{date}</p>
                    </div>
                    <p>{post.content}</p>
                    <div className="media">

                        <img src={profilePhoto} alt="Profile Photo" />

                    </div>
                    <div className="post-buttons">
                        <span>
                            <FaRegComment className='comment-icon' onClick={toggleAddComment} />
                            <span className="num">
                                <span className="num">
                                    {post.comments && post.comments.length}
                                </span>

                            </span>

                        </span>
                        <AiOutlineRetweet className='comment-icon' />
                        <FiHeart className='comment-icon' />
                        <p>some other stuff</p>
                    </div>
                </div>
            </div>
            {showComments && <CommentForm postId={post._id} onCommentSubmit={handleCommentSubmit} />}
            <span className='show-all' onClick={toggleShowComments} style={{ cursor: 'pointer' }}>Show All Comments</span>
            {showComments && (
                <div className='comment-area'>
                    {post.comments.map((comment) => (
                        <div className='comment' key={comment._id}>
                            <p>@{comment.userId.username}</p>
                            <p>{comment.content}</p>
                            <ReplyForm commentId={comment._id} onReplySubmit={handleReplySubmit} />
                            {comment.replies && comment.replies.map(reply => (
                                <div className='reply' key={reply._id}>
                                    <p>@{reply.userId.username}</p>
                                    <p>{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;

 */

