const express = require('express');
const router = express.Router();

const { registerUser, loginUser, forgotPassword, resetPassword, logout, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser, deleteUser } = require('../controllers/authController.js'); // <-- import the controller from the controller file
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');

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

// router.get('/me', isAuthenticatedUser, getUserProfile); // <-- get user profile
router.route('/me').get(isAuthenticatedUser, getUserProfile);

// router.put('/password/update', isAuthenticatedUser, updatePassword); // <-- update password
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// router.put('/me/update', isAuthenticatedUser, updateProfile); // <-- update profile
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// Admin Routes
// router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers); 
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers); 
// router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserDetails); // <-- get user details
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails); // <-- get user details
// router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), updateUser); // <-- update user
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser); // <-- update user
// router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser); // <-- delete user
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser); // <-- delete user





module.exports = router; // <-- export the router to be used in the server.js file