const User = require('../models/auth');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sentToken = require('../utils/JWTtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

// logout user => /api/v1/logout
exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
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

// Forgot password => /api/v1/password/reset
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });  

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404)); 
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'SuperMasters Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sentToken (user, 200, res);
})