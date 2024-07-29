import axios from "axios";

const API_URL = "http://localhost:5000/articles";

export const getArticles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

export const getArticle = async (articleId) => {
    try {
        const response = await axios.get(`${API_URL}/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
    }
};

export const deleteArticle = async (articleId) => {
    try {
        const response = await axios.delete(`${API_URL}/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
};
