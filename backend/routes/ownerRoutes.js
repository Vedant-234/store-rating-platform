const express =
require("express");

const router =
express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    isOwner
} = require("../middleware/roleMiddleware");

const {
    dashboard,
    ratingsList
} = require("../controllers/ownerController");

router.get(
    "/dashboard",
    verifyToken,
    isOwner,
    dashboard
);

router.get(
    "/ratings",
    verifyToken,
    isOwner,
    ratingsList
);

module.exports = router;