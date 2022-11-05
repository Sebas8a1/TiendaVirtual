const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder); // <-- newOrder
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder); // <-- getSingleOrder
router.route('/orders/me').get(isAuthenticatedUser, myOrders); // <-- myOrders
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders); // <-- allOrders
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder); // <-- updateOrder
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder); // <-- deleteOrder

module.exports = router;