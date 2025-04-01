const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//DB connection
const connectDB = async () =>{
    try{
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME    
        });
        console.log("DB connected successfully");
        return db;
    }catch(err){
        console.log("DB connection failed", + err.message); 
        throw err;
    }
}


module.exports = connectDB();