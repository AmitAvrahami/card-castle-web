import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../images/card-castle-yu-gi-oh-logo.png";
import "./NavScrollBar.css";

import LoginPage from "../../pages/loginPage/LoginPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogoutConfirmationModal from "../LogoutConfirmationModal/LogoutConfirmationModal"; // Import the new component
import axios from "axios";
import SearchModal from "../SearchModal/SearchModal";

function NavScrollBar({ cards }) {
  const { user, setUser } = useUserContext();
  const [modalShow, setModalShow] = useState(false);
  const [loginScreenShow, setLoginScreenShow] = useState(false);
  const [signupScreenShow, setSignupScreenShow] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false); // State for logout modal
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/validate",
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    validateToken();
  }, [setUser]);

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    setLogoutModalShow(false); // Hide the modal after logging out
  };

  const handleCardClick = (card) => {
    navigate(`/card/${card.id}`); // Navigate to the card details page
    setModalShow(false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="/top-decks">Top Decks</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/shopping-cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                Shopping Cart
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button
                variant="outline-success"
                onClick={() => setModalShow(true)}
              >
                Search Card
              </Button>
              {user ? (
                <>
                  <label className="user-greeting">Hello, {user.name}</label>
                  <Button
                    variant="outline-success"
                    onClick={() => setLogoutModalShow(true)}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-success"
                    onClick={() => setLoginScreenShow(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={() => setSignupScreenShow(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginPage
        show={loginScreenShow}
        onHide={() => setLoginScreenShow(false)}
      />

      <SignUpPage
        show={signupScreenShow}
        onHide={() => setSignupScreenShow(false)}
      />

      <SearchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onCardClick={handleCardClick}
        cards={cards}
      />

      <LogoutConfirmationModal
        show={logoutModalShow}
        onHide={() => setLogoutModalShow(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default NavScrollBar;
