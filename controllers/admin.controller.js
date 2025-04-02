const User = require("../models/user.models");

//Get all user
exports.getAllUsers_admin = (req, res) =>{
    User.getAllUsers((err, users)=>{
        if(err)return res.status(500).json({message: "Server error ad", error: err})
            res.status(200).json(users);
    })
}

// Update user details
exports.updateUser = (req, res) =>{
    const {id} = req.params;
    const {name, email, role} = req.body;

    if(!name || !email || !role){
        return res.status(400).json({ message: "All fields are required" });
    }
    User.updateUser(id, name, email, role, (err, result)=>{
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "User updated successfully" });
    });
}

// Delete user
exports.deleteUser = (req, res) =>{
    const {id} = req.params;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "User deleted successfully" });
    });

};
exports.adminDashboard = (req, res) => {
    res.render("adminDashboard", { title: "Admin Dashboard" });
};