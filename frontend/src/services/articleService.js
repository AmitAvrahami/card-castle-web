import axios from "axios";

const API_URL = "https://card-castle.onrender.com/articles";

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

export const deleteComment = async (articleId, commentId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${articleId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const createArticle = async (article) => {
  try {
    const response = await axios.post(API_URL, article);
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const getArticlesBySubject = async (subject) => {
  try {
    const response = await axios.get(`${API_URL}/subject/${subject}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles by subject:", error);
    throw error;
  }
};
