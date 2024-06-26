const Errorhandler = require("../utils/errorhandler");
const AsyncErrors = require("./AsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = AsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new Errorhandler("Please Login to access this Resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
};