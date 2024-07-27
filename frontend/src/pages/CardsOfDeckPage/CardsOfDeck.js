import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useCardsContext } from "../../components/context/cardsProvider";
import "./CardsOfDeck.css";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

function CardsOfDeck() {
  const { deckId } = useParams(); // Get deckId from URL parameters
  const [deck, setDeck] = useState(null);
  const { cards } = useCardsContext(); // Use context to get all card details

  useEffect(() => {
    // Fetch deck information
    axios
      .get(`http://localhost:5000/decks/${deckId}`)
      .then((response) => {
        setDeck(response.data);
        console.log("cardsOfDeck deck fetch:", response.data);
      })
      .catch((error) => console.error("Error fetching deck:", error));
  }, [deckId]);

  // Map card IDs to card details using the context
  const filteredCards = deck
    ? deck.cards.flatMap((card) => {
        const foundCard = cards.find((c) => c.id === card.cardId);
        if (foundCard) {
          // Duplicate the card image based on quantity
          return Array(card.quantity).fill(foundCard);
        }
        return [];
      })
    : [];

  // Function to extract YouTube video ID
  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|watch(?:\?v=|\S+)|\S+\/\S+\/|live\/\S+)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Check if the YouTube link is valid and extract the video ID
  const videoId =
    deck && deck.youtubeLink ? extractYouTubeVideoId(deck.youtubeLink) : null;

  return (
    <div className="cards-of-deck-container">
      <NavScrollBar />
      {deck && (
        <div className="deck-details">
          <h1>{deck.title}</h1>
          <p>{deck.description}</p>
        </div>
      )}
      <Row className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Col
              key={card.id}
              xs={12}
              sm={6}
              md={4}
              lg={1}
              className="d-flex justify-content-center mb-4"
            >
              <Link to={`/card/${card.id}`}>
                <Card className="card-custom">
                  <Card.Img
                    variant="top"
                    src={
                      card.card_images[0]?.image_url ||
                      `https://via.placeholder.com/150x200?text=Card+Image+${card.id}`
                    }
                    className="card-img-custom"
                  />
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col xs={12} className="d-flex justify-content-center mb-4">
            <h2>No cards available for this deck.</h2>
          </Col>
        )}
      </Row>
      {videoId && <VideoPlayer videoId={videoId} />}
    </div>
  );
}

export default CardsOfDeck;
