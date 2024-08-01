import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import CreateArticleModal from "../../components/CreateArticleModal/CreateArticleModal";
import { useUserContext } from "../../components/context/userContext";
import { getArticles, deleteArticle, getArticlesBySubject } from "../../services/articleService";
import Form from "react-bootstrap/Form"; // Import Form
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forum.css";

function Forum() {
  const [articles, setArticles] = useState([]);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleCreateArticle = () => {
    if (!user) {
      alert("You need to be logged in to create an article.");
      return;
    }
    setCreateModalShow(true);
  };

  const handleDeleteArticle = async (articleId) => {
    if (!user) {
      alert("You need to be logged in to delete an article.");
      return;
    }

    try {
      await deleteArticle(articleId);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleFilterArticles = async (subject) => {
    try {
      const filteredArticles = await getArticlesBySubject(subject);
      setArticles(filteredArticles); // Update the state with filtered articles
    } catch (error) {
      console.error("Error filtering articles:", error);
    }
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    handleFilterArticles(subject);
  };

  return (
    <div className="top-decks-container">
      <NavScrollBar />
      <div className="button">
        <Button
          variant="primary"
          className="create-btn"
          onClick={handleCreateArticle}
        >
          Create Article
        </Button>
      </div>

      <Form className="subject-form">
        <Form.Group controlId="subjectSelect">
          <Form.Label>Filter by Subject</Form.Label>
          <Form.Control as="select" value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">All Subjects</option>
            <option value="Deck Building">Deck Building</option>
            <option value="Organize Duel">Organize Duel</option>
            <option value="General Discussion">General Discussion</option>
            <option value="News">News</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <Row xs={1} md={2} className="g-3 justify-content-center">
        {articles.map((article) => (
          <Col key={article._id} className="custom-margin">
            <Card className="fixed-card">
              {user && user._id === article.userId && (
                <CloseButton
                  className="close-button"
                  onClick={() => handleDeleteArticle(article._id)}
                />
              )}
              <Card.Body>
                <Card.Title className="card-title">{article.title}</Card.Title>
                <Card.Text className="card-description-article">
                  {article.description}
                </Card.Text>
                <Link to={`/article/${article._id}`}>
                  <Button variant="primary" className="read-more-button">
                    Read More
                  </Button>
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
