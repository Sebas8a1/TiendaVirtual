const app = require("./app")

const dotenv = require("dotenv");
dotenv.config({path: 'backend/config/config.env'})

//Llamemos al server
const server= app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`);
});