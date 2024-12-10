const User = require("../models/user");
const bcrypt = require('bcryptjs');
 
// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, mobile_no, age, active_status, password } = req.body;

    // Validate required fields
    if (!name || !email || !mobile_no || !age || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new user without hashing the password
    const newUser = new User({
      name,
      email,
      mobile_no,
      age,
      password, // Store password as plain text (not secure)
      active_status: active_status || "open",
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the password matches (plain text comparison)
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Successfully authenticated, return user data (exclude password)
    res.status(200).json({
      msg: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile_no: user.mobile_no,
        age: user.age,
      },
      authenticate:"true"
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createUser, loginUser };

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

  //update password and name


 const updateUser= async (req, res) => {
    try {
      const { userId } = req.params;
        const {  oldPassword, newPassword, newName } = req.body;
        
        // Find the user by ID
        console.log("userId in controller:"+ userId)
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        // Verify the old password
         console.log("user.password:"+user.password)
        console.log("oldPassword"+oldPassword)
        if (oldPassword !== user.password) {
          return res.status(400).json({ msg: 'Old password is incorrect' });
      }
        
        // Update the name and/or password
        if (newName) {
            user.name = newName;
        }
        
        if (newPassword) {
              user.password = newPassword;
        }
        
        await user.save();
        res.status(200).json({ msg: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ msg: 'Server error' });
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

 
 

module.exports = { createUser, getUserById, deleteUser, updateUser , loginUser};
