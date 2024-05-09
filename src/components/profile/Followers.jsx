import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import { getAllFollowers, getAllUsers, getOneUser } from "../../userServices";
import Sidebar from "../Sidebar/Sidebar";

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Fetch user's details from the database using the id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbuser = await getOneUser(id);
        setUser(dbuser);
        console.log("folloer user", dbuser);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchData();
  }, [id]);

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
  const handleGoBack = () => {
    navigate(-1);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row">
          <Col xs={3} md={3} lg={3}>
            <Sidebar />
          </Col>
          <Col xs={9} md={6} lg={6}>
            <Row>
              <Col xs={1} md={1} className="display-4">
                <Link
                  className=" text-decoration-none text-dark"
                  onClick={handleGoBack}
                >
                  ←
                </Link>
              </Col>
              <Col xs={5} md={4} className="m-2">
                <h4 className="fw-bold">{user.fullName}</h4>
                <p>@{user.username}</p>
              </Col>
            </Row>
            <ul>
              {followers.map((follower) => {
                // Find the user corresponding to the followerId
                const matchedUser = users.find(
                  (user) => user._id === follower.followerId
                );
                if (matchedUser) {
                  return (
                    <li key={follower.followerId} className="list-unstyled">
                      <Row>
                        <Col xs={2} md={2}>
                          <Image
                            src="\cover1.jpeg"
                            alt="profile photo"
                            style={{
                              width: "4rem",
                              height: "4rem",
                            }}
                            roundedCircle
                            className="border border-white border-4"
                          />
                        </Col>
                        <Col xs={3} md={5}>
                          <Link
                            to={`/users/${matchedUser._id}`}
                            className="text-decoration-none"
                          >
                            {matchedUser.fullName}
                            <br />@{matchedUser.username}
                          </Link>
                        </Col>
                      </Row>
                    </li>
                  );
                } else {
                  return null; // Handle case when followerId doesn't match any user
                }
              })}
            </ul>
          </Col>
        </div>
      </div>
    );
  } else {
    <div>loading</div>;
  }
}

export default Followers;
