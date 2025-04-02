# user_reg_sys0a
Authentication System with Node.js, Express, MySQL, and EJS

Project Overview
This is a simple authentication system built using Node.js, Express, MySQL, Mongoose, and EJS. 
The system allows users to register, log in, log out, reset passwords, and features an admin panel to manage users.

auth-system/
│── node_modules/                # Installed dependencies

│── public/                      # Static files (CSS, JS, images)
│   ├── css/
│   │   ├── styles.css
│── views/                       # EJS templates
│   ├── partials/                # EJS Partials (Header, Footer, Navbar)
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── navbar.ejs
│   ├── index.ejs                # Login Page
│   ├── register.ejs             # Registration Page
│   ├── dashboard.ejs            # User Dashboard
│   ├── admin.ejs                # Admin Panel
│   ├── forgot-password.ejs      # Forgot Password Page
│   ├── reset-password.ejs       # Reset Password Page
│── config/
│── controllers/
│── middleware/
│── models/
│── routes/
│── .env                         # Environment Variables
│── .gitignore                   # Ignored files
│── package.json                 # Node dependencies
│── server.js                    # Entry point

1. git clone https://github.com/yourusername/auth-system.git
   cd auth-system

2. Installation & Setup
   npm install

3. Configure Environment Variables
   Create a .env file in the root directory and add the following:
    PORT=3000
    SESSION_SECRET=your_secret_key
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=auth_db

4.  Set Up MySQL Database
    CREATE DATABASE auth_db;
    USE auth_db;

    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
    );
5. Access the Application
   Open a browser and go to: http://localhost:3000/
   
Features:
- User Registration
- Login & Logout System
- Session-based Authentication
- Password Reset System
- Admin Panel for User Management (Edit & Delete Users)
- EJS Partials for Reusability

License
This project is open-source and available under the MIT License.

Developed by Sagar Pariyar
