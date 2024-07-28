import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useUserContext } from "../../components/context/userContext";
import "./OrderPage.css";

const OrderPage = () => {
  const { user, setUser } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserAndSetOrders = () => {
      setTimeout(() => {
        if (user && user.purchased_cards) {
          setOrders(user.purchased_cards);
        } else {
          setError("User not logged in or no orders found");
        }
        setLoading(false);
      }, 3000); // 1 second delay
    };

    checkUserAndSetOrders();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className="order-card">
            <Card.Header>
              Order Date: {new Date(order.purchase_date).toLocaleDateString()}
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
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderPage;
