const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile_no: { type: String, required: true },
  age: { type: Number, required: true },
  active_status: { 
    type: String, 
    enum: ["closed", "open"], 
    required: true 
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
