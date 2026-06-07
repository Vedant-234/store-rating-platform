const {
    getDashboardData,
    getUsers,
} = require("../models/adminModel");

const {
    getUserDetails,
    getOwners
} = require("../models/userModel");



const getDashboardStats = (req,res)=>{

    getDashboardData(
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }

            res.status(200).json({
                success:true,
                data:result[0]
            });

        }
    );

};

const getAllUsers = (req,res)=>{

    const {
        page = 1,
        limit = 10,
        search = "",
        role = "",
        sortBy = "created_at",
        order = "DESC"
    } = req.query;

    getUsers(
        {
            page,
            limit,
            search,
            role,
            sortBy,
            order
        },
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }

            res.status(200).json({
                success:true,
                data:result
            });

        }
    );

};

// Get User By ID
const getUserById = (req, res) => {

    // Get User ID
    const {
        id
    } = req.params;

    // Call Model
    getUserDetails(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            const user =
                result[0];

            // Show Rating Only For Store Owners
            if (
                user.role !== "OWNER"
            ) {

                delete user.average_rating;

            }

            return res.status(200).json({
                success: true,
                data: user
            });

        }
    );

};

const getAllOwners = (
    req,
    res
) => {

    getOwners(
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
    getDashboardStats,
    getAllUsers,
    getUserById,
    getAllOwners
};