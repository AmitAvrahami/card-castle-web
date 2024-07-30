import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import { getDecks } from "../../services/deckService";
import "./TopDecks.css";

function TopDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await getDecks();
        setDecks(fetchedDecks);
        console.log("decks fetched:", fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div className="top-decks-container">
      <NavScrollBar />
      <div className="top-decks-button-container">
        <Link to="/create-deck">
          <Button variant="primary">Create New Deck</Button>
        </Link>
      </div>
      <Row xs={1} md={2} className="g-3 justify-content-center">
        {decks.map((deck) => (
          <Col key={deck._id} className="top-decks-custom-margin">
            <Link to={`/deck-details/${deck._id}`} style={{ textDecoration: "none" }}>
              <Card className="top-decks-fixed-card">
                <Card.Img
                  variant="top"
                  src={deck.image} // Use the image URL from the deck data
                  className="top-decks-card-img-custom"
                />
                <Card.Body className="top-decks-card-body">
                  <Card.Title className="top-decks-card-title">{deck.title}</Card.Title>
                  <Card.Text className="top-decks-card-description">
                    {deck.description}
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
