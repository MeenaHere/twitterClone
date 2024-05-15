import React, { useEffect, useState } from "react";
import { ownTweets } from "../../tweetServices";
import { Image } from "react-bootstrap";
import { getOneUser } from "../../userServices";

function ProfileTweet({ id }) {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);

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

  const handleCommentClick = (comments) => {
    if (comments.length > 0) {
      setShowComments(!showComments);
    }
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
                <strong>{user.fullName}</strong>{" "}
                <span className="text-secondary">@{user.username}</span>
                <span className="text-secondary">
                  . {getTweetTimeDifferenceWithCurrentTime(tweet.createdAt)}
                </span>
              </div>
              <div>{tweet.content}</div>
              <div
                className="fs-3 text-secondary"
                onClick={() => handleCommentClick(tweet.comments)}
              >
                💬{tweet.comments.length}
              </div>
              {showComments && (
                <div className="comments">
                  {tweet.comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
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
