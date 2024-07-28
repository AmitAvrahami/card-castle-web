import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import CreateArticleModal from "../../components/CreateArticleModal/CreateArticleModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forum.css";

function Forum() {
    const [articles, setArticles] = useState([]);
    const [createModalShow, setCreateModalShow] = useState(false);

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
            <div className="button">
                <Button variant="primary" onClick={() => setCreateModalShow(true)}>
                    Create Article
                </Button>
            </div>
            <Row xs={1} md={2} className="g-3 justify-content-center">
                {articles.map((article) => (
                    <Col key={article._id} className="custom-margin">
                        <Card className="fixed-card">
                            <Card.Body>
                                <Card.Title className="card-title">{article.title}</Card.Title>
                                <Card.Text className="card-description">{article.description}</Card.Text>
                                <Link to={`/article/${article._id}`}>
                                    <Button variant="primary">Read More</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <CreateArticleModal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
                setArticles={setArticles}
            />
        </div>
    );
}

export default Forum;
