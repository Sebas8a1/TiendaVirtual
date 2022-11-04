const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) =>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success:false,
        message: err.stack
    })

    // Duplicate key error code mongoose
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }

    // Wrong JWT error 
    if(err.name === 'JsonWebTokenError'){ 
        const message = 'JSON Web Token is invalid. Try Again!!!'
        error = new ErrorHandler(message, 400) 
    } 

    // Expired JWT error
    if(err.name === 'TokenExpiredError'){ 
        const message = 'JSON Web Token is expired. Try Again!!!'
        error = new ErrorHandler(message, 400) 
    }

}