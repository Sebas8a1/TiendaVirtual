const express = require('express');
const app = express();

// Language: javascript


app.use(express.json());

// Import all the routes
const products = require('./routes/products');

app.use('/api/v1', products);

module.exports = app;   // <-- export the app