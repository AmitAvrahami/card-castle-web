import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row, Form } from 'react-bootstrap';
import { useCardsContext } from '../components/context/cardsProvider';
import './SearchModal.css'


function SearchModal({ onCardClick, ...props }) {
    const { cards } = useCardsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCards, setFilteredCards] = useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            const filtered = cards.filter(card =>
                card.name && card.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCards(filtered);
        } else {
            setFilteredCards([]);
        }
    };

    const cardsToDisplay = filteredCards.slice(0, 18);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Search Cards
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Container>
                    <Form.Group controlId="formSearch">
                        <Form.Control
                            type="text"
                            placeholder="Enter card name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Form.Group>
                    <Row className="grid-container">
                        {cardsToDisplay.length === 0 && searchTerm && (
                            <p>No cards found</p>
                        )}
                        {cardsToDisplay.map((card, index) => (
                            <Col key={index} className="card-item">
                                <a
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (onCardClick) {
                                            onCardClick(card);
                                        }
                                    }}
                                    className="card-link"
                                >
                                    <img
                                        src={card.card_images?.[0]?.image_url || 'fallback_image_url'}
                                        alt={card.name}
                                        className="card-image"
                                    />
                                    <p>{card.name}</p>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SearchModal;
