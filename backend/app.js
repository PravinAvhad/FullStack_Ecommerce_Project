const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

if(process.env.NODE_ENV !== "PRODUCTION"){
//Config
dotenv.config({path:"config.env"});
}
app.use(cors());
app.use(express.json({limit:'100mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());

//Routes Imports
const itemRoute = require("./routes/ItemRoute");
const userRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const PaymentRoute = require("./routes/paymentRoute");

app.use("/api/v1",itemRoute);
app.use("/api/v2",userRoute);
app.use("/api/v3",OrderRoute);
app.use("/api/v4",PaymentRoute);


app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"../frontend","build")))
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});
//Error Middlerware
app.use(ErrorMiddleware);

module.exports = app;