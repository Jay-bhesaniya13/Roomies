const Booking = require("../models/booking");
const RoomCategory = require("../models/roomCategory");


// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      room_category_id,
      check_in_date,
      check_out_date,
      no_of_members,
      is_food_included,
    } = req.body;

    if (!user_id || !room_category_id || !check_in_date || !check_out_date || !no_of_members) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Calculate the number of days
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);
    const timeDifference = checkOut.getTime() - checkIn.getTime()+1;
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

    if (numberOfDays <= 0) {
      return res.status(400).json({ error: "Check-out date must be later than check-in date" });
    }

    // Fetch room category details
    const roomCategory = await RoomCategory.findById(room_category_id);
    if (!roomCategory) {
      return res.status(404).json({ error: "Room category not found" });
    }

    console.log("Room Category Details:", roomCategory);

    // Ensure required fields in roomCategory exist and are valid
    if (
      typeof roomCategory.amount_per_room !== "number" ||
      typeof roomCategory.max_bed_per_room !== "number" ||
      typeof roomCategory.food_charge !== "number"
    ) {
      console.log("roomCategory.amount_per_person:"+roomCategory.amount_per_rom)
      console.log("roomCategory.max_bed_per_room:"+roomCategory.max_bed_per_room)
      console.log("food_charge:"+food_charge) 
      return res.status(500).json({ error: "Room category data is incomplete" });
    }
      

    // Calculate rooms required
    const rooms_required = Math.ceil(no_of_members / roomCategory.max_bed_per_room);
    if (rooms_required > roomCategory.available_room) {
      return res.status(400).json({ error: "Not enough rooms available" });
    }

    console.log("Rooms Required:", rooms_required);

    // Calculate base booking amount
    let book_amount =
      rooms_required * roomCategory.amount_per_room * numberOfDays;

    // Add food charges if food is included
    if (is_food_included) {
      const food_charge = roomCategory.food_charge * no_of_members * numberOfDays;
      console.log("Food Charge:", food_charge);
      console.log("number of days:"+numberOfDays)
      book_amount += food_charge;
    }

    console.log("Calculated Booking Amount:", book_amount);

    // Ensure booking amount is a valid number
    if (isNaN(book_amount)) {
      return res.status(500).json({ error: "Error calculating booking amount" });
    }

    // Create booking
    const booking = new Booking({
      user_id,
      room_category_id,
      check_in_date,
      check_out_date,
      no_of_rooms: rooms_required,
      no_of_members,
      is_food_included,
      booking_status: "Confirmed",
      book_amount,
    });

    const savedBooking = await booking.save();

    // Update room availability
    roomCategory.available_room -= rooms_required;
    await roomCategory.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get booking details by ID
const getBookingById = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id)
      .populate("user_id", "name email")
      .populate("room_category_id");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error retrieving booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
     
    console.log("Fetching bookings for user_id:", user_id);

    // Fetch all bookings with populated room category and hotel name
    const bookings = await Booking.find({ user_id })
    .populate({
        path: 'room_category_id',
        select:'category_name' ,
        populate: {
            path: 'hotel_id', // Populate the hotel_id inside RoomCategory
            select: 'hotel_name', // Only retrieve hotel_name
        },
    });

    // Check if any bookings are found
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user_id." });
    }
    console.log(bookings)
    // Return the bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


// Update check-in and check-out dates
const updateBookingDates = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { check_in_date, check_out_date } = req.body;

    if (new Date(check_in_date) >= new Date(check_out_date)) {
      return res.status(400).json({ error: "Check-in date must be earlier than check-out date" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking_id,
      { check_in_date, check_out_date },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking dates updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking dates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { partial_cancel_member } = req.body;

    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (partial_cancel_member) {
      // Partial cancellation logic
      if (partial_cancel_member >= booking.no_of_members) {
        return res.status(400).json({ error: "Partial cancel members exceed or equal total booked members" });
      }

      const roomCategory = await RoomCategory.findById(booking.room_category_id);
      if (!roomCategory) {
        return res.status(404).json({ error: "Room category not found" });
      }

      // Calculate the cancellation charge for the canceled members
      const canceled_members_cost = partial_cancel_member * roomCategory.amount_per_person;
      const cancellation_charge = 0.2 * canceled_members_cost;

      // Adjust members and rooms
      booking.no_of_members -= partial_cancel_member;
      const previous_rooms_required = booking.no_of_rooms;
      const new_rooms_required = Math.ceil(booking.no_of_members / roomCategory.max_bed_per_room);

      // Update room availability
      const rooms_released = previous_rooms_required - new_rooms_required;
      booking.no_of_rooms = new_rooms_required;
      roomCategory.available_room += rooms_released;

      // Update booking amount
      booking.book_amount -= canceled_members_cost;
      booking.book_amount += cancellation_charge; // Add the 20% cancellation charge

      await booking.save();
      await roomCategory.save();

      return res.status(200).json({
        message: `${partial_cancel_member} member(s) cancelled successfully`,
        cancellation_charge,
        updated_booking: booking,
      });
    } else {
      // Full cancellation logic
      const roomCategory = await RoomCategory.findById(booking.room_category_id);

      // Calculate 15% cancellation charge
      const cancellation_charge = 0.15 * booking.book_amount;

      // Update booking status and amount
      booking.booking_status = "Cancelled";
      booking.cancellation_charge = cancellation_charge; // Add the cancellation charge property
      booking.refund_amount=booking.book_amount - cancellation_charge;

      if (roomCategory) {
        // Release all rooms
        roomCategory.available_room += booking.no_of_rooms;
        await roomCategory.save();
      }

      await booking.save();

      return res.status(200).json({
        message: "Booking fully cancelled successfully",
        cancellation_charge,
        updated_booking: booking,
      });
    }
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  createBooking,
  getBookingById,
  updateBookingDates,
  cancelBooking,
  getBookingByUserId
};
