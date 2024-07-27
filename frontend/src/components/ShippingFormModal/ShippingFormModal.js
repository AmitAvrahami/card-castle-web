import React, { useState } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../context/userContext";
import { updateUser } from "../../services/userService";
import "./ShippingFormModal.css";

const ShippingFormModal = ({ show, handleClose }) => {
  const { user, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    deliveryInstructions: "",
    phoneNumber: "",
    recipientName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchasedCards = user.shopping_cart.map((item) => ({
      card_name: item.card_name,
      card_price: item.card_price,
      card_image: item.card_image,
      card_description: item.card_description,
      quantity: item.quantity,
      address: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      delivery_instructions: formData.deliveryInstructions,
      phone_number: formData.phoneNumber,
      recipient_name: formData.recipientName,
      email: formData.email,
      purchase_date: new Date(),
    }));

    try {
      await updateUser(user._id, {
        ...user,
        purchased_cards: [...user.purchased_cards, ...purchasedCards],
        shopping_cart: [], // מנקה את עגלת הקניות לאחר ההזמנה
      });

      setUser({
        ...user,
        purchased_cards: [...user.purchased_cards, ...purchasedCards],
        shopping_cart: [],
      });
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-90w"
      className="shipping-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Shipping Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="shipping-form-container">
          <Form onSubmit={handleSubmit}>
            {/* שדות הטופס */}
            <Form.Group controlId="formRecipientName">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient's name"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email (optional)</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDeliveryInstructions">
              <Form.Label>Delivery Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Any specific instructions for the delivery"
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ShippingFormModal;
