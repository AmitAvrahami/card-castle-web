// backend/src/routes/api.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const YGO_API_URL = 'https://db.ygoprodeck.com/api/v7';

// Get the first 250 cards
router.get('/cards', async (req, res) => {
    try {
        const response = await axios.get(YGO_API_URL + "/cardinfo.php");
        const cards = response.data.data.slice(0, 250); // Assuming the API returns an array in response.data.data
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Error fetching cards');
    }
});

router.get('/sets', async (req, res) => {
    try {
        const response = await axios.get(YGO_API_URL + "/cardsets.php");
        const cards = response.data.data.slice(0, 50); // Assuming the API returns an array in response.data.data
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Error fetching cards');
    }
});

module.exports = router;
