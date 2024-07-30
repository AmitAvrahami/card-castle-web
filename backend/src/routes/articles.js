// backend/src/routes/article.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("../../models/Article");

const router = express.Router();

// Fetch all articles
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Error fetching articles" });
    }
});

// Fetch a single article by ID
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ message: "Error fetching article" });
    }
});

// Create a new article
router.post('/', async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        // Add the initial comment to the comments array
        const newArticle = new Article({
            userId,
            title,
            description,
            comments: [{ userId, comment: description }]
        });

        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ error: 'Error creating article' });
    }
});


// Update an article by ID
router.put("/:id", async (req, res) => {
    const { title, description, comments } = req.body;
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { title, description, comments },
            { new: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ message: "Error updating article" });
    }
});

router.post("/:id/comments", async (req, res) => {
    try {
        const { userId, comment } = req.body;
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        article.comments.push({ userId, comment });
        await article.save();

        const updatedArticle = await Article.findById(req.params.id); // Fetch the updated article
        const addedComment = updatedArticle.comments[updatedArticle.comments.length - 1]; // Get the last added comment
        res.status(201).json(addedComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error adding comment" });
    }
});

// Delete an article by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Error deleting article" });
    }
});

// Delete a comment by index from an article
router.delete("/:id/comments/:commentId", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Filter out the comment to be deleted
        article.comments = article.comments.filter(comment => comment._id.toString() !== req.params.commentId);

        await article.save();
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Error deleting comment" });
    }
});

module.exports = router;
