const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/Tasks");
const cors = require("cors");

dotenv.config(); // Ini akan membaca file .env dan mengkonfigurasi variabel lingkungan

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use("/api/", taskRoutes);

// Database connection
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
