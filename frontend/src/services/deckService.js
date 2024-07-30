import axios from "axios";

const API_URL = "http://localhost:5000/decks";


export const createDeck = async (deckData) => {
    try {
        const response = await axios.post(API_URL, deckData);
        return response.data;
    } catch (error) {
        console.error("Error creating deck:", error);
        throw error;
    }
};

export const getDecks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching decks:", error);
        throw error;
    }
};

export const getDeck = async (deckId) => {
    try {
        const response = await axios.get(`${API_URL}/${deckId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching deck:", error);
        throw error;
    }
};

export const deleteDeck = async (deckId) => {
    try {
        const response = await axios.delete(`${API_URL}/${deckId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting deck:", error);
        throw error;
    }
};


