const app = require('./app');
const connectDB = require('./config/database');

// Language: javascript
// Path: back\server.js
// Set the configuration for the server

const dotenv = require('dotenv');
dotenv.config({ path: 'back/config/config.env' });

// Configura DB
connectDB();


// Configuracion del puerto segun archivo de configuracion
const server= app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in mode ${process.env.NODE_ENV}.`);
});