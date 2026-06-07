const isAdmin = (req, res, next) => {

    if (
        req.user.role !== "ADMIN"
    ) {

        return res.status(403).json({
            success: false,
            message: "Admin Access Only"
        });

    }

    next();

};

const isUser = (req, res, next) => {

    if (
        req.user.role !== "USER"
    ) {

        return res.status(403).json({
            success: false,
            message: "User Access Only"
        });

    }

    next();

};

const isOwner = (req, res, next) => {

    if (
        req.user.role !== "OWNER"
    ) {

        return res.status(403).json({
            success: false,
            message: "Store Owner Access Only"
        });

    }

    next();

};

module.exports = {
    isAdmin,
    isUser,
    isOwner
};