import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./TopDecks.css";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

function TopDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Fetch all decks from the backend
    axios
      .get("http://localhost:5000/decks")
      .then((response) => {
        setDecks(response.data);
        console.log("decks fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

  return (
    <div className="top-decks-container">
      <NavScrollBar />
      <div className="button-container">
        <Link to="/create-deck">
          <Button variant="primary">Create New Deck</Button>
        </Link>
      </div>
      <Row className="cards-grid">
        {decks.map((deck) => (
          <Col
            key={deck._id}
            xs={12}
            md={4}
            className="d-flex justify-content-center"
          >
            <Link
              to={`/deck-details/${deck._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="card-custom">
                <Card.Img
                  variant="top"
                  src={deck.image} // Use the image URL from the deck data
                  className="card-img-custom"
                />
                <Card.Body>
                  <Card.Title>{deck.title}</Card.Title>{" "}
                  {/* Use the title from the deck data */}
                  <Card.Text>
                    {deck.description}{" "}
                    {/* Use the description from the deck data */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TopDecks;
