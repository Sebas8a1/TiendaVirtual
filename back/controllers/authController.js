const User = require('../models/auth');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sentToken = require('../utils/JWTtoken');

// Register a user => /api/v1/register
exports.registerUser = async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/1',
            url: 'https://res.cloudinary.com/dx9dnqzaj/image/upload/v1607946853/avatars/1.jpg'
        }
    })

    const token = user.getJwtToken();

    sentToken (user, 200, res);
}

// Login user => /api/v1/login
exports.loginUser = async (req, res, next) => {
    
        const { email, password } = req.body;
    
        // Checks if email and password is entered by user
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email & password', 400))
        }
    
        // Finding user in database
        const user = await User.findOne({ email }).select('+password');
    
        if (!user) {
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }
    
        // Checks if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);
    
        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }
    
        const token = user.getJwtToken();
    
        sentToken (user, 200, res);
    }