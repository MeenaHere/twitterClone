import React, { useEffect, useState } from "react";
import { ownTweets } from "../../tweetServices";
import { Image } from "react-bootstrap";
import { getOneUser } from "../../userServices";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import ReplyForm from "../Feed/CommentReply";

function ProfileTweet({ id }) {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbTweets = await ownTweets(id);
        dbTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTweets(dbTweets);
      } catch (error) {
        console.error("Error fetching tweets", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbuser = await getOneUser(id);
        setUser(dbuser);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchData();
  }, [id]);

  const fetchComments = async (tweetId) => {
    try {
      const response = await axios.get(`http://localhost:4000/comment/${tweetId}`);
      setComments((prevState) => ({
        ...prevState,
        [tweetId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (tweetId) => {
    await fetchComments(tweetId);
  };

  const handleReplySubmit = async (tweetId) => {
    await fetchComments(tweetId);
  };

  const handleDeleteComment = async (tweetId, commentId) => {
    try {
      await axios.delete(`http://localhost:4000/comment/${commentId}`);
      fetchComments(tweetId); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeleteReply = async (tweetId, commentId, replyId) => {
    try {
      await axios.delete(`http://localhost:4000/comment/${commentId}/reply/${replyId}`);
      fetchComments(tweetId); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const getTweetTimeDifferenceWithCurrentTime = (createdAt) => {
    const tweetDateTime = new Date(createdAt);
    const currentDateTime = new Date();
    const timeDifferenceMs = currentDateTime - tweetDateTime;
    const timeDifferenceHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));

    if (timeDifferenceHours <= 72) {
      return `${timeDifferenceHours} hours`;
    } else {
      const [getDate] = createdAt.split("T");
      return getDate;
    }
  };

  const handleCommentClick = (tweetId) => {
    if (!showComments[tweetId]) {
      fetchComments(tweetId);
    }
    setShowComments((prevState) => ({
      ...prevState,
      [tweetId]: !prevState[tweetId],
    }));
  };

  return (
    <div className="mt-3">
      <ul className="list-unstyled">
        {tweets.map((tweet) => (
          <li key={tweet._id} className="border mt-2 p-2 row">
            <div className="col-3">
              <Image
                src="\cover1.jpeg"
                alt="profile photo"
                style={{ width: "6rem", height: "6rem" }}
                roundedCircle
                className="border border-white border-4"
              />
            </div>
            <div className="col-9 col-md-7">
              <div>
                <strong>{user?.fullName}</strong>{" "}
                <span className="text-secondary">@{user?.username}</span>
                <span className="text-secondary">
                  . {getTweetTimeDifferenceWithCurrentTime(tweet.createdAt)}
                </span>
              </div>
              <div>{tweet.content}</div>
              <div
                className="fs-3 text-secondary"
                onClick={() => handleCommentClick(tweet._id)}
              >
                <FaRegComment /> {tweet.comments.length}
              </div>
              {showComments[tweet._id] && comments[tweet._id] && (
                <div className="comments">
                  {comments[tweet._id].map((comment) => (
                    <div className="comment" key={comment._id}>
                      <p>@{comment.userId.username}</p>
                      <p>
                        {comment.content}
                        <button
                          className="del-btn"
                          onClick={() => handleDeleteComment(tweet._id, comment._id)}
                        >
                          x
                        </button>
                      </p>
                      <ReplyForm
                        commentId={comment._id}
                        onReplySubmit={() => handleReplySubmit(tweet._id)}
                      />
                      {comment.reply && comment.reply.map((reply) => (
                        <div className="reply" key={reply._id}>
                          <p>@{reply.userId.username}</p>
                          <p>{reply.content}
                            <button
                              className="del-btn"
                              onClick={() => handleDeleteReply(tweet._id, comment._id, reply._id)}
                            >
                              x
                            </button>
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileTweet;
