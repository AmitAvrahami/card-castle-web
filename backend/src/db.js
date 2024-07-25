const mongoose = require("mongoose");
require("dotenv").config();

const URI_MDB = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI_MDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
