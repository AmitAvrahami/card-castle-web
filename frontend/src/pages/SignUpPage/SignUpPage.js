import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import "./SignUpPage.css";
import axios from "axios";

function SignUpPage(props) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post(
        "https://card-castle.onrender.com/auth/signup",
        newUser
      );
      setMessageType("success");
      setMessage("User registered successfully!");
      console.log("User registered", response.data);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
      setMessageType("danger");
      setMessage(`Error sending data: ${errorMessage}`);
      console.log("Error sending data", error);
    }
  };

  return (
    <Modal {...props} dialogClassName="logout-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Username"
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
          </Form.Group>
          <div className="signup-btn-container">
            <Button variant="primary" type="submit" className="signup-btn">
              Sign-Up
            </Button>
          </div>
        </Form>
        {message && (
          <Alert
            style={{ padding: "30px", margin: "2%" }}
            variant={messageType}
            onClose={() => setMessage("")}
            dismissible
          >
            {message}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpPage;
