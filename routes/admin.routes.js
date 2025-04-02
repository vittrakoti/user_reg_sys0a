const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware"); 
const adminController = require("../controllers/admin.controller");


// Admin main page (Optional: If you want this page to be admin-only, add authMiddleware.verifyAdmin)
router.get("/", authMiddleware.verifyAdmin, (req, res) => {
    res.render("admin", { users: [] });
});

// Get all users
router.get("/users", authMiddleware.verifyAdmin, adminController.getAllUsers_admin);

// Update user
router.put("/users/:id", authMiddleware.verifyAdmin, adminController.updateUser);

// Delete user
router.delete("/users/:id", authMiddleware.verifyAdmin, adminController.deleteUser);

// Protect the admin dashboard route (only accessible to admins)
router.get("/dashboard", authMiddleware.verifyAdmin, adminController.adminDashboard);


module.exports = router;