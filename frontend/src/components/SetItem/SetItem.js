import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SetItem.css";
import { Link, useParams } from "react-router-dom";

function SetItem({ src, setName, numOfCards, setId }) {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  return (
    <div className="set-item-container">
      <Card style={{ width: "18rem", backgroundColor: "#FEFAE0" }}>
        <Card.Img variant="top" src={src} className="card-img-top" />
        <Card.Body>
          <Card.Title className="card-title">{setName}</Card.Title>
          <Card.Text className="card-text">
            Number of cards in the set: {numOfCards}
          </Card.Text>
          <Link
            to={`/cards-of-set/${setId}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="primary"
              className="card-btn"
              style={{
                backgroundColor: isActive ? "#b0a57d" : "#cfbd8d",
                color: isActive ? "white" : "black",
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
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
