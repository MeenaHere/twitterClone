import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProfileTweet from "./ProfileTweet";
import SearchField from "../RightSide/SearchField";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import LogoutConfirmationModal from "../logout/Logout";
import { Button } from "react-bootstrap";
import "../logout/logout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

function Profile() {
  const [screenSize, setScreenSize] = useState(false);
  const [tweetComponentVisibility, setTweetComponentVisibility] =
    useState(false); // To manage tweet component visibility
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(true); // Show the modal when "Logout" is clicked
  };

  const confirmLogout = async () => {
    setShowModal(false); // Hide the modal before making the request
    try {
      await axios.post("/logout"); // Send the logout request to the backend
      navigate("/"); // Redirect to the landing page on successful logout
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };
  const cancelLogout = () => {
    setShowModal(false); // Hide the modal when canceled
  };

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
      <LogoutConfirmationModal
        show={showModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
      <div className=" bottom-0 end-0 mb-4 me-4">
        <Button
          className="btn-white-outline-dark logout-btn"
          onClick={handleLogout}
          style={{ transition: "background-color 0.3s, color 0.3s" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
