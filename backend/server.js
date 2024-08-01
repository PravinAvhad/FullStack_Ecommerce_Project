const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");
//Handling UnCaught Exception Errors ex:console.log(youtube)
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shuting Down Server due to Unhandled Promise Rejection.`);
    process.exit(1);
})

if(process.env.NODE_ENV !== "PRODUCTION"){
//Config
    dotenv.config({path:"config.env"});
}
//Connect MongoDb 
connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})
const server = app.listen(process.env.PORT || 5500,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT || 5500}.`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err}`);
    console.log(`Shuting Down Server due to Unhandled Promise Rejection.`);
    server.close(()=>{
        process.exit(1);
    });
});