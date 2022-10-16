const producto = require('../models/productos');

// View list for all products => /api/v1/products
exports.getProducts = (req, res, next) => {
   res.status(200).json({
        success: true,
        message: "This route will show all products in the database."
    });
}

// Create new product => /api/v1/product/new
exports.newProduct = async(req, res, next) => {
    const product = await producto.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}