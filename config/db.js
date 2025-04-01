const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME  
});
// Test the connection
db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
  } else {
    console.log('DB connected successfully');
  }
});

module.exports = db;  // Export the connection directly
