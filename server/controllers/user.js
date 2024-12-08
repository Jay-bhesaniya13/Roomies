const User = require("../models/user");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, mobile_no, age, active_status } = req.body;

    // Validate required fields
    if (!name || !email || !mobile_no || !age) {
      return res.status(400).json({ error: "All fields except active_status are required" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      mobile_no,
      age,
      active_status: active_status || "open",
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user details by user_id
const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mark user as inactive (closed)
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { active_status: "closed" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `${updatedUser.name} marked as closed`, user: updatedUser });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updates = req.body;

    // Validate updates (only allow schema fields)
    const validFields = ["name", "email", "mobile_no", "age", "active_status"];
    const filteredUpdates = {};
    for (const key in updates) {
      if (validFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(user_id, filteredUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUserById, deleteUser, updateUser };
