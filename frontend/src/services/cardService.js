import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api'; // Adjust this URL to match your backend

/**
 * Fetch all cards with optional search parameters.
 * @param {Object} params - Search parameters to include in the query.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of cards.
 */
export const fetchCards = async (params = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
};

/**
 * Fetch a single card by its name.
 * @param {string} name - The name of the card to search for.
 * @returns {Promise<Object>} - A promise that resolves to the card data.
 */
export const fetchCardByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards`, { params: { name } });
        return response.data;
    } catch (error) {
        console.error('Error fetching card by name:', error);
        throw error;
    }
};

/**
 * Fetch cards by their archetype.
 * @param {string} archetype - The archetype to search for.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of cards.
 */
export const fetchCardsByArchetype = async (archetype) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards`, { params: { archetype } });
        return response.data;
    } catch (error) {
        console.error('Error fetching cards by archetype:', error);
        throw error;
    }
};

/**
 * Fetch cards with various parameters.
 * @param {Object} params - Parameters for searching cards.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of cards.
 */
export const searchCards = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cards`, { params });
        return response.data;
    } catch (error) {
        console.error('Error searching cards:', error);
        throw error;
    }
};
