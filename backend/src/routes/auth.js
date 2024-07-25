// backend/src/routes/auth.js
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../../models/User");

const router = express.Router();

const URI_MDB = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose
  .connect(URI_MDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.json({ status: "Success" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error signing up" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              jwtSecret,
              { expiresIn: "1d" }
            );
            res.cookie("token", token, { httpOnly: true, secure: false });
            return res.json({ status: "Success", user });
          } else {
            return res.status(400).json({ message: "Password is incorrect" });
          }
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Error during login" });
    });
});

router.get("/validate", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    UserModel.findOne({ email: decoded.email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.json({ status: "Success", user });
      })
      .catch((err) => {
        console.error("Error finding user:", err);
        return res.status(500).json({ message: "Error finding user" });
      });
  });
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ status: "Success" });
});

module.exports = router;
