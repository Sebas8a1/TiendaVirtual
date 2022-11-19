const express=require("express");
const app = require('./app');
const connectDB = require('./config/database');
const cloudinary=require("cloudinary")
const path = require("path")

// Language: javascript
// Path: back\server.js
// Set the configuration for the server

//Este código ya no se utilizará
//const dotenv = require('dotenv');
//dotenv.config({ path: 'back/config/config.env' });

//Archivo dotenv

//configurar archivo file

if(process.env.NODE_ENV==="PRODUCTION") require('dotenv').config({path:'back/config/config.env'})

// Configura DB
connectDB();

//Configurar Cloudinary

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})


if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname,'../front/build')))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname,'../front/build/index.html'))
    })
}

// Configuracion del puerto segun archivo de configuracion
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})