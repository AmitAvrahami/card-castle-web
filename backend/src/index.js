// backend/src/index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const decksRoutes = require("./routes/decks");
const userServiceRouts = require("./routes/userService");
const articlesRoutes = require("./routes/articles");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "https://card-castle.netlify.app",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/decks", decksRoutes);
app.use("/user_service", userServiceRouts);
app.use("/articles", articlesRoutes);
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
