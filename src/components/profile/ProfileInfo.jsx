import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import {
  getAllFollowers,
  getAllFollowing,
  getOneUser,
} from "../../userServices.js";
import ProfileButton from "./ProfileButton.jsx";

function ProfileInfo({ setTweetComponentVisibility }) {
  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [date, setDate] = useState("");
  const [showButton, setShowButton] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId"); //fetching userId from the local storage which one stored during login and signup

  useEffect(() => {
    setShowButton(id === loggedInUserId);
  }, [id, loggedInUserId]);

  //get a user data from db by using loggedInUserId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbuser = await getOneUser(id);
        setUser(dbuser);
        const [getDate] = dbuser.createdAt.split("T");
        setDate(getDate);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  //get a user's followers data from db by using profile user id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowers = await getAllFollowers(id);
        setFollowers(dbFollowers);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  //get a user's following  data from db by using profile user id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowing = await getAllFollowing(id);
        setFollowing(dbFollowing);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  //checking if the user is already followed (for the follow unfollow status)
  const isFollowingStatus = followers
    .map((follower) => follower.followerId)
    .includes(loggedInUserId);
  if (isFollowingStatus) {
    setTweetComponentVisibility(true);
  }

  if (user !== null) {
    return (
      <Container className="mt-1" style={{ textTransform: "capitalize" }}>
        <Row>
          <Col xs={1} md={1} className="display-2">
            <Link to={`/home/`} className=" text-decoration-none text-dark">
              ←
            </Link>
          </Col>
          <Col xs={10} md={10} className=" m-3">
            <h4 className="fw-bold">{user.fullName}</h4>
            <p className="small-font">3.1k Tweets</p>
          </Col>
        </Row>
        <Row>
          <Image
            src="\cover1.jpeg"
            alt=""
            width={500}
            height={200}
            className=""
          />
          <div className="d-flex justify-content-between">
            <Image
              src="\cover1.jpeg"
              alt="profile photo"
              style={{
                marginTop: "-4rem",
                marginLeft: "1rem",
                width: "8rem",
                height: "8rem",
              }}
              roundedCircle
              className="border border-white border-4"
            />
            <ProfileButton
              id={id}
              isFollowingStatus={isFollowingStatus}
              loggedInUserId={loggedInUserId}
              showButton={showButton}
              setTweetComponentVisibility={setTweetComponentVisibility}
              setFollowers={setFollowers}
            />
          </div>
        </Row>
        <Row>
          <h4>
            <b>{user.fullName}</b>
          </h4>
          <p className="mt-0 small-font">@{user.username}</p>
          <p>{user.about}</p>
          <div className="row">
            <Col xs={4} className=" small-font m-0 mb-1">
              💼 {user.profession}
            </Col>
            <Col className="small-font m-0">📍{user.hometown}</Col>
            <Col className="fs-6 m-0" style={{ textTransform: "lowercase" }}>
              🔗
              <a href={user.website} target="_blank">
                {user.website}
              </a>
            </Col>
          </div>
          <div className="lh-1 m-0">
            <p className="m-0 mb-2">📅 {date}</p>
          </div>
          <Row className="row mt-2">
            <Col xs={4}>
              <Link
                to={`/users/${id}/following/`}
                className="col-4 small-font text-wrap overflow-hidden text-decoration-none"
              >
                <b>{following.length} </b> Following
              </Link>
            </Col>
            <Col xs={4}>
              <Link
                to={`/users/${id}/followers`}
                className="col-4 small-font text-wrap overflow-hidden text-decoration-none  underline-hover"
              >
                <b> {followers.length} </b>Followers
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default ProfileInfo;
