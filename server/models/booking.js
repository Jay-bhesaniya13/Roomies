const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  room_category_id: { type: mongoose.Types.ObjectId, ref: "RoomCategory", required: true },
  check_in_date: { type: Date, required: true },
  check_out_date: { type: Date, required: true },
  no_of_rooms: { type: Number, required: true },
  is_food_included: { type: Boolean, required: true },
  booking_status: {
    type: String,
    enum: ["Confirmed", "Cancelled", "Refunded"],
    default: "Confirmed",
  },
  no_of_members: { type: Number, required: true },
  book_date: { type: Date, default: Date.now },
  book_amount: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
