const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth.middleware");
const authMiddleware = require("../middleware/auth.middleware"); 
const adminController = require("../controllers/admin.controller");

router.get("/", isAdmin, (req, res) =>{
    res.render("admin", {users: []});
});

//get all users
router.get("/users", adminController.getAllUsers_admin);

//Update user
router.put("users/:id", adminController.updateUser);

//Delete user
router.delete("users/:id", adminController.deleteUser)

// Protect the admin route (only accessible to admins)
router.get("/dashboard", authMiddleware.verifyAdmin, adminController.adminDashboard);

module.exports = router;