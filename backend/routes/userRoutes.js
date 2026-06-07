const express =
require("express");

const router =
express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    changePassword
} = require("../controllers/userController");

router.put(
    "/password",
    verifyToken,
    changePassword
);

module.exports = router;