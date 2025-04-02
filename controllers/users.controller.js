const bcrypt = require('bcryptjs');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');


exports.login = (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Email and password are required" });
    }
    User.getUserByEmail(email, (err, results) =>{
        if (err) return res.status(500).json({ message: "Database error", error: err });
    });
}



exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       User.createUser({name, email, password: hashedPassword},(err) => {
        if (err) {
            res.status(500).send("Error in user registration");
           } else {
            res.redirect('/');
           }
       });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//login
/*
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.getUserByEmail(email, async (err, user) => {
        console.log("auth controller:", err, user);
        
        // 1. Check for errors or missing user
        if(err ||!user || user.length === 0){
            return res.status(401).send("Invalid email or password");
        }

        // 2. Compare passwords
        try{
            const dbUser = user[0];
            const isPasswordMatch = await bcrypt.compare(password, dbUser.password);

            // 3. Save user to session and respond
            if (isPasswordMatch) {
                req.session.user = dbUser;
                return res.redirect('/dashboard');                    
            }else{
                return res.status(401).send("Invalid password");
            }
        }catch(bcryptErr){
            console.error("Bcrypt error:", bcryptErr);
            return res.status(500).send("Server error")
        }
            

           
       
    });
};
*/
exports.login = (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Email and password are required" });
    }
    User.getUserByEmail(email, (err, results) =>{
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if (err) return res.status(500).json({ message: "Error comparing passwords", error: err });
        });
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //Generate JWT Token
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        //Redirect based on role
        if(user.role === "admin"){
            return res.status(200).json({
                message: "Login successfull",
                token,
                redirectTo: "/admin/dashboard"
            });
        }else{
            return res.status(200).json({
                message: "Login successfull",
                token,
                redirectTo: "/dashboard"
            })
        }
    });
}




exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
