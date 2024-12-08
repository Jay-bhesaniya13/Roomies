const express = require("express");
const { createUser, getUserById, deleteUser, updateUser } = require("../controllers/user");

const router = express.Router();

// Route to create a new user
router.post("/create", createUser);

// Route to get user details by user_id
router.get("/:user_id", getUserById);

// Route to update user details
router.put("/:user_id", updateUser);

// Route to mark user as inactive (closed)
router.delete("/:user_id", deleteUser);

module.exports = router;