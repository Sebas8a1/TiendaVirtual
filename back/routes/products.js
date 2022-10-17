const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productsController.js'); // <-- import the controller from the controller file

router.route('/products').get(getProducts); // <-- use the controller to handle the route of all products
router.route('/product/:id').get(getProductById); // <-- use the controller to handle the route of a product by id
router.route('/product/new').post(newProduct); // <-- use the controller to handle the route of a new product
router.route('/admin/product/:id').put(updateProduct); // <-- use the controller to handle the route of a product update by id
router.route('/admin/product/:id').delete(deleteProduct); // <-- use the controller to handle the route of a product delete by id


module.exports = router; // <-- export the router to be used in the server.js file