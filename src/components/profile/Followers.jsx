import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import { getAllFollowers, getAllUsers, getOneUser } from "../../userServices";
import Sidebar from "../Sidebar/Sidebar";
import SearchField from "../RightSide/SearchField";

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [screenSize, setScreenSize] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      // Check if screen width falls within tablet size range (768px) to hide the trend component on samll screen
      setScreenSize(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row">
          <Col md={4} lg={3}>
            {!screenSize && <Sidebar />}
          </Col>
          <Col xs={10} md={6} lg={6}>
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
          <Col md={3} lg={3}>
            {!screenSize && <SearchField />}
          </Col>
        </div>
      </div>
    );
  } else {
    <div>loading</div>;
  }
}

export default Followers;
