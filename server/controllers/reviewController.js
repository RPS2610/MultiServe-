const Review = require("../models/Review");
const Booking = require("../models/Booking");

const addReview = async (req, res) => {

    try {

        const {
            bookingId,
            providerId,
            rating,
            review
        } = req.body;

        const customerId = req.user.id;

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        if (booking.status !== "Completed") {

            return res.status(400).json({
                message: "You can review only completed bookings."
            });

        }

        const alreadyReviewed = await Review.findOne({
            bookingId
        });

        if (alreadyReviewed) {

            return res.status(400).json({
                message: "Review already submitted."
            });

        }

        const newReview = new Review({

            customerId,

            providerId,

            bookingId,

            rating,

            review

        });

        await newReview.save();

        res.status(201).json({

            message: "Review Added Successfully",

            review: newReview

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const getProviderReviews = async (req, res) => {

    try {

        const { providerId } = req.params;

        const reviews = await Review.find({

            providerId

        })

        .populate("customerId", "name")

        .sort({

            createdAt: -1

        });

        res.json(reviews);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    addReview,

    getProviderReviews

};