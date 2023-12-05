import pg from "pg";

const pool = new pg.Pool({
  user: "fycnakwm",
  password: "lBFrfgrBCos2J0Es8lABldD3_PFt6OMv",
  host: "cornelius.db.elephantsql.com",
  database: "fycnakwm",
});

export default pool;
