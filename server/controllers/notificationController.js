const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.find({
            userId
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createNotification = async (req, res) => {
    try {
        const { userId, title, message } = req.body;

        const notification = await Notification.create({
            userId,
            title,
            message
        });

        res.status(201).json({
            message: "Notification Created Successfully",
            notification
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const markAsRead = async (req, res) => {
    try {

        await Notification.findByIdAndUpdate(
            req.params.id,
            {
                isRead: true
            }
        );

        res.json({
            message: "Notification Updated"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// NEW
const markAllAsRead = async (req, res) => {

    try {

        await Notification.updateMany(
            {
                userId: req.params.userId,
                isRead: false
            },
            {
                $set: {
                    isRead: true
                }
            }
        );

        res.json({
            message: "All Notifications Read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteNotification = async (req, res) => {

    try {

        await Notification.findByIdAndDelete(req.params.id);

        res.json({
            message: "Notification Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification

};