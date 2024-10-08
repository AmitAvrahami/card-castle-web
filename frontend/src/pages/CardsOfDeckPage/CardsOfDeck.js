import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useCardsContext } from "../../components/context/cardsProvider";
import "./CardsOfDeck.css";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import { getDeck } from "../../services/deckService";

function CardsOfDeck() {
  const { deckId } = useParams(); // Get deckId from URL parameters
  const [deck, setDeck] = useState(null);
  const { cards } = useCardsContext(); // Use context to get all card details

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await getDeck(deckId);
        setDeck(fetchedDeck);
        console.log("cardsOfDeck deck fetch:", fetchedDeck);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchDeck();
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
    <div className="cards-of-deck-page">
      <div className="nav-scroll-container">
        <NavScrollBar />
      </div>

      <div className="container">
        {deck && (
          <div className="cards-of-deck-info">
            <h1 className="title">{deck.title}</h1>
            <p>{deck.description}</p>
          </div>
        )}
        <div className="cards-of-deck-grid">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div key={card.id} className="card-item">
                <Link to={`/card/${card.id}`}>
                  <Card className="cards-of-deck-card">
                    <Card.Img
                      variant="top"
                      src={
                        card.card_images[0]?.image_url ||
                        `https://via.placeholder.com/150x200?text=Card+Image+${card.id}`
                      }
                      className="cards-of-deck-card-image"
                    />
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center mb-4">
              <h2>No cards available for this deck.</h2>
            </div>
          )}
        </div>
        {videoId && (
          <VideoPlayer
            videoId={videoId}
            className="cards-of-deck-video-player"
          />
        )}
      </div>
    </div>
  );
}

export default CardsOfDeck;
