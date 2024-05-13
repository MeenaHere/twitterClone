import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const LogoutConfirmationModal = ({ show, onConfirm, onCancel }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleConfirm = () => {
    setIsButtonClicked(true);
    onConfirm();
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button
          
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant={isButtonClicked ? "dark" : "light"}
          onClick={handleConfirm}
          style={{
            color: isButtonClicked ? "white" : "black",
          }}
        >
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutConfirmationModal;
