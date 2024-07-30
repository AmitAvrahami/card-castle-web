import React, { useState, useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { getArticles, deleteArticle } from "../../services/articleService";
import { getDecks, deleteDeck } from "../../services/deckService";
import { getUsers, deleteUser, updateUser } from "../../services/userService";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import "./DatabasePage.css";

function DatabasePage() {
    const [articles, setArticles] = useState([]);
    const [decks, setDecks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesData = await getArticles();
                const decksData = await getDecks();
                const usersData = await getUsers();
                setArticles(articlesData);
                setDecks(decksData);
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteArticle = async (id) => {
        try {
            await deleteArticle(id);
            setArticles(articles.filter(article => article._id !== id));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    const handleDeleteDeck = async (id) => {
        try {
            await deleteDeck(id);
            setDecks(decks.filter(deck => deck._id !== id));
        } catch (error) {
            console.error("Error deleting deck:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleRoleChange = async (id, role) => {
        try {
            await updateUser(id, { role });
            setUsers(users.map(user =>
                user._id === id ? { ...user, role } : user
            ));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <NavScrollBar />
            <div className="accordions-container">
                <Accordion defaultActiveKey="0" className="mt-4">
                    {/* Articles Section */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Articles</Accordion.Header>
                        <Accordion.Body>
                            {articles.map(article => (
                                <Card key={article._id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text>{article.description}</Card.Text>
                                        <Button variant="danger" onClick={() => handleDeleteArticle(article._id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Decks Section */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Decks</Accordion.Header>
                        <Accordion.Body>
                            {decks.map(deck => (
                                <Card key={deck._id} className="mb-3">
                                    <Card.Img variant="top" src={deck.image} />
                                    <Card.Body>
                                        <Card.Title>{deck.title}</Card.Title>
                                        <Card.Text>{deck.description}</Card.Text>
                                        <Button variant="danger" onClick={() => handleDeleteDeck(deck._id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Users Section */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Users</Accordion.Header>
                        <Accordion.Body>
                            {users.map(user => (
                                <Card key={user._id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>Email: {user.email}</Card.Text>
                                        <Card.Text>Role:
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`role-${user._id}`}
                                                    checked={user.role === "Admin"}
                                                    onChange={() => handleRoleChange(user._id, "Admin")}
                                                />
                                                Admin
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`role-${user._id}`}
                                                    checked={user.role === "Visitor"}
                                                    onChange={() => handleRoleChange(user._id, "Visitor")}
                                                />
                                                Visitor
                                            </label>
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default DatabasePage;
