const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
  
  hotel_name: { type: String, required: true },
  hotel_location: { type: String, required: true },
  contact_no: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  hotel_status: { type: String, required: true }, // e.g., Active, Inactive
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
