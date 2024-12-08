const RoomCategory = require("../models/roomCategory"); // Keep this at the top

// Create a new room category
const createRoomCategory = async (req, res) => {
  try {
    const { hotel_id, category_name, max_bed_per_room, available_room, total_room, amount_per_person } = req.body;

    if (!hotel_id || !category_name || !max_bed_per_room || !available_room || !total_room || !amount_per_person) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const roomCategory = new RoomCategory({
      hotel_id,
      category_name,
      max_bed_per_room,
      available_room,
      total_room,
      amount_per_person,
    });

    const savedRoomCategory = await roomCategory.save();
    res.status(201).json({ message: "Room category created successfully", roomCategory: savedRoomCategory });
  } catch (error) {
    console.error("Error creating room category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get room category details by ID
const getRoomCategoryById = async (req, res) => {
  try {
    const { room_category_id } = req.params;

    const roomCategory = await RoomCategory.findById(room_category_id).populate("hotel_id", "hotel_name hotel_location");

    if (!roomCategory) {
      return res.status(404).json({ error: "Room category not found" });
    }

    res.status(200).json(roomCategory);
  } catch (error) {
    console.error("Error retrieving room category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update room category details
const updateRoomCategory = async (req, res) => {
  try {
    const { room_category_id } = req.params;
    const { category_name, max_bed_per_room, available_room, total_room, amount_per_person } = req.body;

    const updatedRoomCategory = await RoomCategory.findByIdAndUpdate(
      room_category_id,
      { category_name, max_bed_per_room, available_room, total_room, amount_per_person },
      { new: true }
    );

    if (!updatedRoomCategory) {
      return res.status(404).json({ error: "Room category not found" });
    }

    res.status(200).json({ message: "Room category updated successfully", roomCategory: updatedRoomCategory });
  } catch (error) {
    console.error("Error updating room category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark room category as non-existent
const deleteRoomCategory = async (req, res) => {
  try {
    const { room_category_id } = req.params;

    const updatedRoomCategory = await RoomCategory.findByIdAndUpdate(
      room_category_id,
      { isExistCategory: false },
      { new: true }
    );

    if (!updatedRoomCategory) {
      return res.status(404).json({ error: "Room category not found" });
    }

    res.status(200).json({ message: "Room category marked as non-existent", roomCategory: updatedRoomCategory });
  } catch (error) {
    console.error("Error deleting room category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRoomCategory,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
};
