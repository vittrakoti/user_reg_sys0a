const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth.middleware");

router.get("/", isAdmin, (req, res) =>{
    res.render("admin", {users: []});
});

module.exports = router;