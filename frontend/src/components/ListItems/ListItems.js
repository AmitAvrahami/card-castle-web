import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { updateUser } from "../../services/userService";
import { useUserContext } from "../context/userContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListItem.css";
import LoginPage from "../../pages/loginPage/LoginPage";

const ListItems = () => {
  const { user, setUser } = useUserContext();
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      if (!user) {
        setNotification({
          message: "User not loaded. Please try again later.",
          type: "error",
        });
      }
    }, 5000);
    setTimeoutId(id);
    return () => {
      clearTimeout(id);
    };
  }, [user]);

  const handleQuantityChange = async (id, newQuantity) => {
    if (!user) return;

    const updatedCart = user.shopping_cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setUser({
      ...user,
      shopping_cart: updatedCart,
    });
    try {
      await updateUser(user._id, {
        ...user,
        shopping_cart: updatedCart,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification({
        message: "Error updating cart. Please try again.",
        type: "error",
      });
    }
  };

  const handleRemoveItem = async (id) => {
    if (!user) return;

    const updatedCart = user.shopping_cart.filter((item) => item._id !== id);
    setUser({
      ...user,
      shopping_cart: updatedCart,
    });
    try {
      await updateUser(user._id, {
        ...user,
        shopping_cart: updatedCart,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setNotification({
        message: "Error removing item from cart. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Container>
      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <Button onClick={() => setNotification(null)} className="ok-btn">
            OK
          </Button>
        </div>
      )}
      {user ? (
        user.shopping_cart.map((item) => (
          <Row className="mb-4 item-row" key={item._id}>
            <Col md={3} className="d-flex align-items-center">
              <img
                src={item.card_image}
                alt={item.card_name}
                className="item-image"
              />
            </Col>
            <Col md={9}>
              <div className="item-details">
                <h3 className="item-name">{item.card_name}</h3>
                <p className="item-description">{item.card_description}</p>
                <p className="item-price">
                  <strong>Price:</strong> $
                  {`${(item.card_price * item.quantity).toFixed(2)}`}
                </p>
                <p className="item-quantity">
                  <strong>Quantity:</strong>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                    className="quantity-input"
                  />
                </p>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(item._id)}
                  className="remove-button"
                >
                  Remove
                </Button>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <div className="user-not-found">
          User not loaded. Please try again later
        </div>
      )}
    </Container>
  );
};

export default ListItems;
