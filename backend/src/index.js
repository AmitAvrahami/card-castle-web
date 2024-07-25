// backend/src/index.js
const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser');
// const connectDB = require("./db");

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth")
const decksRoutes = require("./routes/decks");

const app = express();
const port = 5000;

// connectDB();

app.use(cors({
  origin: [`http://localhost:3000`],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use("/api", apiRoutes);
app.use("/auth", authRoutes)
app.use("/decks", decksRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
