import pg from "pg";

const pool = new pg.Pool({
  user: "wcjtnoro",
  password: "z8K3e-ylyfcjeJTt1nZG4K6Q-7pjXC0R",
  host: "cornelius.db.elephantsql.com",
  database: "wcjtnoro",
});

export default pool;
