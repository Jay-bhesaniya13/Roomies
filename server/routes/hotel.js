const express = require("express");
const { createHotel ,getHotelById ,getAllHotels ,updateHotel ,deleteHotel } = require("../controllers/hotel");

const router = express.Router();

// POST route to create a new hotel
router.post("/create", createHotel);

// Route to get hotel details by hotel_id
router.get("/:hotel_id", getHotelById);

// Route to get all hotel details  
router.get("/", getAllHotels);

// Route to get all hotel details  
router.put("/:hotel_id", updateHotel);

// Route to permanantly close hotel    
router.delete("/:hotel_id", deleteHotel);

module.exports = router;
