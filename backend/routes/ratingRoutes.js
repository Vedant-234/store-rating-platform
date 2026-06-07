const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    isUser
} = require("../middleware/roleMiddleware");

const {
    submitRating,
    modifyRating
} = require("../controllers/ratingController");

router.post(
    "/",
    verifyToken,
    isUser,
    submitRating
);

router.put(
    "/:storeId",
    verifyToken,
    isUser,
    modifyRating
);

module.exports = router;