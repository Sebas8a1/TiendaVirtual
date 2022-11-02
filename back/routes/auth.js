const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController.js'); // <-- import the controller from the controller file

// router.post('/register', registerUser); // <-- register a new user
router.route('/register').post(registerUser);

// router.post('/login', loginUser); // <-- login a user
router.route('/login').get(loginUser);



module.exports = router; // <-- export the router to be used in the server.js file