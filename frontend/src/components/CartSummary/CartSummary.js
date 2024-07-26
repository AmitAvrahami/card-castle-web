import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CartSummary.css"; // ייבוא קובץ ה-CSS המותאם אישית שלך

const CartSummary = ({ cartItems }) => {
  // חישוב המחיר הכולל של הסל
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // יצירת תאריך להזמנה
  const orderDate = new Date().toLocaleDateString();

  return (
    <Container className="cart-summary-container">
      <Row>
        <Col md={12} className="text-center">
          <h2>Cart Summary</h2>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Order Date:</strong> {orderDate}
          </p>
          <Button variant="primary" className="checkout-button">
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartSummary;
