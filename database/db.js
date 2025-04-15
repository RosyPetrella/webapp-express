const mysql = require("mysql2");

const credentials = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

credentials.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = credentials;
