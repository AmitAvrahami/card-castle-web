import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListItem.css"; // ייבא את קובץ ה-CSS המותאם אישית שלך

// דוגמה לנתוני קלפים
const exampleCards = [
  {
    id: 1,
    name: "Dark Magician",
    description: "A powerful mage that can defeat many enemies.",
    price: 20,
    quantity: 1,
    image: "https://example.com/dark_magician.jpg",
  },
  {
    id: 2,
    name: "Blue-Eyes White Dragon",
    description: "A legendary dragon with immense power.",
    price: 30,
    quantity: 2,
    image: "https://example.com/blue_eyes_white_dragon.jpg",
  },
  {
    id: 3,
    name: "Blue-Eyes White Dragon",
    description: "A legendary dragon with immense power.",
    price: 30,
    quantity: 2,
    image:
      "https://m.media-amazon.com/images/M/MV5BMDM0MDA3NzYtMDE1MS00YjZmLWJmNjQtNzgxYzlhMmMyZjQ2XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg",
  },
  {
    id: 4,
    name: "Blue-Eyes White Dragon",
    description: "A legendary dragon with immense power.",
    price: 30,
    quantity: 2,
    image:
      "https://m.media-amazon.com/images/M/MV5BMDM0MDA3NzYtMDE1MS00YjZmLWJmNjQtNzgxYzlhMmMyZjQ2XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg",
  },
  {
    id: 5,
    name: "Blue-Eyes White Dragon",
    description: "A legendary dragon with immense power.",
    price: 30,
    quantity: 2,
    image:
      "https://m.media-amazon.com/images/M/MV5BMDM0MDA3NzYtMDE1MS00YjZmLWJmNjQtNzgxYzlhMmMyZjQ2XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg",
  },
];

const ListItems = () => {
  const [cartItems, setCartItems] = useState(exampleCards);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Container>
      {cartItems.map((item) => (
        <Row className="mb-4 item-row" key={item.id}>
          <Col md={3} className="d-flex align-items-center">
            <img src={item.image} alt={item.name} className="item-image" />
          </Col>
          <Col md={9}>
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <p className="item-price">
                <strong>Price:</strong> ${item.price * item.quantity}
              </p>
              <p className="item-quantity">
                <strong>Quantity:</strong>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="quantity-input"
                />
              </p>
              <Button
                variant="danger"
                onClick={() => handleRemoveItem(item.id)}
                className="remove-button"
              >
                Remove
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ListItems;
