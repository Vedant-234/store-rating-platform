const {
    createRating,
    findRating,
    updateRating
} = require("../models/ratingModel");

const {
    findStoreById
} = require("../models/storeModel");

// Submit Rating
const submitRating = (req, res) => {

    // Current Logged In User
    const userId = 
    req.user.userId;

    // Request Body
    const {
        store_id,
        rating
    } = req.body;

    // Validation
    if (
        !store_id ||
        !rating
    ) {

        return res.status(400).json({
            success: false,
            message: "Store and Rating required"
        });

    }

    // Rating Range Validation
    if (
        rating < 1 ||
        rating > 5
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Rating must be between 1 and 5"
        });

    }

    // Verify Store Exists
    findStoreById(
        store_id,
        (err, stores) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (stores.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Store not found"
                });

            }

            // Check Existing Rating
            findRating(
                userId,
                store_id,
                (err, ratings) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    if (
                        ratings.length > 0
                    ) {

                        return res.status(400).json({
                            success: false,
                            message:
                                "You already rated this store"
                        });

                    }

                    // Insert Rating
                    createRating(
                        {
                            user_id: userId,
                            store_id,
                            rating
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
                                message:
                                    "Rating submitted successfully"
                            });

                        }
                    );

                }
            );

        }
    );

};

// Update Rating
const modifyRating = (req, res) => {

    // Current User
    const userId = req.user.userId;

    // Store ID
    const {
        storeId
    } = req.params;

    // New Rating
    const {
        rating
    } = req.body;

    // Validation
    if (!rating) {

        return res.status(400).json({
            success: false,
            message: "Rating required"
        });

    }

    // Rating Range Validation
    if (
        rating < 1 ||
        rating > 5
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Rating must be between 1 and 5"
        });

    }

    // Verify Store Exists
    findStoreById(
        storeId,
        (err, stores) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (stores.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Store not found"
                });

            }

            // Check Existing Rating
            findRating(
                userId,
                storeId,
                (err, ratings) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    if (ratings.length === 0) {

                        return res.status(404).json({
                            success: false,
                            message:
                                "Rating not found"
                        });

                    }

                    // Update Rating
                    updateRating(
                        userId,
                        storeId,
                        rating,
                        (err, result) => {

                            if (err) {

                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });

                            }

                            return res.status(200).json({
                                success: true,
                                message:
                                    "Rating updated successfully"
                            });

                        }
                    );

                }
            );

        }
    );

};

module.exports = {
    submitRating,
    modifyRating
};