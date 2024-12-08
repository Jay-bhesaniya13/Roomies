const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomCategorySchema = new Schema({
  hotel_id: { type: mongoose.Types.ObjectId, ref: "Hotel", required: true },
  category_name: { type: String, required: true },
  max_bed_per_room: { type: Number, required: true },
  available_room: { type: Number, required: true },
  total_room: { type: Number, required: true },
  isExistCategory: { type: Boolean, default: true },
  amount_per_room: { type: Number, required: true }, 
  food_charge:{ type: Number, required: true } 
});

const RoomCategory = mongoose.model("RoomCategory", RoomCategorySchema);
module.exports = RoomCategory;
