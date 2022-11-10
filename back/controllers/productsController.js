const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const producto = require('../models/productos');
const APIFeatures = require('../utils/apiFeatures.js');
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

// View list for all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await producto.countDocuments();

    const apiFeatures = new APIFeatures(producto.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount= products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })


    const productos = await producto.find();
    if (!productos) {
        return next(new ErrorHandler("Informacion no encontrada", 404))
    }
    /* res.status(200).json({
        success: true,
        count: products.length,
        products
    }); */
})

// View a product based on id => /api/v1/product/:id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const productById = await producto.findById(req.params.id);
    /* if(!productById)return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
    }); */
    if (!productById) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    res.status(200).json({
        success: true,
        productById
    });
})

/* //Ver un producto por ID
exports.getProductById= catchAsyncErrors( async (req, res, next)=>{
    const product= await producto.findById(req.params.id)
    
    if (!product){
            return next(new ErrorHandler("Producto no encontrado", 404))
        }
    
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre tu producto: ",
        product
    })
}) */



// Create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await producto.create(req.body);

    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    res.status(201).json({
        success: true,
        product
    });
})

// Update a product based on id => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let productUpdate = await producto.findById(req.params.id);
    /* if(!productUpdate){
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    } */
    if (!productUpdate) {
        return next(new ErrorHandler("Producto no encontrado", 404))
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
})

// Delete a product based on id => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productDelete = await producto.findById(req.params.id);
    /* if(!productDelete){
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    } */
    if (!productDelete) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    await productDelete.remove();
    res.status(200).json({
        success: true,
        message: 'Producto eliminado'
    });
})

// View all products with fetch
function verProductos() {
    fetch('http://localhost:4000/api/v1/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}
// Create a product review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comentario, productId } = req.body;
    const review = {
        nombre: req.user.nombre,
        rating: Number(rating),
        comentario
    }
    const product = await producto.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.nombre === req.user.nombre
    )
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.nombre === req.user.nombre) {
                review.comentario = comentario;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numCalificaciones = product.reviews.length;
    }
    product.calificacion = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: 'Calificación enviada'
    });
})

// See all reviews of a product => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})

// Delete a review of a product => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.productId);
    const allReviews = product.reviews;
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const numCalificaciones = reviews.length;
    
    const calificacion = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await producto.findByIdAndUpdate(req.query.productId, {
        reviews,
        numCalificaciones,
        calificacion
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: 'Review deleted'
    });
})


/* verProductos(); */

// View a product based on id with fetch
function verProductoById(id) {
    fetch('http://localhost:4000/api/v1/product/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}
/* verProductoById('634d0130e6a5f304d4fc3da4'); */