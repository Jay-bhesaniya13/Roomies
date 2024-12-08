const Hotel = require("../models/hotel");

// Controller to create a new hotel
const createHotel = async (req, res) => {
  try {
    // Destructure properties from the request body
    const { hotel_name, hotel_location, contact_no, email_id, hotel_status } = req.body;

    // Validate that all required fields are provided
    if (!hotel_name || !hotel_location || !contact_no || !email_id || !hotel_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the hotel already exists (optional, based on unique email_id)
    const existingHotel = await Hotel.findOne({ email_id });
    if (existingHotel) {
      return res.status(409).json({ error: "Hotel with this email already exists" });
    }

    // Create a new hotel
    const newHotel = new Hotel({
      hotel_name,
      hotel_location,
      contact_no,
      email_id,
      hotel_status,
    });

    // Save the hotel to the database
    const savedHotel = await newHotel.save();
    res.status(201).json({ message: "Hotel created successfully", hotel: savedHotel });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 
// Get hotel details by hotel_id
const getHotelById = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    console.log("Hotel ID received:", hotel_id);

    // Find the hotel with the given hotel_id
    const hotel = await Hotel.findOne({ _id:hotel_id });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Return hotel details
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel", error: error.message });
  }
};

const getAllHotels = async (req, res) => {
    try {
      // Find all hotel documents in the database
      const hotels = await Hotel.find({});
      
      if (hotels.length === 0) {
        return res.status(404).json({ message: "No hotels found" });
      }
  
      // Return the list of hotels
      res.status(200).json(hotels);
    } catch (error) {
      console.error("Error retrieving hotels:", error);
      res.status(500).json({ message: "Error retrieving hotels", error: error.message });
    }
  };


// Controller to update hotel details by hotel_id
const updateHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const updates = req.body;

    // List of valid fields in the Hotel schema
    const validFields = ["hotel_name", "hotel_location", "contact_no", "email_id"];

    // Filter out any invalid fields from the updates
    const filteredUpdates = {};
    for (const key in updates) {
      if (validFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }  
    }

    // Validate that there are fields to update
    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({ error: "No valid update data provided" });
    }

    // Find the hotel by ID and update it with the filtered data
    const updatedHotel = await Hotel.findByIdAndUpdate(hotel_id, filteredUpdates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Return the updated hotel details
    res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Error updating hotel", error: error.message });
  }
};
  
// Controller to mark hotel as permanently closed by hotel_id
const deleteHotel = async (req, res) => {
    try {
      const { hotel_id } = req.params;
  
      // Find the hotel by ID and update its status to "permanently closed"
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotel_id,
        { hotel_status: "permanently closed" },
        { new: true, runValidators: true } // Return the updated document and apply validation rules
      );
  
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      // Return the updated hotel details
      res.status(200).json({
        message: "Hotel status updated to 'permanently closed'",
        hotel: updatedHotel,
      });
    } catch (error) {
      console.error("Error updating hotel status:", error);
      res.status(500).json({ message: "Error updating hotel status", error: error.message });
    }
  };
 

module.exports = { createHotel ,getHotelById , getAllHotels ,updateHotel ,deleteHotel };
