const express = require("express");

const router = express.Router();

const {
    getProviders,
    getProvidersByService,
    getProviderById
} = require("../controllers/providerController");

router.get("/", getProviders);

router.get("/service/:service", getProvidersByService);

router.get("/:id", getProviderById);

module.exports = router;