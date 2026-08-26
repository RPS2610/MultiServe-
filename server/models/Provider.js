const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    service: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        default: 0
    },

    city: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    about: {
        type: String,
        default: ""
    },

    profileImage: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Provider", providerSchema);
