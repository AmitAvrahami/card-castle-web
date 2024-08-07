// backend/src/routes/api.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const YGO_API_URL = "https://db.ygoprodeck.com/api/v7";

router.get("/cards", async (req, res) => {
  try {
    const query = req.query;
    const response = await axios.get(`${YGO_API_URL}/cardinfo.php`, {
      params: query,
    });
    const cards = response.data.data;
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
});

router.get("/sets", async (req, res) => {
  try {
    // Fetch all sets
    const setResponse = await axios.get(`${YGO_API_URL}/cardsets.php`);
    const sets = setResponse.data;

    // Fetch cards to collect set names and prices
    const cardResponse = await axios.get(`${YGO_API_URL}/cardinfo.php`);
    const cards = cardResponse.data.data.slice(0, 1500);

    // Create a map to store total prices of sets
    const setPrices = {};

    // Calculate the total price of each set
    cards.forEach((card) => {
      if (card.card_sets) {
        card.card_sets.forEach((set) => {
          if (!setPrices[set.set_name]) {
            setPrices[set.set_name] = 0;
          }
          if (set.set_price) {
            setPrices[set.set_name] += parseFloat(set.set_price);
          }
        });
      }
    });

    // Add total price to each set
    const validSets = sets
      .filter((set) => set.set_image)
      .map((set) => {
        return {
          ...set,
          total_price: setPrices[set.set_name] || 15,
        };
      });

    res.json(validSets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).send("Error fetching sets");
  }
});
module.exports = router;
