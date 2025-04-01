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