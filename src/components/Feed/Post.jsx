import React, { useState, useEffect } from 'react';
import CommentForm from './Comment';
import ReplyForm from './CommentReply';
import axios from 'axios';
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';



/* import { getOneUser } from '../../userServices'; */

function Post({ post }) {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const [showComments, setShowComments] = useState(false);




    console.log('Post:', post);
    useEffect(() => {
        fetchProfilePhoto();


    }, []);


    const fetchProfilePhoto = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            const randomDogImageUrl = response.data.message;
            setProfilePhoto(randomDogImageUrl);
        } catch (error) {
            console.error('Error fetching random dog image:', error);
        }
    }

    const createdAt = new Date(post.createdAt);

    const date = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


    const toggleAddComment = () => {
        setAddComment(!addComment);
    }

    const toggleShowComments = () => {
        setShowComments(!showComments);
    }


    console.log('Post:', post);
    return (
        <div className='container-post'>
            <div className="post-card">

                <div className="post-content">

                    <div className='post-info'>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>{post.userId.fullName?.split(' ')[0]?.charAt(0)}</Avatar>

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
                                {post.comments.length}
                            </span>

                        </span>
                        <AiOutlineRetweet className='comment-icon' />
                        <FiHeart className='comment-icon' />
                        <p>some other stuff</p>
                    </div>
                </div>
            </div>
            {showComments && <CommentForm postId={post._id} />}
            <span className='show-all' onClick={toggleShowComments} style={{ cursor: 'pointer' }}>Show All Comments</span>
            {showComments && (
                <div className='comment-area'>
                    {post.comments.map((comment) => (
                        <div className='comment' key={comment._id}>
                            <p>@{comment.userId.username}</p>
                            <p>{comment.content}</p>
                            <ReplyForm commentId={comment._id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;




/*  const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]); */
/*   fetchAuthor();
      fetchComments(); */

/*   const fetchAuthor = async () => {
       try {
           const res = await axios.get(`http://localhost:8000/users/${id}`);
           if (res.status !== 200) {
               throw new Error("Malfunctioning server GET request");
           }
           console.log('UserId:', post.userId);
           const user = await res(post.userId);
           setAuthor(user);
       } catch (error) {
           console.error('Error fetching author:', error);
       }
   } */
//get a user data from db by using userId
/*
    const fetchAuthor = async () => {
        try {
            const userId = user._id;
            const dbuser = await getOneUser(userId);
            setAuthor(dbuser);
            console.log("dbuser", dbuser);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }; */


/*  const fetchComments = async () => {
     try {
         const response = await axios.get(`http://localhost:8000/comment/${post._id}`);
         setComments(response.data);
     } catch (error) {
         console.error('Error fetching comments:', error);
     }
 }
*/