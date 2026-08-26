const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    customerPhone: {
        type: String,
        required: true
    },

    customerAddress: {
        type: String,
        required: true
    },

    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);