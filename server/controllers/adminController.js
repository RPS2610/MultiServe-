const User = require("../models/User");
const Booking = require("../models/Booking");
const Service = require("../models/Service");


// =====================================================
// ADMIN DASHBOARD STATS
// =====================================================

const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments({
            role: "customer"
        });

        const totalProviders = await User.countDocuments({
            role: "provider"
        });

        const totalBookings = await Booking.countDocuments();

        const completedBookings = await Booking.find({
            status: "Completed"
        });

        let totalRevenue = 0;

        for (const booking of completedBookings) {

            const provider = await User.findById(
                booking.providerId
            );

            if (provider) {

                totalRevenue += provider.price || 0;

            }

        }

        res.json({

            totalUsers,

            totalProviders,

            totalBookings,

            totalRevenue

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL USERS
// =====================================================

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1
            });

        res.json(users);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        await User.findByIdAndDelete(id);

        res.json({

            message: "User Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL PROVIDERS
// =====================================================

const getAllProviders = async (req, res) => {

    try {

        const providers = await User.find({

            role: "provider"

        })
        .select("-password")
        .sort({
            createdAt: -1
        });

        res.json(providers);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL BOOKINGS
// =====================================================

const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()

            .populate(
                "providerId",
                "name phone service city price"
            )

            .populate(
                "customerId",
                "name phone email"
            )

            .sort({
                createdAt: -1
            });

        res.json(bookings);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// UPDATE BOOKING STATUS
// =====================================================

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


        const booking =
            await Booking.findByIdAndUpdate(

                id,

                {
                    status: status
                },

                {
                    new: true
                }

            )

            .populate(
                "providerId",
                "name phone service city price"
            )

            .populate(
                "customerId",
                "name phone email"
            );


        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            });

        }


        res.json({

            message:
                "Booking Status Updated Successfully",

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// DELETE BOOKING
// =====================================================

const deleteBooking = async (req, res) => {

    try {

        const { id } = req.params;

        const booking =
            await Booking.findById(id);


        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            });

        }


        await Booking.findByIdAndDelete(id);


        res.json({

            message:
                "Booking Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL SERVICES
// =====================================================

const getAllServices = async (req, res) => {

    try {

        const services =
            await Service.find()
                .sort({
                    createdAt: -1
                });

        res.json(services);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// ADD SERVICE
// =====================================================

const addService = async (req, res) => {

    try {

        const service =
            new Service(req.body);


        await service.save();


        res.status(201).json({

            message:
                "Service Added Successfully",

            service

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// UPDATE SERVICE
// =====================================================

const updateService = async (req, res) => {

    try {

        const { id } = req.params;


        const service =
            await Service.findByIdAndUpdate(

                id,

                req.body,

                {
                    new: true
                }

            );


        if (!service) {

            return res.status(404).json({

                message:
                    "Service not found"

            });

        }


        res.json({

            message:
                "Service Updated Successfully",

            service

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// DELETE SERVICE
// =====================================================

const deleteService = async (req, res) => {

    try {

        const { id } = req.params;


        const service =
            await Service.findById(id);


        if (!service) {

            return res.status(404).json({

                message:
                    "Service not found"

            });

        }


        await Service.findByIdAndDelete(id);


        res.json({

            message:
                "Service Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// EXPORT ALL CONTROLLERS
// =====================================================

module.exports = {

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

};