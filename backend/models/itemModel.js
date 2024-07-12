const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Item Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Item Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Item Price"],
        maxLength:[8,"Price Can't exceed above 8 digits"]
    },
    discount:{
        type:Number,
        maxLength:[2,"Discount Can't exceed above 2 digits"],
        default:0
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        publicId:{
            type:String,
            required:true,
        },
        Url:{
            type:String,
            required:true,
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Item Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Item Stock"],
        maxLength:[4,"Price Can't exceed above 4 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Item',itemSchema);