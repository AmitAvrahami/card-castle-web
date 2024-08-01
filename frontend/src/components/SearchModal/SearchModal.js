import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";
import "./SearchModal.css";
import { fetchCards } from "../../services/cardService"; // Ensure the path is correct
import CardTypeForm from "../CardTypeForm/CardTypeForm";
import SortForm from "../SortForm/SortForm";

function SearchModal({ onCardClick, ...props }) {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Card Type");
  const [selectedSort, setSelectedSort] = useState("name");

  // Fetch cards based on the selected type
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedType && selectedType !== "Card Type") {
          params.type = selectedType; // Adjust according to your API's query parameters
        }
        const fetchedCards = await fetchCards(params);
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedType]); // Fetch cards whenever the selected type changes

  // Filter and sort cards based on search term, selected type, and selected sort
  useEffect(() => {
    let filtered = cards;

    if (selectedType && selectedType !== "Card Type") {
      filtered = filtered.filter((card) => card.type === selectedType); // Adjust according to your card type field
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (card) =>
          card.name &&
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort cards based on the selected sort option
    if (selectedSort) {
      filtered.sort((a, b) => {
        if (selectedSort === "name") {
          return a.name.localeCompare(b.name);
        } else if (selectedSort === "atk") {
          return b.atk - a.atk;
        } else if (selectedSort === "def") {
          return b.def - a.def;
        } else if (selectedSort === "level") {
          return b.level - a.level;
        }
        return 0;
      });
    }

    setFilteredCards(filtered);
  }, [cards, searchTerm, selectedType, selectedSort]); // Filter and sort cards whenever search term, selected type, or selected sort changes

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const cardsToDisplay = filteredCards.slice(0, 18);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Cards
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-search">
        <Container>
          <div className="search-container">
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Enter card name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form.Group>
            <CardTypeForm
              selectedType={selectedType}
              onSelect={handleTypeSelect}
            />
            <SortForm
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          </div>
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row className="grid-containe-search">
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
                      src={
                        card.card_images?.[0]?.image_url || "fallback_image_url"
                      }
                      alt={card.name}
                      className="card-image"
                    />
                    <p>{card.name}</p>
                  </a>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
