// backend/src/index.js
const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");

const app = express();
const port = 5000;

const URI = "mongodb+srv://yugioh:123sdnkuj@cluster0.nh9e91t.mongodb.net/yugioh"
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

const dataSchema = new mongoose.Schema({
  name: String,
  id: String
})

const Data = mongoose.model('dataTable', dataScheme)

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
