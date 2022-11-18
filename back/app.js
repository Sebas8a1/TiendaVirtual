const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')
const path=require("path")

//configurar archivo file

if (process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'back/config/config.env'})

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

if (process.env.NODE_ENV==="PRODUCTION"){
    app.use(express.static(path.join(__dirname, '../front/build')))

    app.get('*',(req,res,)=>{
        res.sendFile(path.resolve(__dirname, '../front/build/index.html'))
    })
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;   // <-- export the app