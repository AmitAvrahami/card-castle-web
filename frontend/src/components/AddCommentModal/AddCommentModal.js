import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import "./AddCommentModal.css"; // Import the CSS

function AddCommentModal({ show, onHide, articleId, setComments }) {
  const [message, setMessage] = useState("");
  const { user } = useUserContext();

  const handleSubmit = () => {
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }

    const newComment = { userId: user._id, comment: message };
    axios
      .post(`http://localhost:5000/articles/${articleId}/comments`, newComment)
      .then((response) => {
        setComments((prevComments) => [response.data, ...prevComments]);
        onHide();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="add-comment-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formComment">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your comment"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="button-secondary"
          onClick={onHide}
        >
          Close
        </Button>
        <Button
          variant="primary"
          className="button-primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCommentModal;
