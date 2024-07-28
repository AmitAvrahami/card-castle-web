import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Article.css";

function Article() {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch the article data including comments
        axios
            .get(`http://localhost:5000/articles/${id}`)
            .then((response) => {
                setArticle(response.data);
                fetchUserNames(response.data.comments);
            })
            .catch((error) => {
                console.error("Error fetching article:", error);
            });
    }, [id]);

    // Fetch user names for each comment
    const fetchUserNames = async (comments) => {
        const updatedComments = await Promise.all(
            comments.map(async (comment, index) => {
                try {
                    const userResponse = await axios.get(`http://localhost:5000/user_service/find/${comment.userId}`);
                    return { ...comment, userName: userResponse.data.name, index };
                } catch (error) {
                    console.error("Error fetching user:", error);
                    return { ...comment, userName: "Unknown User", index };
                }
            })
        );
        setComments(updatedComments);
    };

    return (
        <div className="top-decks-container">
            <NavScrollBar />
            {article && (
                <div>
                    <h1 className="article-title">{article.title}</h1>
                    <Row xs={1} className="g-3 justify-content-center">
                        {comments.map((comment) => (
                            <div>
                                <Card
                                    key={comment._id}
                                    border="primary"
                                    className="comment-card"
                                    style={{
                                        width: '80%',
                                        margin: '0 auto',
                                        backgroundColor: comment.index === 0 ? '#d9edf7' : 'white' // Different color for the first comment
                                    }}
                                >
                                    <Card.Header className="card-header">{comment.userName}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{comment.comment}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );
}

export default Article;
