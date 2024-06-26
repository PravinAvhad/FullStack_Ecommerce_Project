const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name can't Exceed Above 30 characters."],
        minLength: [4, "Name should have Above 4 characters."]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Gmail"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have Above 8 characters."],
        select: false,
    },
    profileImg: {
        publicId: {
            type: String,
            required: true,
        },
        Url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
})

//JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

//ComparePassword
userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcryptjs.compare(enteredpassword, this.password);
}

//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing & add to UserSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model('User', userSchema);