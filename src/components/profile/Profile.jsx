import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProfileTweet from "./ProfileTweet";
import SearchField from "../RightSide/SearchField";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";

function Profile() {
  const [screenSize, setScreenSize] = useState(false);
  const [tweetComponentVisibility, setTweetComponentVisibility] =
    useState(false); // To manage tweet component visibility

  const { id } = useParams();

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

  return (
    <div className="container">
      <div className="row">
        <Col xs={3} md={3} lg={3}>
          <Sidebar />
        </Col>
        <Col xs={9} md={6} lg={6}>
          <ProfileInfo
            setTweetComponentVisibility={setTweetComponentVisibility}
          />
        </Col>
        <Col md={3} lg={3}>
          {!screenSize && <SearchField />}
        </Col>
      </div>
      <div className="row">
        <Col md={3} lg={3}></Col>
        <Col xs={9} md={6} lg={6}>
          {tweetComponentVisibility && <ProfileTweet id={id} />} {}
        </Col>
        <Col md={3} lg={3}></Col>
      </div>
    </div>
  );
}

export default Profile;
