const express = require("express");

const router = express.Router();

const {
    register,
    loginUser,
    updateProfile
} = require("../controllers/authController");

// =====================================================
// REGISTER
// =====================================================

router.post("/register", register);

// =====================================================
// LOGIN - EMAIL + PASSWORD
// =====================================================

router.post("/login", loginUser);

// =====================================================
// UPDATE PROFILE
// =====================================================

router.put("/profile/:id", updateProfile);

module.exports = router;