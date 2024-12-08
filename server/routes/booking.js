const express = require("express");
const {
  createBooking,
  getBookingById,
  updateBookingDates,
  cancelBooking,
} = require("../controllers/booking");

const router = express.Router();

// POST: Create a new booking
router.post("/create", createBooking);

// GET: Get booking details by ID
router.get("/:booking_id", getBookingById);

// PUT: Update check-in and check-out dates
router.put("/:booking_id", updateBookingDates);

// DELETE: Cancel a booking
router.delete("/:booking_id", cancelBooking);

module.exports = router;
