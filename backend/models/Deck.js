// models/Deck.js
const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    youtubeLink: { type: String, required: false },
    cards: [
        {
            cardId: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
