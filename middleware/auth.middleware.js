
const jwt = require("jsonwebtoken")
exports.isAuthenticated = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
};

exports.isAdmin = (req, res, next) =>{
    if(!req.session.user || req.session.user.role !== "admin"){
        return res.status(403).send("Access denied");
    }
    next();
};
exports.verifyAdmin = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err) return res.status(401).json({ message: "Invalid token" });

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        req.user = user;
        next();
    })
}