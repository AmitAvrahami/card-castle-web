import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios"; // Import Axios
import "./CreateDeck.css";
import SearchModal from "../../components/SearchModal/SearchModal";
import CardQuantityModal from "../../components/CardQuantityModal/CardQuantityModal";
import logo from "../../images/card-castle-yu-gi-oh-logo.png";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

function CreateDeck() {
  const [findCardShow, setFindCardShow] = useState(false);
  const [cardQuantityShow, setCardQuantityShow] = useState(false);
  const [publishDeckShow, setPublishDeckShow] = useState(false);
  const [deleteCardShow, setDeleteCardShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [pickedCards, setPickedCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckImage, setDeckImage] = useState(""); // Default image URL can be set here
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleFindCardShow = () => setFindCardShow(true);
  const handleCloseFindCardShow = () => setFindCardShow(false);

  const handleCardQuantityShow = (card) => {
    setSelectedCard(card);
    setCardQuantityShow(true);
  };

  const handleCloseCardQuantityShow = () => setCardQuantityShow(false);

  const handleCardClick = (card) => {
    handleCardQuantityShow(card);
  };

  const handleSaveCard = ({ cardId, quantity, imageUrl }) => {
    setPickedCards((prev) => {
      const existingCard = prev.find((item) => item.cardId === cardId);
      const totalQuantity = existingCard
        ? existingCard.quantity + quantity
        : quantity;

      if (totalQuantity > 3) {
        alert("You cannot add more than 3 of the same card.");
        return prev;
      }

      if (existingCard) {
        return prev.map((item) =>
          item.cardId === cardId ? { ...item, quantity: totalQuantity } : item
        );
      } else {
        return [...prev, { cardId, quantity: totalQuantity, imageUrl }];
      }
    });
    setCardQuantityShow(false);
  };

  const handlePublishDeckShow = () => {
    if (pickedCards.length > 0) {
      setPublishDeckShow(true);
    } else {
      alert("Please add at least one card to the deck before publishing.");
    }
  };

  const handleClosePublishDeckShow = () => setPublishDeckShow(false);

  const handlePublishDeck = async () => {
    try {
      const response = await axios.post("http://localhost:5000/decks", {
        id: Math.floor(Math.random() * 10000), // Generate random ID
        image: deckImage || logo,
        title: deckTitle,
        description: deckDescription,
        youtubeLink: youtubeLink,
        cards: pickedCards,
      });

      console.log("Deck published successfully:", response.data);
      alert("Deck published successfully!");
      setPublishDeckShow(false);
      // Clear state or redirect as needed
    } catch (error) {
      console.error("Error publishing deck:", error);
      alert("Error publishing deck. Please try again.");
    }
  };

  const handleDeleteCard = (card) => {
    setCardToDelete(card);
    setDeleteCardShow(true);
  };

  const handleCloseDeleteCardShow = () => setDeleteCardShow(false);

  const confirmDeleteCard = () => {
    const { cardId, imageUrl } = cardToDelete;

    setPickedCards((prev) => {
      const existingCard = prev.find((item) => item.cardId === cardId);
      if (!existingCard) return prev;

      if (existingCard.quantity > 1) {
        return prev.map((item) =>
          item.cardId === cardId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.cardId !== cardId);
      }
    });

    setDeleteCardShow(false);
  };

  return (
    <div className="create-deck-container">
      <NavScrollBar />

      <div className="button-container">
        <Button variant="primary" onClick={handleFindCardShow}>
          Find Card
        </Button>
        <Button variant="success" onClick={handlePublishDeckShow}>
          Publish Deck
        </Button>
      </div>

      {/* Primary Modal */}
      <SearchModal
        show={findCardShow}
        onHide={handleCloseFindCardShow}
        centered
        onCardClick={handleCardClick}
      />

      {/* Secondary Modal */}
      <CardQuantityModal
        show={cardQuantityShow}
        onHide={handleCloseCardQuantityShow}
        card={selectedCard}
        onSave={handleSaveCard}
      />

      {/* Publish Deck Modal */}
      <Modal
        show={publishDeckShow}
        onHide={handleClosePublishDeckShow}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Publish Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="publish-deck-form">
            <label htmlFor="deckTitle">Deck Title:</label>
            <input
              id="deckTitle"
              type="text"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
            />
            <label htmlFor="deckDescription">Deck Description:</label>
            <textarea
              id="deckDescription"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
            <label htmlFor="deckImage">Deck Image URL (optional):</label>
            <input
              id="deckImage"
              type="text"
              value={deckImage}
              onChange={(e) => setDeckImage(e.target.value)}
            />
            <label htmlFor="youtubeLink">YouTube Link (optional):</label>
            <input
              id="youtubeLink"
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePublishDeckShow}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePublishDeck}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Card Confirmation Modal */}
      <Modal
        show={deleteCardShow}
        onHide={handleCloseDeleteCardShow}
        centered
        className="small-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this card from the deck?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCardShow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteCard}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="picked-cards-grid">
        {pickedCards.length > 0 ? (
          pickedCards.map((card) =>
            Array(card.quantity)
              .fill(null)
              .map((_, idx) => (
                <Col
                  key={`${card.cardId}-${idx}`}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  className="d-flex justify-content-center mb-4"
                >
                  <Card
                    className="card-custom"
                    onClick={() => handleDeleteCard(card)}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        card.imageUrl || "https://via.placeholder.com/150x200"
                      }
                      className="card-img-custom"
                    />
                  </Card>
                </Col>
              ))
          )
        ) : (
          <Col xs={12} className="d-flex justify-content-center">
            <p>No cards added yet</p>
          </Col>
        )}
      </div>
    </div>
  );
}

export default CreateDeck;
