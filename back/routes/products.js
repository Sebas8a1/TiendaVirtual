const express = require('express');
const router = express.Router();

const {getProducts} = require('../controllers/productsController.js'); // <-- import the controller from the controller file

router.route('/products').get(getProducts); // <-- use the controller to handle the route

module.exports = router; // <-- export the router to be used in the server.js file