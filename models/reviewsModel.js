const db = require('./conn');

class ReviewsList {
    constructor(id, user_id, review_text, date, object_id) {
        this.id = id;
        this.user_id = user_id;
        this.review_text = review_text;
        this.date = date;
        this.object_id = object_id;
    }

    static async showAllReviewsProfile(user_id) {
        try {
            const response = await db.any(
                `SELECT * FROM reviews WHERE user_id = $1;`,
                [user_id]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error.message);
            return error.message;
        }
    }
    static async showAllReviewsObject(object_id) {
        try {
            const response = await db.any(
                `SELECT * FROM reviews WHERE object_id = $1;`,
                [object_id]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error.message);
            return error.message;
        }
    }
    static async addReview(user_id, username, review_text, date, object_id) {
        try {
            const response = await db.result(
                `INSERT INTO reviews (user_id, review_text, date, object_id) VALUES ($1, $2, $3, $4);`,
                [user_id, username, review_text, date, object_id]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error.message);
            return error.message;
        }
    }
    static async removeReview(id) {
        try {
            const response = await db.result(
                `DELETE FROM reviews (id) VALUES ($1);`,
                [id]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error.message);
            return error.message;
        }
    }
}

module.exports = ReviewsList;
