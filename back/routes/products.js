const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getProductById, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview} = require('../controllers/productsController.js'); // <-- import the controller from the controller file
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');

router.route('/products').get( getProducts); //  <-- route to see all products
router.route('/product/:id').get(getProductById); // <--  route of a product by id
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); // <--  route to create a new product
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct); // <--  route of a product update by id
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); // <-- route to delete a product by id
router.route('/review').put(isAuthenticatedUser, createProductReview); // <--  route to create a product review
router.route('/reviews').get(isAuthenticatedUser, getProductReviews); // <--  route to get all product reviews
router.route('/reviews').delete(isAuthenticatedUser, deleteReview); // <--  route to delete a product review

module.exports = router; // <-- export the router to be used in the server.js file