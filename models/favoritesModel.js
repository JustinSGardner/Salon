const db = require("./conn");

class FavoritesList {
  constructor(id, user_id, object_id, title) {
    this.id = id;
    this.user_id = user_id;
    this.object_id = object_id;
    this.title = title;
  }
  static async showAllFavorites(user_id) {
    try {
      const response = await db.any(
        `
            SELECT * FROM favorites WHERE user_id = $1
            ORDER BY id DESC;`,
        [user_id]
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error.message);
      return error.message;
    }
  }
  static async showIfFavorite(user_id, object_id) {
    try {
      const response = await db.any(
        `
            SELECT * FROM favorites WHERE user_id = $1 AND object_id = $2;`,
        [user_id, object_id]
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error.message);
      return error.message;
    }
  }
  static async addFavorite(user_id, object_id, is_liked, title, date, imgURL) {
    try {
      const response = await db.result(
        `
                INSERT INTO favorites (user_id, object_id, is_liked, title, date, imgURL)
                VALUES ($1, $2, TRUE, $3, $4, $5);`,
        [user_id, object_id, is_liked, title, date, imgURL]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("ERROR: ", error.message);
      return error.message;
    }
  }
  static async removeFavorite(user_id, object_id) {
    try {
      const response = await db.result(
        `
                DELETE FROM favorites 
                WHERE user_id = $1 AND object_id = $2;`,
        [user_id, object_id]
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error.message);
      return error.message;
    }
  }
}

module.exports = FavoritesList;
