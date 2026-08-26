const express = require("express");
const router = express.Router();

const {
    addReview,
    getProviderReviews
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addReview);

router.get("/:providerId", getProviderReviews);

module.exports = router;