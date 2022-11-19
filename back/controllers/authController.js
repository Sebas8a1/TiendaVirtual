const User = require('../models/auth');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sentToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary=require("cloudinary")

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { nombre, email, password } = req.body;
    const result= await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:240,
        crop:"scale"
    })

    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
            //public_id:"ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
            //url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })

    
    sentToken (user, 200, res);
})

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
    /* const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`; */
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

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

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sentToken (user, 200, res);
})

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    //update Avatar: 
    if (req.body.avatar !==""){
        const user= await User.findById(req.user.id)
        const image_id= user.avatar.public_id;
        const res= await cloudinary.v2.uploader.destroy(image_id);

        const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 240,
            crop: "scale"
        })

        newUserData.avatar={
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Admin Routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// update avatar => /api/v1/admin/user/:id
exports.updateUserAvatar = catchAsyncErrors(async (req, res, next) => {
    if (req.body.avatar !== '') {
        const user = await User.findById(req.params.id);
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: '240',
            crop: 'scale'
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
})




// Delete user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
    }

    // Remove user

    await user.remove();

    res.status(200).json({
        success: true
    })
})