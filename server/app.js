const express = require("express");
const mongoose = require("mongoose");
const hotelRoutes = require("./routes/hotel");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/booking");
const roomCategoryRoutes = require("./routes/roomCategory");

const app = express();

app.use(express.json()); // Parse JSON request bodies

// Database connection
mongoose
  .connect("mongodb://localhost:27017/roomies")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/API/hotel", hotelRoutes);
app.use("/API/user", userRoutes);
app.use("/API/booking", bookingRoutes);
app.use("/API/roomCategory", roomCategoryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
