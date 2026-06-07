const {
    getOwnerDashboard,
    getOwnerRatings
} = require("../models/storeModel");

const dashboard = (req, res)=>{

    const ownerId =
    req.user.userId;

    getOwnerDashboard(
        ownerId,
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }

            return res.status(200).json({
                success:true,
                data:result[0] || {}
            });

        }
    );

};

const ratingsList = (
    req,
    res
)=>{

    const ownerId =
    req.user.userId;

    getOwnerRatings(
        ownerId,
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }

            return res.status(200).json({
                success:true,
                count:result.length,
                data:result
            });

        }
    );

};

module.exports = {
    dashboard,
    ratingsList
};