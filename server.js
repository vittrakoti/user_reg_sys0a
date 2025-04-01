const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

const routes = require('./routes/auth.routes');



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//ejs template engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//static files
app.use(express.static('public'));

//session
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true ,
    cookie: { secure: false }
}));



//routes
app.use('/', routes);

app.listen(port, ()=>{console.log(`Listening on port http://localhost:${port}`);})