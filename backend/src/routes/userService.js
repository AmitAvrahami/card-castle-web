require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const router = express.Router();

// Fetch all users
router.get("/get_all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Fetch a single user by ID
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Update a user by ID
router.put("/update/:id", async (req, res) => {
  const { name, email, password, role, shopping_cart, purchased_cards } =
    req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role, shopping_cart, purchased_cards },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/verify-password", async (req, res) => {
  const { oldPassword, user, newPassword } = req.body;
  try {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(
        user._id,
        { password: hashedPassword },
        { new: true }
      );
      res.status(200).send(true);
    } else {
      res.status(400).send(false);
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
