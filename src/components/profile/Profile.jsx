import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import Trends from "./Trends";
import { useEffect, useState } from "react";

function Profile() {
  const [screenSize, setScreenSize] = useState(false);

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
    <div className="container-fluid">
      <div className="row">
        <Col xs={12} md={8}>
          <ProfileInfo />
        </Col>
        <Col md={3}>{!screenSize && <Trends />}</Col>
      </div>
    </div>
  );
}

export default Profile;
