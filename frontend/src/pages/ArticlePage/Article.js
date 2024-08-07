import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import AddCommentModal from "../../components/AddCommentModal/AddCommentModal";
import { useUserContext } from "../../components/context/userContext";
import { getArticle, deleteComment } from "../../services/articleService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Article.css";

function Article() {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
  const { user } = useUserContext(); // Access the user context

  useEffect(() => {
    // Fetch the article data including comments
    const fetchArticle = async () => {
      try {
        const articleData = await getArticle(id);
        setArticle(articleData);
        await fetchUserNames(articleData.comments);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchArticle();
  }, [id]);

  // Fetch user names for each comment
  const fetchUserNames = async (comments) => {
    const updatedComments = await Promise.all(
      comments.map(async (comment, index) => {
        try {
          const userResponse = await axios.get(
            `https://card-castle.onrender.com/user_service/find/${comment.userId}`
          );
          return { ...comment, userName: userResponse.data.name, index };
        } catch (error) {
          console.error("Error fetching user:", error);
          return { ...comment, userName: "Unknown User", index };
        }
      })
    );
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    if (!user) {
      alert("You need to be logged in to add a comment.");
      return;
    }
    setModalShow(true);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="top-decks-container">
      <NavScrollBar />
      {article && (
        <div>
          <h1 className="article-title">{article.title}</h1>
          <Row xs={1} className="g-3 justify-content-center">
            {comments.map((comment, index) => (
              <div key={comment._id}>
                <Card
                  border="primary"
                  className="comment-card"
                  style={{
                    width: "80%",
                    margin: "0 auto",
                    backgroundColor: index === 0 ? "#d9edf7" : "white", // Different color for the first comment
                  }}
                >
                  <Card.Header className="card-header">
                    {comment.userName}
                    {index !== 0 && user && user._id === comment.userId && (
                      <CloseButton
                        className="float-end"
                        onClick={() => handleDeleteComment(comment._id)}
                      />
                    )}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{comment.comment}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={handleAddComment}>
              Add Comment
            </Button>
          </div>
        </div>
      )}
      <AddCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        articleId={id}
        setComments={setComments}
      />
    </div>
  );
}

export default Article;
