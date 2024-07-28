import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../context/userContext";
import ShippingFormModal from "../../components/ShippingFormModal/ShippingFormModal.js";
import "./CartSummary.css";

const CartSummary = () => {
  const { user } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  if (!user || !user.shopping_cart) {
    return null; // לא מציג שום דבר אם המשתמש או עגלת הקניות לא נטענו
  }

  const totalPrice = user.shopping_cart.reduce(
    (total, item) => total + (item.card_price || 0) * (item.quantity || 1),
    0
  );

  const orderDate = new Date().toLocaleDateString();

  const handleOnClickedCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="cart-summary-container">
      <Row>
        <Col md={12} className="text-center">
          <h2>Cart Summary</h2>
          {user.shopping_cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <p>
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Order Date:</strong> {orderDate}
              </p>
              <Button
                variant="primary"
                className="checkout-button"
                onClick={handleOnClickedCheckout}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </Col>
      </Row>

      {/* Modal Component */}
      <ShippingFormModal show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
};

export default CartSummary;
