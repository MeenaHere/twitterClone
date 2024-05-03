import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import { getAllFollowing, getAllUsers } from "../../userServices";

function Following() {
  const [following, setfollowing] = useState([]);
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

  // Fetch all following for the specified user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowings = await getAllFollowing(id);
        setfollowing(dbFollowings);
      } catch (error) {
        console.error("Error fetching following", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container-fluid" style={{ textTransform: "capitalize" }}>
      <ul>
        {following.map((following) => {
          const matchedUser = users.find(
            (user) => user._id === following.followingId
          );
          if (matchedUser) {
            return (
              <li key={following.followingId} className="list-unstyled">
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
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default Following;
