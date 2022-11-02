const express = require('express');
const router = express.Router();

const { registerUser, loginUser, forgotPassword, resetPassword, logout } = require('../controllers/authController.js'); // <-- import the controller from the controller file
const { isAuthenticatedUser } = require('../middleware/auth.js');

// router.post('/register', registerUser); // <-- register a new user
router.route('/register').post(registerUser);

// router.post('/login', loginUser); // <-- login a user
router.route('/login').get(loginUser);

// router.post('/password/forgot', forgotPassword); // <-- forgot password
// router.put('/password/reset/:token', resetPassword); // <-- reset password
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

// router.get('/logout', logout); // <-- logout a user
router.route('/logout').get(isAuthenticatedUser, logout);





module.exports = router; // <-- export the router to be used in the server.js file