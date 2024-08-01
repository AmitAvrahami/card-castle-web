import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useUserContext } from "../context/userContext";
import { createArticle } from "../../services/articleService";

function CreateArticleModal({ show, onHide, setArticles }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("News");
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const { user } = useUserContext();

    const handleUpload = async () => {
        const newArticle = { userId: user._id, title, description, subject };
        try {
            const response = await createArticle(newArticle);
            setArticles((prevArticles) => [response, ...prevArticles]);
            onHide();
            setConfirmModalShow(false); // Close the confirm modal
            window.location.reload();
        } catch (error) {
            console.error("Error creating article:", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter the description"
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                as="select"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            >
                                <option value="News">News</option>
                                <option value="General Discussion">General Discussion</option>
                                <option value="Deck Building">Deck Building</option>
                                <option value="Organize Duel">Organize Duel</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setConfirmModalShow(true)}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmModalShow} onHide={() => setConfirmModalShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to upload this article?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setConfirmModalShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Yes, Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateArticleModal;
