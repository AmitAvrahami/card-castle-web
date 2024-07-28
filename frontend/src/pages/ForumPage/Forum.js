import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forum.css";

function Forum() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch all articles from the backend
        axios
            .get("http://localhost:5000/articles")
            .then((response) => {
                setArticles(response.data);
                console.log("articles fetched:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
            });
    }, []);

    return (
        <div className="top-decks-container">
            <NavScrollBar />
            <Row xs={1} md={2} className="g-3 justify-content-center">
                {articles.map((article) => (
                    <Col key={article._id} className="custom-margin">
                        <Card className="h-100">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text className="flex-grow-1">{article.description}</Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Link to={`/article/${article._id}`}>
                                        <Button variant="primary" className="mt-auto align-self-end">Read More</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Forum;
