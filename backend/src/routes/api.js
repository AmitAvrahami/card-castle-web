// backend/src/routes/api.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const YGO_API_URL = "https://db.ygoprodeck.com/api/v7";

// Get the first 250 cards
// router.get('/cards', async (req, res) => {
//     try {
//         const response = await axios.get(YGO_API_URL + "/cardinfo.php");
//         const cards = response.data.data.slice(0, 1500);
//         res.json(cards);
//     } catch (error) {
//         console.error('Error fetching cards:', error);
//         res.status(500).send('Error fetching cards');
//     }
// });

router.get("/cards", async (req, res) => {
  try {
    const response = await axios.get(YGO_API_URL + "/cardinfo.php");
    const cards = response.data.data;
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).send("Error fetching cards");
  }
});

router.get("/sets", async (req, res) => {
  try {
    const cardResponse = await axios.get(`${YGO_API_URL}/cardinfo.php`);
    const cards = cardResponse.data.data.slice(0, 1500);

    const setResponse = await axios.get(`${YGO_API_URL}/cardsets.php`);
    const sets = setResponse.data;

    // Collect unique set names from card_sets
    const cardSetNames = cards.reduce((setNames, card) => {
      if (card.card_sets) {
        card.card_sets.forEach((set) => {
          if (!setNames.includes(set.set_name)) {
            setNames.push(set.set_name);
          }
        });
      }
      return setNames;
    }, []);

    // Filter sets based on whether they appear in cardSetNames and have an image
    const validSets = sets.filter(
      (set) => set.set_image && cardSetNames.includes(set.set_name)
    );

    res.json(validSets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).send("Error fetching sets");
  }
});

module.exports = router;
