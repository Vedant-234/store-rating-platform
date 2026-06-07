const {
    createStore,
    findStoreByEmail,
    findStoreByOwnerId,
    getStores,
    getStoresForUser
} = require("../models/storeModel");

const {
    findUserById
} = require("../models/userModel");

// Add Store
const addStore = (req, res) => {

    const {
        name,
        email,
        address,
        owner_id
    } = req.body;

    if (!name || !email || !address || !owner_id) {
        return res.status(400).json({
            success: false,
            message: "All fields required"
        });
    }

    findStoreByEmail(email, (err, stores) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (stores.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Store already exists"
            });
        }

        findUserById(owner_id, (err, users) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Owner not found"
                });
            }

            const owner = users[0];

            if (owner.role !== "OWNER") {
                return res.status(400).json({
                    success: false,
                    message: "Selected user is not a store owner"
                });
            }

            findStoreByOwnerId(
                owner_id,
                (err, existingStores) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    if (existingStores.length > 0) {
                        return res.status(400).json({
                            success: false,
                            message: "Owner already has a store"
                        });
                    }

                    createStore(
                        {
                            name,
                            email,
                            address,
                            owner_id
                        },
                        (err, result) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            return res.status(201).json({
                                success: true,
                                message: "Store created successfully"
                            });
                        }
                    );
                }
            );
        });
    });
};

// Get All Stores
const getAllStores = (req, res) => {

    const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "created_at",
        order = "DESC"
    } = req.query;

    getStores(
        {
            page,
            limit,
            search,
            sortBy,
            order
        },
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                data: result
            });
        }
    );
};

// Normal User - Get Stores
const getStoresForNormalUser = (req, res) => {

    const userId = req.user.userId;

    const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "created_at",
        order = "DESC"
    } = req.query;

    getStoresForUser(
        userId,
        {
            page,
            limit,
            search,
            sortBy,
            order
        },
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                data: result
            });
        }
    );
};

module.exports = {
    addStore,
    getAllStores,
    getStoresForNormalUser
};