import React, { useState } from "react";
import { Modal, Button, Col, Card } from "react-bootstrap";
import { useUserContext } from "../../components/context/userContext"; // Import your user context
import SearchModal from "../../components/SearchModal/SearchModal";
import CardQuantityModal from "../../components/CardQuantityModal/CardQuantityModal";
import logo from "../../images/card-castle-yu-gi-oh-logo.png";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import { createDeck } from "../../services/deckService";
import "./CreateDeck.css";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUserContext(); // Access the user context

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

  const handleSaveCard = ({ cardId, quantity, imageUrl, price }) => {
    setPickedCards((prev) => {
      const existingCard = prev.find((item) => item.cardId === cardId);
      const totalQuantity = existingCard
        ? existingCard.quantity + quantity
        : quantity;

      if (totalQuantity > 3) {
        alert("You cannot add more than 3 of the same card.");
        return prev;
      }

      const newPickedCards = existingCard
        ? prev.map((item) =>
          item.cardId === cardId
            ? { ...item, quantity: totalQuantity }
            : item
        )
        : [...prev, { cardId, quantity: totalQuantity, imageUrl }];

      // Update total price
      const newTotalPrice = newPickedCards.reduce((sum, item) => {
        const itemPrice = item.cardId === cardId ? price : item.price; // Use the price of the new card
        return sum + itemPrice * totalQuantity;
      }, 0);

      setTotalPrice(newTotalPrice);

      return newPickedCards;
    });
    setCardQuantityShow(false);
  };

  const handleDeleteCard = (card) => {
    setCardToDelete(card);
    setDeleteCardShow(true);
  };

  const handleCloseDeleteCardShow = () => setDeleteCardShow(false);

  const confirmDeleteCard = () => {
    const { cardId, imageUrl, price } = cardToDelete;

    setPickedCards((prev) => {
      const existingCard = prev.find((item) => item.cardId === cardId);
      if (!existingCard) return prev;

      const updatedCards = existingCard.quantity > 1
        ? prev.map((item) =>
          item.cardId === cardId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        : prev.filter((item) => item.cardId !== cardId);

      // Update total price
      const newTotalPrice = updatedCards.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      setTotalPrice(newTotalPrice);

      return updatedCards;
    });

    setDeleteCardShow(false);
  };

  const handlePublishDeckShow = () => setPublishDeckShow(true);
  const handleClosePublishDeckShow = () => setPublishDeckShow(false);

  const handlePublishDeck = async () => {
    if (!user) {
      alert("You need to be logged in to publish a deck.");
      return;
    }

    try {
      const response = await createDeck({
        userId: user._id, // Use user ID from context
        image: deckImage || logo,
        title: deckTitle,
        description: deckDescription,
        youtubeLink: youtubeLink,
        cards: pickedCards,
        totalPrice: totalPrice.toFixed(2).toString() // Save totalPrice as string
      });

      console.log("Deck published successfully:", response);
      alert("Deck published successfully!");
      setPublishDeckShow(false);
      // Clear state or redirect as needed
    } catch (error) {
      console.error("Error publishing deck:", error);
      alert("Error publishing deck. Please try again.");
    }
  };

  return (
    <div className="createdeck-container">
      <NavScrollBar />

      <div className="createdeck-button-container">
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
          <div className="createdeck-publish-deck-form">
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
        className="createdeck-small-modal"
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

      <div className="card-list">
        {pickedCards.length > 0 ? (
          pickedCards.map((card) =>
            Array(card.quantity)
              .fill(null)
              .map((_, idx) => (
                <div key={`${card.cardId}-${idx}`} className="card-item">
                  <Card
                    className="createdeck-card-custom"
                    onClick={() => handleDeleteCard(card)}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        card.imageUrl || "https://via.placeholder.com/150x200"
                      }
                      alt={`Card image ${card.cardId}`}
                    />
                  </Card>
                </div>
              ))
          )
        ) : (
          <p>No cards selected yet.</p>
        )}
      </div>
    </div>
  );
}

export default CreateDeck;
