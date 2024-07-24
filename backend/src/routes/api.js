// backend/src/routes/api.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");

const URI_MDB =
  "mongodb+srv://amitavxd3011:Amitxd3011@cluster0.cypywmh.mongodb.net/YO-GI-HO-DATA";
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

mongoose
  .connect(URI_MDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const usersData = mongoose.model("usersTable", userSchema);

router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new usersData({ username, password });
  console.log(newUser);
  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
