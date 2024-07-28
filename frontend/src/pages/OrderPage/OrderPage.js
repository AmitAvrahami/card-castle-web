import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUserContext } from "../../components/context/userContext";
import "./OrderPage.css";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

const OrderPage = () => {
  const { user } = useUserContext();
  const [searchDate, setSearchDate] = useState("");
  const [searchCardName, setSearchCardName] = useState("");
  const [searchCity, setSearchCity] = useState("");

  if (!user || !user.purchased_cards) {
    return (
      <>
        <NavScrollBar />
        <div className="centered-content">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const orders = user.purchased_cards;

  const uniqueDates = [
    ...new Set(
      orders.map((order) => new Date(order.purchase_date).toLocaleDateString())
    ),
  ];

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.purchase_date).toLocaleDateString();
    const matchDate = searchDate ? orderDate === searchDate : true;
    const matchCardName = searchCardName
      ? order.card_name?.toLowerCase().includes(searchCardName.toLowerCase())
      : true;
    const matchCity = searchCity
      ? order.city?.toLowerCase().includes(searchCity.toLowerCase())
      : true;

    return matchDate && matchCardName && matchCity;
  });

  return (
    <>
      <NavScrollBar />
      <div className="order-page">
        <h1>Your Orders</h1>
        <Form className="search-form centered-content">
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Group controlId="searchDate">
                <Form.Label>Search by Date</Form.Label>
                <Form.Select
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className={searchDate ? "selected" : ""}
                >
                  <option value="">Select a date</option>
                  {uniqueDates.map((date, index) => (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="searchCardName">
                <Form.Label>Search by Card Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card name"
                  value={searchCardName}
                  onChange={(e) => setSearchCardName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="searchCity">
                <Form.Label>Search by City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button variant="primary" className="search-button">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="centered-content">
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            filteredOrders.map((order, index) => (
              <Card key={index} className="order-card">
                <Card.Header>
                  Order Date:{" "}
                  {new Date(order.purchase_date).toLocaleDateString()}
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Card Name:</strong> {order.card_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price:</strong> ${order.card_price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Description:</strong> {order.card_description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Quantity:</strong> {order.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Address:</strong> {order.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>City:</strong> {order.city}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Postal Code:</strong> {order.postal_code}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone Number:</strong> {order.phone_number}
                    </ListGroup.Item>
                    {order.delivery_notes && (
                      <ListGroup.Item>
                        <strong>Delivery Notes:</strong> {order.delivery_notes}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                  {order.card_image && (
                    <div className="img-container">
                      <img
                        src={order.card_image}
                        alt={order.card_name}
                        className="order-card-image"
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
