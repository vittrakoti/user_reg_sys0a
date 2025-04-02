const db = require('../config/db');

const User = {
    //Inserts a new user into the database.
    createUser: (user, callback) => {
        const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(query, [user.name, user.email, user.password, "user"], callback);
    },
    //Retrieves a user by their email.
    getUserByEmail: (email, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], callback);
    },
    //Retrieves a user by their ID.
    getUserById: (id, callback) => {
        const query = "SELECT * FROM users WHERE id = ?";
        db.query(query, [id], callback);
    },
    //for admin's controll
    getAllUsers:(callback)  =>{
        db.query("SELECT id, name, email, role FROM users", (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },
    // Update user details
    updateUser: (id, name, email, role, callback) => {
        db.query("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?", 
            [name, email, role, id], 
            (err, result) => {
                if (err) return callback(err, null);
                callback(null, result);
            }
        );
    },
     // Delete user
     deleteUser: (id, callback) => {
        db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
    
};

module.exports = User;

