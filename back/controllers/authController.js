const User = require('../models/auth');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

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

    res.status(201).json({
        success: true,
        user
    })

}