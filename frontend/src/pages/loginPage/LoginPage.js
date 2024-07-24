import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";

function LoginPage(props) {
  const [newUser, setNewUser] = useState({
    username: "",
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
    e.preventDefault(); // כדי שהעמוד לא יבצע קריאה מחדש לשרת
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        newUser
      );
      setMessageType("success");
      setMessage("User registered successfully!");
      console.log("user sent to DB", response.data);
    } catch (error) {
      setMessageType("danger");
      setMessage("Error sending data: " + error.response.data.message);
      console.log("error sending data", error);
    }
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email / Username</Form.Label>
            <Form.Control
              name="username"
              type="email"
              placeholder="Enter email or username"
              onChange={handleOnChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
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
