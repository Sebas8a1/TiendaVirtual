const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

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