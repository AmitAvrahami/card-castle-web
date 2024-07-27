// backend/src/routes/decks.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Deck = require("../../models/Deck");

const router = express.Router();

const URI_MDB = process.env.MONGODB_URI;

mongoose
  .connect(URI_MDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Fetch all decks
router.get("/", async (req, res) => {
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ message: "Error fetching decks" });
  }
});

// Fetch a single deck by ID
router.get("/:id", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    res.json(deck);
  } catch (error) {
    console.error("Error fetching deck:", error);
    res.status(500).json({ message: "Error fetching deck" });
  }
});

// Create a new deck
router.post("/", async (req, res) => {
  const { id, image, title, description, cards } = req.body;
  try {
    const newDeck = new Deck({ id, image, title, description, cards });
    await newDeck.save();
    res.status(201).json(newDeck);
  } catch (error) {
    console.error("Error creating deck:", error);
    res.status(500).json({ message: "Error creating deck" });
  }
});

// Update a deck by ID
router.put("/:id", async (req, res) => {
  const { image, title, description, cards } = req.body;
  try {
    const updatedDeck = await Deck.findByIdAndUpdate(
      req.params.id,
      { image, title, description, cards },
      { new: true }
    );
    if (!updatedDeck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    res.json(updatedDeck);
  } catch (error) {
    console.error("Error updating deck:", error);
    res.status(500).json({ message: "Error updating deck" });
  }
});

// Delete a deck by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
    if (!deletedDeck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    res.json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error("Error deleting deck:", error);
    res.status(500).json({ message: "Error deleting deck" });
  }
});

module.exports = router;
