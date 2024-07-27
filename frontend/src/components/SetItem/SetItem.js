import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SetItem.css";
import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { useCardsContext } from "../context/cardsProvider";
import { updateUser } from "../../services/userService";
import Notification from "../Notification/Notification";

function SetItem({ set }) {
  const { user, setUser } = useUserContext();
  const [isActive, setIsActive] = useState(false);
  const { setSelectedSet } = useCardsContext();
  const [notification, setNotification] = useState(null);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const handleSetClick = () => {
    setSelectedSet(set);
  };

  const handleOnClickBuySet = async () => {
    if (!user) {
      setNotification({
        message: "You must be logged in to buy a set.",
        type: "error",
      });
      return;
    }

    const setItem = {
      card_type: "Package",
      card_name: set.set_name,
      card_price: set.total_price, // Use the total price of the set
      card_image: set.set_image,
      card_description: `Set with ${set.num_of_cards} cards`,
      quantity: 1,
    };

    const updatedUser = {
      ...user,
      shopping_cart: [...user.shopping_cart, setItem],
    };

    try {
      await updateUser(user._id, updatedUser);
      setUser(updatedUser);
      setNotification({
        message: "The set has been added to your cart!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message: "Error adding the set to your cart. Please try again.",
        type: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="set-item-container">
      <Card className="set-item-card">
        <Card.Img variant="top" src={set.set_image} className="card-img-top" />
        <Card.Body>
          <Card.Title className="card-title">{set.set_name}</Card.Title>
          <Card.Text className="card-text">
            Number of cards in the set: {set.num_of_cards}
          </Card.Text>
          <Card.Text className="card-text">
            Total Price: ${set.total_price} {/* Display the total price */}
          </Card.Text>
          <Button
            variant="primary"
            className="buy-set-btn"
            onClick={handleOnClickBuySet}
          >
            Buy This Set
          </Button>
          <Link
            to={`/cards-of-set/${set.set_code}/${set.set_name}`}
            className="link-to-cards"
          >
            <Button
              variant="primary"
              className="card-btn"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleSetClick}
            >
              Go to Cards of Set Page
            </Button>
          </Link>
        </Card.Body>
      </Card>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={handleCloseNotification}
      />
    </div>
  );
}

export default SetItem;
