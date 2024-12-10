const express = require("express");
const {
  createRoomCategory,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
  getRoomCategoriesByHotelId
} = require("../controllers/roomCategory");

const router = express.Router();

// Define the POST route for creating a room category
router.post("/create", createRoomCategory);
router.get("/hotel/:hotel_id",getRoomCategoriesByHotelId);
 router.get("/:room_category_id", getRoomCategoryById);
router.put("/:room_category_id", updateRoomCategory);
router.delete("/:room_category_id", deleteRoomCategory);

module.exports = router;
