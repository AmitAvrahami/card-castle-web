import axios from "axios";

const API_URL = "http://localhost:5000/user_service";

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/find/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const verifyPassword = async (oldPassword, user, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/verify-password`, {
      oldPassword,
      user,
      newPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};
