// controllers/userController.js

const bcrypt = require("bcryptjs");

const {
    findUserById,
    updatePassword
} = require("../models/userModel");

// Change Password Controller
const changePassword = (
    req,
    res
) => {

    // Current Logged In User
    const userId =
        req.user.userId;

    // Request Body
    const {
        currentPassword,
        newPassword
    } = req.body;

    // Validation
    if (
        !currentPassword ||
        !newPassword
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Current and New Password required"
        });

    }

    // Password Policy
    // 8-16 chars, 1 uppercase, 1 special character
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (
        !passwordRegex.test(newPassword)
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Password must be 8-16 chars with uppercase and special character"
        });

    }

    // Find User
    findUserById(
        userId,
        async (
            err,
            users
        ) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            // Check User Exists
            if (
                users.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            const user =
                users[0];

            try {

                // Verify Current Password
                const isMatch =
                    await bcrypt.compare(
                        currentPassword,
                        user.password
                    );

                if (!isMatch) {

                    return res.status(400).json({
                        success: false,
                        message:
                            "Current password incorrect"
                    });

                }

                // Hash New Password
                const hashedPassword =
                    await bcrypt.hash(
                        newPassword,
                        10
                    );

                // Update Password
                updatePassword(
                    userId,
                    hashedPassword,
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
                                "Password updated successfully"
                        });

                    }
                );

            } catch (error) {

                return res.status(500).json({
                    success: false,
                    message: error.message
                });

            }

        }
    );

};

module.exports = {
    changePassword
};