const express = require("express");
const router = express.Router();

const {
    addService,
    getServices,
    addDefaultServices
} = require("../controllers/serviceController");

router.post("/add", addService);
router.post("/default", addDefaultServices);
router.get("/", getServices);

module.exports = router;