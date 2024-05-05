/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
/* import { Container, Row, Col, Image } from "react-bootstrap"; */
/* import "./profile.css"; */
import {
  getAllFollowers,
  getAllFollowing,
  getOneUser,
} from "../../userServices.js";

function ProfileInfo() {
  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const { id } = useParams();

  //get a user data from db by using userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbuser = await getOneUser(id);
        setUser(dbuser);
        console.log("dbuser", dbuser);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  //get a user/s followers data from db by using userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowers = await getAllFollowers(id);
        setFollowers(dbFollowers);
        console.log("followers", dbFollowers);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  //get a user/s following  data from db by using userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbFollowing = await getAllFollowing(id);
        setFollowing(dbFollowing);
        console.log("Following", dbFollowing);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  if (user !== null) {
    return (
      <>
        <Container className="col-md-9">
          <Row>
            <Col xs={1} className=" pt-4 fw-bold">
              <h2>←</h2>
            </Col>
            <Col xs={10}>
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
                alt="profile phot"
                style={{
                  marginTop: "-4rem",
                  marginLeft: "1rem",
                  width: "8rem",
                  height: "8rem",
                }}
                roundedCircle
                className="border border-white border-4"
              />
              <Link
                to={`/users/edit/${user.id}`}
                className="btn btn-primary flex-col-reverse mt-3 rounded-5 px-4 py-2"
              >
                Edit profile
              </Link>
            </div>
          </Row>
          <Row>
            <h4>
              <b>{user.fullName}</b>
            </h4>
            <p className="mt-0 small-font">@{user.username}</p>
            <p>{user.bio}</p>
            <div className="row">
              <Col xs={4} className=" small-font m-0 mb-1">
                💼 {user.profession}
              </Col>
              <Col className="small-font m-0">📍{user.location}</Col>
              <Col className="fs-6 m-0">🔗 {user.webLink}</Col>
            </div>
            <div className="lh-1 m-0">
              <p className="m-0 mb-2">📅 {user.joinedDate}</p>
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
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default ProfileInfo;
