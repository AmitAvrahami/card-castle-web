import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/card-castle-yu-gi-oh-logo.png";
import "./NavScrollBar.css";
import SearchModal from "../SearchModal/SearchModal";
import LoginPage from "../pages/loginPage/LoginPage";

function NavScrollBar({ cards }) {
  const [modalShow, setModalShow] = useState(false);
  const [loginScreenShow, setLoginScreenShow] = useState(false);
  const [signupScreenShow, setSignupScreenShow] = useState(false);

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
              <Nav.Link href="#action2">Link</Nav.Link>
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
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button
                variant="outline-success"
                onClick={() => setModalShow(true)}
              >
                Search Card
              </Button>
              <Button
                variant="outline-success"
                onClick={() => setLoginScreenShow(true)}
              >
                Login
              </Button>
              <Button variant="outline-success">Sign Up</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginPage
        show={loginScreenShow}
        onHide={() => setLoginScreenShow(false)}
      ></LoginPage>
      <SearchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cards={cards}
      />
    </>
  );
}

export default NavScrollBar;
