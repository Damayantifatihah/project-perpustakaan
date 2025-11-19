import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "damayanti0724",
  database: "db_perpus",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
