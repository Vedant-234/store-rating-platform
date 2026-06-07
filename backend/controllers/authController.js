const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByEmail
} = require("../models/userModel");

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !address ||
            !role
        ){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const passwordRegex =
        /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

        if (
            !passwordRegex.test(password)
        ) {

            return res.status(400).json({
                success: false,
                message:
                "Password must be 8-16 characters and contain at least one uppercase letter and one special character"
            });

        }

        findUserByEmail(
            email,
            async (err, rows) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (rows.length > 0) {

                    return res.status(400).json({
                        success: false,
                        message: "Email already exists"
                    });

                }

                // Hash Password

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const userData = {
                    name,
                    email,
                    password: hashedPassword,
                    address,
                    role
                };

                // Create User

                createUser(
                    userData,
                    (err, result) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });

                        }

                        res.status(201).json({
                            success: true,
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const loginUser = (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and Password required"
        });

    }

    findUserByEmail(
        email,
        async (err, rows) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            const user = rows[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });

            }

            const token = jwt.sign(
                {
                    userId: user.user_id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.status(200).json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );
};

module.exports = {
    registerUser,
    loginUser
};