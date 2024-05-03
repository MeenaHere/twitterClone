import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { getAllFollowers, getAllUsers } from "../../userServices";

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  // Fetch all users from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbUsers = await getAllUsers();
        setUsers(dbUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchData();
  }, []);

  // Fetch all followers for the specified user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowers = await getAllFollowers(id);
        setFollowers(dbFollowers);
      } catch (error) {
        console.error("Error fetching followers", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container-fluid" style={{ textTransform: "capitalize" }}>
      <ul>
        {followers.map((follower) => {
          // Find the user corresponding to the followerId
          const matchedUser = users.find(
            (user) => user._id === follower.followerId
          );
          if (matchedUser) {
            return (
              <li key={follower.followerId} className="list-unstyled">
                <Image
                  src="\cover1.jpeg"
                  width={70}
                  height={70}
                  className="mt-2"
                />
                <Link
                  to={`/users/${matchedUser._id}`}
                  className="m-4 text-decoration-none"
                >
                  {matchedUser.fullName}
                </Link>
              </li>
            );
          } else {
            return null; // Handle case when followerId doesn't match any user
          }
        })}
      </ul>
    </div>
  );
}

export default Followers;
