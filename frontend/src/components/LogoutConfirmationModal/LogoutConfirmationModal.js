import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./LogoutConfirmationModal.css";

function LogoutConfirmationModal({ show, onHide, onLogout }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={true}
      dialogClassName="logout-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body className="logout-modal_body">
        Are you sure you want to log out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button
          variant="primary"
          onClick={onLogout}
          style={{ backgroundColor: "#ba7c55", border: "none" }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutConfirmationModal;
