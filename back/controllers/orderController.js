const Order = require('../models/orders');
const Product = require('../models/productos');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;

    const order= await Order.create({
        items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email'); // <-- populate the user field with the name and email fields

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
});

// Admin - Get all orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let cantidadTotal = 0;

    orders.forEach(order => {
        cantidadTotal += order.precioTotal;
    });

    res.status(200).json({
        success: true,
        cantidadTotal,
        orders
    });
});

// Admin - Update / Process order
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.estado === 'Delivered'&& req.body.estado==='Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    

   //Restamos del inventario
   if (req.body.estado!=="Processing"){
    order.items.forEach(async item => {
        await updateStock(item.producto, item.cantidad)
    })
}

    order.estado = req.body.estado;
    order.fechaEnvio = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true
    });
});