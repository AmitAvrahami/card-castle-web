import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SetItem.css";
import { Link } from "react-router-dom";
import { useCardsContext } from "../context/cardsProvider";

function SetItem({ set }) {
  const [isActive, setIsActive] = useState(false);
  const { setSelectedSet } = useCardsContext();

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const handleSetClick = () => {
    setSelectedSet(set);
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
    </div>
  );
}

export default SetItem;
