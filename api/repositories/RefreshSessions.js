import pool from "../db.js";

class RefreshSessionsRepository {
  static async getRefreshSessions(refreshToken) {
    const response = await pool.query(
      "SELECT * FROM refresh_session WHERE refresh_token=$1", // snake case
      [refreshToken]
    );

    return response.rows;
  }

  static async createRefreshSession({ id, refreshToken, fingerprint }) {
    await pool.query(
      "INSERT INTO refresh_session (user_id, refresh_token, finger_print) VALUES ($1, $2, $3) RETURNING *",
      [id, refreshToken, fingerprint.hash]
    );
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query("DELETE FROM refresh_session WHERE refresh_token=$1", [
      refreshToken,
    ]);
  }
}

export default RefreshSessionsRepository;
