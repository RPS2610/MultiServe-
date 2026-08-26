const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multer");

const {

    uploadProfileImage

} = require("../controllers/userController");

router.put(

    "/upload",

    authMiddleware,

    upload.single("image"),

    uploadProfileImage

);

module.exports = router;