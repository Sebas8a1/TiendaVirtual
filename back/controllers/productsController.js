const producto = require('../models/productos');
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

// View list for all products => /api/v1/products
exports.getProducts = async(req, res, next) => {
    const products = await producto.find();
    if (!products) {
        return res.status(404).json({
            success: false,
            message: 'No hay productos',
            error: true
        });
    }
    res.status(200).json({
        success: true,
        count : products.length,
        products
    });
}

// View a product based on id => /api/v1/product/:id
exports.getProductById = async(req, res, next) => {
    const productById = await producto.findById(req.params.id);
    if(!productById){
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    }
    res.status(200).json({
        success: true,
        productById
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

// Update a product based on id => /api/v1/admin/product/:id
exports.updateProduct = async(req, res, next) => {
    let productUpdate = await producto.findById(req.params.id);
    if(!productUpdate){
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    }
    productUpdate = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        productUpdate
    });
}

// Delete a product based on id => /api/v1/admin/product/:id
exports.deleteProduct = async(req, res, next) => {
    const productDelete = await producto.findById(req.params.id);
    if(!productDelete){
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    }
    await productDelete.remove();
    res.status(200).json({
        success: true,
        message: 'Producto eliminado'
    });
}

// View all products with fetch
function verProductos(){
    fetch('http://localhost:4000/api/v1/products')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
}   
/* verProductos(); */

// View a product based on id with fetch
function verProductoById(id){
    fetch('http://localhost:4000/api/v1/product/'+id)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
}
/* verProductoById('634d0130e6a5f304d4fc3da4'); */