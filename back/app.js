const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')

//uso de variables importadas
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload());

// Import all the routes
const products = require('./routes/products');
const usuarios = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', usuarios);
app.use('/api/v1', order);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;   // <-- export the app