const express = require("express");

const router = express.Router();

const {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    getProviderBookings,
    getCustomerBookings,
    cancelBooking
} = require("../controllers/bookingController");

router.post("/create", createBooking);

router.get("/", getAllBookings);

router.get("/provider/:providerId", getProviderBookings);

router.get("/customer/:customerId", getCustomerBookings);

router.put("/cancel/:id", cancelBooking);

router.put("/:id/status", updateBookingStatus);

module.exports = router;