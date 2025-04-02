const express = require('express');
const router = express.Router();
const authController = require('../controllers/users.controller');
//const authMiddleware = require('../middleware/auth.middleware');

// Register route
router.get("/", (req, res) =>{res.render("index");});
router.get("/register", (req, res) =>{res.render("index");});
router.post("/register", authController.register);

// Login route  
router.get("/login", (req, res) =>{res.render("index");});
router.post("/login", authController.login);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
