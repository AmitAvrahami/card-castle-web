import React from "react";
import { Container } from "react-bootstrap";
import ListItems from "../../components/ListItems/ListItems";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./ShoppingCart.css";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

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
            <CartSummary /> {/* שליחת פריטי הסל לרכיב הסיכום */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingCart;
