import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CardQuantityModal.css';

function CardQuantityModal({ show, onHide, card, onSave }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    const handleSave = () => {
        if (card && quantity > 0) {
            onSave({
                cardId: card.id,
                quantity,
                imageUrl: card.card_images?.[0]?.image_url || 'fallback_image_url'
            });
        }
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="sm">
            <Modal.Header closeButton>
                <Modal.Title>{card?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    <img
                        src={card?.card_images?.[0]?.image_url || 'fallback_image_url'}
                        alt={card?.name}
                        className="card-image-small"
                    />
                    <p>{card?.desc}</p>
                    <Form.Group controlId="formCardQuantity">
                        <Form.Label>Choose amount</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="3"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardQuantityModal;
