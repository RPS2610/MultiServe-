const express = require("express");

const router = express.Router();

const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require("../controllers/notificationController");

// IMPORTANT: specific route FIRST
router.put("/read-all/:userId", markAllAsRead);

router.get("/:userId", getNotifications);

router.post("/", createNotification);

router.put("/:id", markAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;