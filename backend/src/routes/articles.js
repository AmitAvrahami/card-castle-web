// backend/src/routes/article.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("../../models/Article");

const router = express.Router();

const URI_MDB = process.env.MONGODB_URI;

mongoose
    .connect(URI_MDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

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
router.post("/", async (req, res) => {
    const { title, description, comments } = req.body;
    try {
        const newArticle = new Article({ title, description, comments });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ message: "Error creating article" });
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

module.exports = router;
