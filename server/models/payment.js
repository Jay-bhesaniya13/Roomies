const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  booking_id: { type: mongoose.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  payment_status: { type: String, required: true }, // e.g., Paid, Pending
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
