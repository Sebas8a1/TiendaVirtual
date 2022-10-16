const express = require('express');
const router = express.Router();

const {getProducts, newProduct} = require('../controllers/productsController.js'); // <-- import the controller from the controller file

router.route('/products').get(getProducts); // <-- use the controller to handle the route
router.route('/product/new').post(newProduct); // <-- use the controller to handle the route of a new product


module.exports = router; // <-- export the router to be used in the server.js file