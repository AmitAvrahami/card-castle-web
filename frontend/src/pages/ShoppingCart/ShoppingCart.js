import React from "react";
import { Container } from "react-bootstrap";
import ListItems from "../../components/ListItems/ListItems";
import CartSummary from "../../components/CartSummary/CartSummary";
import NavScrollBar from "../../NavScrollBar/NavScrollBar";
import "./ShoppingCart.css";

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
    image: "https://example.com/blue_eyes_white_dragon.jpg",
  },
  {
    id: 4,
    name: "Blue-Eyes White Dragon",
    description: "A legendary dragon with immense power.",
    price: 30,
    quantity: 2,
    image: "https://example.com/blue_eyes_white_dragon.jpg",
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

const ShoppingCart = () => {
  return (
    <div>
      <NavScrollBar />
      <Container className="shopping-cart-container">
        <div className="shopping-cart-content">
          <div className="list-items">
            <ListItems />
          </div>
          <div className="cart-summary">
            <CartSummary cartItems={exampleCards} />{" "}
            {/* שליחת פריטי הסל לרכיב הסיכום */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingCart;
