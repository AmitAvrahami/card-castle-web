// backend/src/index.js
const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser');

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth")

const app = express();
const port = 5000;

app.use(cors({
  origin: [`http://localhost:3000`],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use("/api", apiRoutes);
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
