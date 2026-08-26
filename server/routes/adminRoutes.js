const express = require("express");

const router = express.Router();

const {
    getDashboardStats,

    getAllUsers,
    deleteUser,

    getAllProviders,

    getAllBookings,
    updateBookingStatus,
    deleteBooking,

    getAllServices,
    addService,
    updateService,
    deleteService

} = require("../controllers/adminController");


// ===============================
// ADMIN DASHBOARD
// ===============================

router.get(
    "/dashboard",
    getDashboardStats
);


// ===============================
// USERS
// ===============================

router.get(
    "/users",
    getAllUsers
);

router.delete(
    "/users/:id",
    deleteUser
);


// ===============================
// PROVIDERS
// ===============================

router.get(
    "/providers",
    getAllProviders
);


// ===============================
// BOOKINGS
// ===============================

router.get(
    "/bookings",
    getAllBookings
);

router.put(
    "/bookings/:id",
    updateBookingStatus
);

router.delete(
    "/bookings/:id",
    deleteBooking
);


// ===============================
// SERVICES
// ===============================

router.get(
    "/services",
    getAllServices
);

router.post(
    "/services",
    addService
);

router.put(
    "/services/:id",
    updateService
);

router.delete(
    "/services/:id",
    deleteService
);


module.exports = router;