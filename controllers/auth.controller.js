const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user.models');

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
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, user) => {
        if(err || result.length === 0){
            res.send("Invvalid credentials");

            const user = result[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                req.session.user = user;
                res.redirect('/dashboard');                    
            }
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};