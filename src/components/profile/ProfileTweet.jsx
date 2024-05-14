import React, { useEffect, useState } from "react";
import { ownTweets } from "../../tweetServices";
import { Image } from "react-bootstrap";
import { getOneUser } from "../../userServices";

function ProfileTweet({ id }) {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user's tweets from the database using the id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbTweets = await ownTweets(id);
        setTweets(dbTweets);
      } catch (error) {
        console.error("Error fetching tweets", error);
      }
    };
    fetchData();
  }, [id]);

  // Fetch user's details from the database using the id
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

  // Function to calculate the time difference between tweet creation time and current time
  const getTweetTimeDifferenceWithCurrentTime = (createdAt) => {
    const tweetDateTime = new Date(createdAt); //Convert the createdAt to a Date object

    const currentDateTime = new Date();

    const timeDifferenceMs = currentDateTime - tweetDateTime;

    const timeDifferenceHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60)); //convert the difference in whole number

    //if the difference is less than 72 hours then print the hours else print the date only
    if (timeDifferenceHours <= 72) {
      return `${timeDifferenceHours} hours`;
    } else {
      const [getDate] = createdAt.split("T");
      return getDate;
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
                style={{
                  width: "6rem",
                  height: "6rem",
                }}
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
              <div className="fs-3 text-secondary">
                💬{tweet.comments.length}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileTweet;
