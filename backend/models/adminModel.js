const connection = require("../config/db");

const getDashboardData = (callback) => {

    const query = `
        SELECT

        (SELECT COUNT(*)
         FROM users
         WHERE deleted_at IS NULL)
         AS totalUsers,

        (SELECT COUNT(*)
         FROM stores
         WHERE deleted_at IS NULL)
         AS totalStores,

        (SELECT COUNT(*)
         FROM ratings
         WHERE deleted_at IS NULL)
         AS totalRatings
    `;

    connection.query(
        query,
        callback
    );
};

const getUsers = (options,callback)=>{

    const {
        page,
        limit,
        search,
        role,
        sortBy,
        order
    } = options;

    const offset = (page - 1) * limit;

    let query = `
    SELECT
    user_id,
    name,
    email,
    address,
    role,
    created_at
    FROM users
    WHERE deleted_at IS NULL
    `;

    const values = [];

    if(search){

        query += `
        AND (
            name LIKE ?
            OR email LIKE ?
            OR address LIKE ?
        )
        `;

        values.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );
    }

    if(role){

        query += `
        AND role = ?
        `;

        values.push(role);
    }

    const allowedColumns = [
        "name",
        "email",
        "role",
        "created_at"
    ];

    const safeSortBy =
    allowedColumns.includes(sortBy)
    ? sortBy
    : "created_at";

    const safeOrder =
    order === "ASC"
    ? "ASC"
    : "DESC";

    query += `
    ORDER BY
    ${safeSortBy}
    ${safeOrder}
    LIMIT ?
    OFFSET ?
    `;

    values.push(
        Number(limit),
        Number(offset)
    );

    connection.query(
        query,
        values,
        callback
    );

};

module.exports = {
    getDashboardData,
    getUsers
};