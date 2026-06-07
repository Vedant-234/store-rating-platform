const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    isUser
} = require("../middleware/roleMiddleware");

const {
    getStoresForNormalUser
} = require("../controllers/storeController");

router.get(
    "/",
    verifyToken,
    isUser,
    getStoresForNormalUser
);

module.exports = router;