const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/authController.js'); // <-- import the controller from the controller file

// Import all the controllers
router.route('/register').post(registerUser);

module.exports = router; // <-- export the router to be used in the server.js file