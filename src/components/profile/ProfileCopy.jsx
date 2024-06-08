import "bootstrap/dist/css/bootstrap.css";
import { Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // To redirect after logout
import axios from "axios";
import ProfileInfo from "./ProfileInfo";
import Trends from "./Trends";
import LogoutConfirmationModal from "../logout/Logout"; // Import the modal

function ProfileCopy() {
  const [screenSize, setScreenSize] = useState(false);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const navigate = useNavigate(); // To redirect after logout

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
      setScreenSize(window.innerWidth <= 768); // Set screen size based on width
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Check on initial render
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-between">
        <Col xs={12} md={8}>
          <ProfileInfo />
        </Col>

        <Col md={3}>
          {!screenSize && <Trends />}
          <div className="d-flex justify-content-end mt-3">
            {" "}
            <Button className=" btn-outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </div>

      <LogoutConfirmationModal
        show={showModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}

export default ProfileCopy;
