const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");


// ==========================================
// GET ALL PROVIDERS
// ==========================================

const getProviders = async (req, res) => {

    try {

        const providers = await User.find({
            role: "provider"
        }).select("-password");

        res.status(200).json(providers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ==========================================
// GET PROVIDERS BY SERVICE
// ==========================================

const getProvidersByService = async (req, res) => {

    try {

        const service = decodeURIComponent(
            req.params.service
        ).trim();

        // Case-insensitive service search
        const providers = await User.find({

            role: "provider",

            service: {
                $regex: `^${service}$`,
                $options: "i"
            }

        }).select("-password");

        res.status(200).json(providers);

    } catch (error) {

        console.log("Service Provider Error:", error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// GET PROVIDER BY ID
// ==========================================

const getProviderById = async (req, res) => {

    try {

        const provider = await User.findOne({

            _id: req.params.id,

            role: "provider"

        }).select("-password");

        if (!provider) {

            return res.status(404).json({

                message: "Provider not found"

            });

        }

        res.status(200).json(provider);

    } catch (error) {

        console.log("Provider ID Error:", error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// PROVIDER DASHBOARD ANALYTICS
// ==========================================

const getDashboardAnalytics = async (req, res) => {

    try {

        const providerId = req.params.providerId;


        const totalBookings =
            await Booking.countDocuments({
                providerId
            });


        const pendingBookings =
            await Booking.countDocuments({
                providerId,
                status: "Pending"
            });


        const acceptedBookings =
            await Booking.countDocuments({
                providerId,
                status: "Accepted"
            });


        const completedBookings =
            await Booking.countDocuments({
                providerId,
                status: "Completed"
            });


        const cancelledBookings =
            await Booking.countDocuments({
                providerId,
                status: "Cancelled"
            });


        // ==========================================
        // REVIEWS
        // ==========================================

        const reviews = await Review.find({
            providerId
        });


        let averageRating = 0;


        if (reviews.length > 0) {

            const totalRating = reviews.reduce(

                (sum, review) =>
                    sum + Number(review.rating || 0),

                0

            );

            averageRating = (

                totalRating / reviews.length

            ).toFixed(1);

        }


        // ==========================================
        // PROVIDER
        // ==========================================

        const provider =
            await User.findById(providerId);


        const totalEarnings =

            completedBookings *
            (provider?.price || 0);


        // ==========================================
        // LATEST REVIEWS
        // ==========================================

        const latestReviews =
            await Review.find({

                providerId

            })

            .populate(
                "customerId",
                "name"
            )

            .sort({
                createdAt: -1
            })

            .limit(5);


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            totalBookings,

            pendingBookings,

            acceptedBookings,

            completedBookings,

            cancelledBookings,

            averageRating,

            totalEarnings,

            latestReviews

        });


    } catch (error) {

        console.log(
            "Dashboard Analytics Error:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getProviders,

    getProvidersByService,

    getProviderById,

    getDashboardAnalytics

};