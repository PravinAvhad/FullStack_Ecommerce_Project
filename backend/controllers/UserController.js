const Errorhandler = require("../utils/errorhandler");
const AsyncErrors = require("../middleware/AsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register User
exports.registerUser = AsyncErrors(async (req, res, next) => {
    const mycloudaccount = await cloudinary.v2.uploader.upload(req.body.avatar,{folder:"ProfileImgs",width:150,crop:"scale"});
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        profileImg: {
            publicId: mycloudaccount.public_id,
            Url: mycloudaccount.secure_url
        }
    });
    //For Cookie and json response
    sendToken(user, 201, res);
});

//Login User
exports.loginUser = AsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checking email & password user has given or not
    if (!email || !password) {
        return next(new Errorhandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Errorhandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

//LogOut User
exports.logoutUser = AsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Log Out SuccessFully",
    })
})


//Forget Password Mail using Nodemailer
exports.forgetPassword = AsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v2/password/reset/${resetToken}`;

    const message = `Your Password reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Successfully.`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new Errorhandler(error.message, 500));
    }
})

//Reset User Password
exports.resetPassword = AsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if (!user) {
        return next(new Errorhandler("Reset Password Token is Invalid or has been expired", 400));
    }
    if(req.body.password !== req.body.confirmpassword){
        return next(new Errorhandler("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();
    sendToken(user,200,res);
})

//Get User Details
exports.getUserDetails = AsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    })
});

//update User Password
exports.updatePassword = AsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);
    if (!isPasswordMatched) {
        return next(new Errorhandler("Old Password is Incorrect", 400));
    }
    if(req.body.newpassword !== req.body.confirmpassword){
        return next(new Errorhandler("Entered Password does not match.", 400));
    }
    user.password = req.body.newpassword;
    await user.save();
    sendToken(user,200,res);
})

//update User Profile
exports.updateProfile = AsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    //we will add Cloudinary later for updating img.
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })
})

//Get All users  -- Admin 
exports.getAllusers = AsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        UsersLength:users.length,
        users
    })
})

//Get Single User Detail -- Admin
exports.getsingleuserdetails = AsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        user
    })
})

//update User Role -- Admin
exports.updateRole = AsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })
})

//Delete User -- Admin
exports.deleteuser = AsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})