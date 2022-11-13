const app = require('./app');
const connectDB = require('./config/database');
const cloudinary=require("cloudinary")

// Language: javascript
// Path: back\server.js
// Set the configuration for the server

const dotenv = require('dotenv');
dotenv.config({ path: 'back/config/config.env' });

// Configura DB
connectDB();

//Configurar Cloudinary

cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})




// Configuracion del puerto segun archivo de configuracion
const server= app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in mode ${process.env.NODE_ENV}.`);
});