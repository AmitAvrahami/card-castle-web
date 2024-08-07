// LoginPage.js
import Button from "react-bootstrap/Button";
import { useUserContext } from "../../components/context/userContext";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

function LoginPage(props) {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  const { user, setUser } = useUserContext();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://card-castle.onrender.com/auth/login",
        newUser
      );
      console.log("Logged in user: ", response.data);
      setMessageType("success");
      setMessage("Login successful!"); // Updated message
      if (response.data.status === "Success") {
        setUser(response.data.user);
        setNewUser({
          email: "",
          password: "",
        });
        if (response.data.role === "admin") {
        } else {
        }
      }
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
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <div className="btn-login-container">
            <Button
              variant="primary"
              type="submit"
              onClick={props.onHide}
              className="submit_btn"
            >
              Login
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

export default LoginPage;
