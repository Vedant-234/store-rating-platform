const connection = require("../config/db");

// Create Store
const createStore = (storeData, callback) => {
    const {
        name,
        email,
        address,
        owner_id
    } = storeData;

    const query = `
        INSERT INTO stores
        (
            name,
            email,
            address,
            owner_id
        )
        VALUES
        (?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            name,
            email,
            address,
            owner_id
        ],
        callback
    );
};

// Find Store By Email
const findStoreByEmail = (email, callback) => {

    const query = `
        SELECT *
        FROM stores
        WHERE email = ?
        AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [email],
        callback
    );
};

// Get Stores with Search, Sorting & Pagination
const getStores = (options, callback) => {

    const {
        page,
        limit,
        search,
        sortBy,
        order
    } = options;

    const offset =
        (page - 1) * limit;

    let query = `
        SELECT

        s.store_id,
        s.name,
        s.email,
        s.address,

        u.name AS owner_name,

        ROUND(
            COALESCE(
                AVG(r.rating),
                0
            ),
            2
        ) AS average_rating

        FROM stores s

        LEFT JOIN users u
        ON s.owner_id = u.user_id

        LEFT JOIN ratings r
        ON s.store_id = r.store_id

        WHERE s.deleted_at IS NULL
    `;

    const values = [];

    // Search
    if (search) {

        query += `
            AND (
                s.name LIKE ?
                OR s.email LIKE ?
                OR s.address LIKE ?
            )
        `;

        values.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );
    }

    // Group By
    query += `
        GROUP BY
        s.store_id
    `;

    // Allowed Sort Columns
    const allowedColumns = [
        "name",
        "email",
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

    // Sorting + Pagination
    query += `
        ORDER BY
        s.${safeSortBy}
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

// Get Stores For User
const getStoresForUser = (userId, options, callback) => {

    const {
        page,
        limit,
        search,
        sortBy,
        order
    } = options;

    const offset =
        (page - 1) * limit;

    let query = `
        SELECT

        s.store_id,
        s.name,
        s.address,

        ROUND(
            COALESCE(
                AVG(r.rating),
                0
            ),
            2
        ) AS average_rating,

        (
            SELECT rating
            FROM ratings ur
            WHERE ur.store_id = s.store_id
            AND ur.user_id = ?
            AND ur.deleted_at IS NULL
            LIMIT 1
        ) AS my_rating

        FROM stores s

        LEFT JOIN ratings r
        ON s.store_id = r.store_id
        AND r.deleted_at IS NULL

        WHERE s.deleted_at IS NULL
    `;

    const values = [userId];

    // Search
    if (search) {

        query += `
            AND (
                s.name LIKE ?
                OR s.address LIKE ?
            )
        `;

        values.push(
            `%${search}%`,
            `%${search}%`
        );

    }

    // Group By
    query += `
        GROUP BY
        s.store_id
    `;

    // Allowed Sorting Columns
    const allowedColumns = [
        "name",
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

    // Pagination
    query += `
        ORDER BY
        s.${safeSortBy}
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

const findStoreById = (
    storeId,
    callback
)=>{

    const query = `
    SELECT *
    FROM stores
    WHERE store_id = ?
    AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [storeId],
        callback
    );

};

const getOwnerDashboard = (
    ownerId,
    callback
)=>{

    const query = `
    SELECT

    s.store_id,
    s.name AS store_name,

    ROUND(
        COALESCE(
            AVG(r.rating),
            0
        ),
        2
    ) AS average_rating,

    COUNT(r.rating_id)
    AS total_ratings

    FROM stores s

    LEFT JOIN ratings r
    ON s.store_id = r.store_id
    AND r.deleted_at IS NULL

    WHERE s.owner_id = ?
    AND s.deleted_at IS NULL

    GROUP BY s.store_id
    `;

    connection.query(
        query,
        [ownerId],
        callback
    );

};

const getOwnerRatings = (ownerId,callback)=>{

    const query = `
    SELECT

    u.user_id,
    u.name AS user_name,
    u.email AS user_email,

    r.rating,
    r.created_at AS rated_at

    FROM stores s

    INNER JOIN ratings r
    ON s.store_id = r.store_id

    INNER JOIN users u
    ON r.user_id = u.user_id

    WHERE s.owner_id = ?
    AND s.deleted_at IS NULL
    AND r.deleted_at IS NULL
    AND u.deleted_at IS NULL

    ORDER BY r.created_at DESC
    `;

    connection.query(
        query,
        [ownerId],
        callback
    );

};

module.exports = {
    createStore,
    findStoreById,
    findStoreByEmail,
    getStores,
    getStoresForUser,
    getOwnerDashboard,
    getOwnerRatings
};