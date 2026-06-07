const connection = require("../config/db");

const createRating = (ratingData, callback)=>{

    const query = `
    INSERT INTO ratings
    (
        user_id,
        store_id,
        rating
    )
    VALUES
    (?, ?, ?)
    `;

    connection.query(
        query,
        [
            ratingData.user_id,
            ratingData.store_id,
            ratingData.rating
        ],
        callback
    );

};

const findRating = (userId, storeId, callback)=>{

    const query = `
    SELECT *
    FROM ratings
    WHERE user_id = ?
    AND store_id = ?
    AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [
            userId,
            storeId
        ],
        callback
    );

};

const updateRating = (userId,storeId,rating,callback)=>{

    const query = `
    UPDATE ratings
    SET
        rating = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
    AND store_id = ?
    AND deleted_at IS NULL
    `;

    connection.query(
        query,
        [
            rating,
            userId,
            storeId
        ],
        callback
    );

};

module.exports = {
    createRating,
    findRating,
    updateRating
};