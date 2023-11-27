import pool from "../db.js";

class RefreshSessionsRepository {
  static async getRefreshSessions(refreshToken) {}

  static async createRefreshSession({ id, refreshToken, fingerprint }) {}

  static async deleteRefreshSession(refreshToken) {}
}

export default RefreshSessionsRepository;
