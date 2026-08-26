const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

// ================= CREATE BOOKING =================
const createBooking = async (req, res) => {
    try {
        const {
            customerId,
            customerName,
            customerPhone,
            customerAddress,
            providerId,
            service
        } = req.body;

        if (
            !customerId ||
            !customerName ||
            !customerPhone ||
            !customerAddress ||
            !providerId ||
            !service
        ) {
            return res.status(400).json({
                success: false,
                message: "All booking details are required"
            });
        }

        const booking = await Booking.create({
            customerId,
            customerName,
            customerPhone,
            customerAddress,
            providerId,
            service,
            status: "Pending"
        });

        await Notification.create({
            userId: providerId,
            title: "New Booking",
            message: `${customerName} booked your ${service} service.`
        });

        res.status(201).json({
            success: true,
            message: "Booking Created Successfully",
            booking
        });

    } catch (error) {
        console.error("Create Booking Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= ALL BOOKINGS =================
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("customerId", "name phone")
            .populate(
                "providerId",
                "name service city phone profileImage price"
            )
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        console.error("Get All Bookings Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// ================= PROVIDER BOOKINGS =================
const getProviderBookings = async (req, res) => {
    try {
        const { providerId } = req.params;

        const bookings = await Booking.find({
            providerId
        })
            .populate("customerId", "name phone")
            .populate(
                "providerId",
                "name service city phone profileImage price"
            )
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        console.error("Get Provider Bookings Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// ================= CUSTOMER BOOKINGS =================
const getCustomerBookings = async (req, res) => {
    try {
        const { customerId } = req.params;

        const bookings = await Booking.find({
            customerId
        })
            .populate(
                "providerId",
                "name service city phone profileImage price"
            )
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        console.error("Get Customer Bookings Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// ================= UPDATE BOOKING STATUS =================
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Accepted",
            "Rejected",
            "Completed",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid booking status"
            });
        }

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = status;

        await booking.save();

        let title = "";
        let message = "";

        if (status === "Accepted") {
            title = "Booking Accepted";
            message =
                `Your ${booking.service} booking has been accepted.`;
        }

        if (status === "Rejected") {
            title = "Booking Rejected";
            message =
                `Your ${booking.service} booking has been rejected.`;
        }

        if (status === "Completed") {
            title = "Service Completed";
            message =
                `Your ${booking.service} service has been completed.`;
        }

        if (status === "Cancelled") {
            title = "Booking Cancelled";
            message =
                `Your ${booking.service} booking has been cancelled.`;
        }

        if (title) {
            await Notification.create({
                userId: booking.customerId,
                title,
                message
            });
        }

        res.json({
            success: true,
            message: "Booking Updated Successfully",
            booking
        });

    } catch (error) {
        console.error("Update Booking Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// ================= CANCEL BOOKING =================
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                message: "Only Pending bookings can be cancelled"
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        await Notification.create({
            userId: booking.providerId,
            title: "Booking Cancelled",
            message:
                `${booking.customerName} cancelled the ${booking.service} booking.`
        });

        res.json({
            success: true,
            message: "Booking Cancelled Successfully",
            booking
        });

    } catch (error) {
        console.error("Cancel Booking Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createBooking,
    getAllBookings,
    getProviderBookings,
    getCustomerBookings,
    updateBookingStatus,
    cancelBooking
};