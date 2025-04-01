const connectDB = require('../config/db');

const User = {
    //Inserts a new user into the database.
    createUser: (user, callback) => {
        const db = connectDB();
        const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(query, [user.name, user.email, user.password, "user"], callback);
    },
    //Retrieves a user by their email.
    getUserByEmail: (email, callback) => {
        const db = connectDB();
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], callback);
    },
    //Retrieves a user by their ID.
    getUserById: (id, callback) => {
        const db = connectDB();
        const query = "SELECT * FROM users WHERE id = ?";
        db.query(query, [id], callback);
    }
};

module.exports = User;