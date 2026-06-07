const connection = require("../config/db");

const createUser = (userData, callback) => {
    const query = `
        INSERT INTO users
        (
            name,
            email,
            password,
            address,
            role
        )
        VALUES (?,?,?,?,?)
    `;

    connection.query(
        query,
        [
            userData.name,
            userData.email,
            userData.password,
            userData.address,
            userData.role
        ],
        callback
    );
};

const findUserByEmail = (email,callback) => {

    const query =
    `
    SELECT *
    FROM users
    WHERE email = ?
    AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [email],
        callback
    );
};

const findUserById = (userId, callback) => {

    const query = `
        SELECT *
        FROM users
        WHERE user_id = ?
        AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [userId],
        callback
    );
};

const getUserDetails = (userId, callback)=>{
    const query = `
    SELECT

    u.user_id,
    u.name,
    u.email,
    u.address,
    u.role,

    ROUND(
        COALESCE(
            AVG(r.rating),
            0
        ),
        2
    ) AS average_rating

    FROM users u

    LEFT JOIN stores s
    ON u.user_id = s.owner_id

    LEFT JOIN ratings r
    ON s.store_id = r.store_id
    AND r.deleted_at IS NULL

    WHERE u.user_id = ?
    AND u.deleted_at IS NULL

    GROUP BY u.user_id
    `;

    connection.query(
        query,
        [userId],
        callback
    );
};

const updatePassword = (
    userId,
    hashedPassword,
    callback
)=>{

    const query = `
    UPDATE users
    SET
        password = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
    AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [
            hashedPassword,
            userId
        ],
        callback
    );

};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    getUserDetails,
    updatePassword
};