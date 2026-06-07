const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    isAdmin
} = require("../middleware/roleMiddleware");

const {
    getDashboardStats,
    getAllUsers,
    getUserById
} = require("../controllers/adminController");

const {
    addStore,
    getAllStores,
} = require(
    "../controllers/storeController"
);

router.get(
    "/dashboard",
    verifyToken,
    isAdmin,
    getDashboardStats
);

router.get(
    "/users",
    verifyToken,
    isAdmin,
    getAllUsers
);

router.post(
    "/stores",
    verifyToken,
    isAdmin,
    addStore
);

router.get(
    "/stores",
    verifyToken,
    isAdmin,
    getAllStores
);

router.get(
    "/users/:id",
    verifyToken,
    isAdmin,
    getUserById
);

router.post(
    "/users",
    verifyToken,
    isAdmin,
    createUserByAdmin
);

module.exports = router;